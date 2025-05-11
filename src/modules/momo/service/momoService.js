const crypto = require('crypto');
const https = require('https');
const IpTransaction = require('../../../models/momo/ipnModel');
const Transaction = require('../../../models/momo/transactionModel');

const partnerCode = 'MOMO';
const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const redirectUrl = 'http://localhost:3000/userAccount'; // Khi thanh toán xong sẽ redirect về
const ipnUrl = 'https://e4ee-203-205-32-58.ngrok-free.app/api/payments/ipn';// IPN gửi kết quả
const requestType = 'captureWallet'; // Mặc định theo Momo docs
const lang = 'vi';

exports.createMomoPayment = async (amount) => {
  return new Promise((resolve, reject) => {
    
    try {
      const orderId = partnerCode + new Date().getTime();
      const requestId = orderId;
      const extraData = 'userId'; // Bạn có thể truyền userId vào đây nếu muốn

      // Tạo chuỗi signature raw
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=Nap Coin&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      // Ký SHA256
      const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

      // Body gửi MoMo
      const requestBody = JSON.stringify({
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo: 'Nap Coin',
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang,
      });

      console.log('Sending request to MoMo API:', requestBody);  // Log gửi request

      const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
        },
      };

      const req = https.request(options, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          console.log('MoMo response:', data); // Log nhận response

          const response = JSON.parse(data);
          if (response && (response.payUrl || response.deeplink)) {
            resolve({
              payUrl: response.payUrl,
              deeplink: response.deeplink,
              orderId: response.orderId,  // Kiểm tra xem có orderId không
            });
          } 
          else {
            reject(new Error('Không lấy được link thanh toán MoMo'));
          }
        });
      });

      req.on('error', (e) => {
        console.error('Error with MoMo request:', e); // Log lỗi
        reject(e);
      });

      req.write(requestBody);
      req.end();
    } catch (error) {
      console.error('Error in createMomoPayment function:', error); // Log lỗi
      reject(error);
    }
  });
};

exports.handleIpn = async (ipnData) => {
  const {
    partnerCode,
    accessKey: ipnAccessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    orderType,
    transId,
    message,
    localMessage,
    responseTime,
    errorCode,
    payType,
    extraData,
    signature,
    resultCode
  } = ipnData;

  // 1. Xây dựng rawSignature đúng chuẩn MoMo yêu cầu
  const rawSignature = 
    `accessKey=${accessKey}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&message=${message}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&orderType=${orderType}` +
    `&partnerCode=${partnerCode}` +
    `&payType=${payType}` +
    `&requestId=${requestId}` +
    `&responseTime=${responseTime}` +
    `&resultCode=${resultCode}` +
    `&transId=${transId}`;

  // 2. Kiểm tra chữ ký
  const validSignature = crypto
    .createHmac('sha256', secretKey)  // `secretKey` nên được lấy từ biến môi trường hoặc cấu hình
    .update(rawSignature)
    .digest('hex');

  if (validSignature !== signature) {
    throw new Error('Signature không hợp lệ');
  }

  // 3. Xác định trạng thái giao dịch (completed hoặc failed)
  const transStatus = resultCode == 0 ? 'completed' : 'failed';

  // 4. Cập nhật trạng thái giao dịch trong Transaction
  const transaction = await Transaction.findOne({ orderId });
  if (!transaction) {
    throw new Error('Transaction không tồn tại');
  }

  // Cập nhật trạng thái giao dịch
  transaction.transactionStatus = transStatus;
  await transaction.save(); // Lưu thay đổi vào database

  console.log(`Transaction with orderId ${orderId} updated to ${transStatus}`);

  // 5. Nếu giao dịch thành công, cộng coin cho user
  if (transStatus === 'completed') {
    const WalletUser = require('../../../models/momo/walletUserModel');
    const walletUser = await WalletUser.findOne({ userId: transaction.idUser });
    console.log('Transaction userId:', walletUser);  // Log userId của giao dịch

    

    if (walletUser) {
      walletUser.balance = (walletUser.balance || 0) + transaction.coinsReceived;  // Cộng coin vào ví
      console.log(`Coins received: ${transaction.coinsReceived}`);
      await walletUser.save();  // Lưu thay đổi
      console.log(`Updated spendingWallet: ${walletUser.spendingWallet}`);
      console.log(`Added ${transaction.coinsReceived} coins to user ${walletUser._id}`);
    } else {
      console.error('User không tìm thấy để cập nhật coin');
    }
  }

  // 6. Lưu log IPN vào IpTransaction (nếu cần thiết)
  const ipTransaction = new IpTransaction({
    partnerCode,
    accessKey: ipnAccessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    orderType,
    transId,
    message,
    localMessage,
    responseTime,
    errorCode,
    payType,
    extraData,
    resultCode,
    transStatus,
    signature,
  });

  await ipTransaction.save();
  console.log('IPN transaction saved');
};





