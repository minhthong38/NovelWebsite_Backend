const AuthorRegister = require("../../../models/authors/authorRegisterModel");
const User = require("../../../models/users/userModel");
const WalletAuthor = require("../../momo/service/walletAuthorService")
const AuthorExpService = require("../../author/services/authorExpService");
const NotificationService = require("../../user/services/notificationService");

const registerAsAuthor = async (userData) => { // <== Nhận đúng userData
    try {
      const { idUser } = userData; // Lấy idUser ra
  
      const existingRequest = await AuthorRegister.findOne({ idUser, status: "pending" });
      if (existingRequest) {
        throw new Error("You have already requested to become an author.");
      }
  
      const newRequest = new AuthorRegister({
        idUser,
        status: "pending"
      });
  
      await newRequest.save();
      return { message: "Your request to become an author has been sent." };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const checkAuthorRequestStatus = async (userId) => {
    try {
      const existingRequest = await AuthorRegister.findOne({ idUser: userId });
      if (existingRequest) {
        return existingRequest.status;  // Trả về trạng thái hiện tại: 'pending', 'approved', 'rejected'
      } else {
        return 'none';  // Trả về 'none' nếu chưa có yêu cầu
      }
    } catch (error) {
      throw new Error('Error checking author request status');
    }
  };

  const getAllAuthorRequests = async () => {
    try {
      // Lấy tất cả các yêu cầu đăng ký của reader
      const requests = await AuthorRegister.find({ status: "pending" })
        .populate("idUser", "fullname avatar email gender");
  
      return requests;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

const approveAuthorRequest = async (requestId) => {
  try {
    const request = await AuthorRegister.findById(requestId);

    if (!request) {
      throw new Error("Request not found.");
    }

    const idUser = request.idUser;

    // Cập nhật trạng thái yêu cầu thành approved
    request.status = "approved";
    await request.save();

    // Cập nhật role của User thành author
    const user = await User.findById(request.idUser);
    if (user) {
      user.role = "author"; // Cập nhật role của user thành 'author'
      await user.save();
      await WalletAuthor.createWallet(idUser); // Tạo ví cho author mới
      await AuthorExpService.createAuthorExp(idUser); // Tạo AuthorExp cho author mới
    }

    await NotificationService.createNotification({
        userId: idUser,
        title: "Bạn đã được phê duyệt",
        description: `Bạn đã được phê duyệt lên làm tac giả`,
        link: `/authorAccounts`,
        type: "authorApprove",
    });

    return { message: "Request approved and user role updated to author." };
  } catch (error) {
    throw new Error(error.message);
  }
};

const refuseAuthorRequest = async (requestId) => {
  try {
    const request = await AuthorRegister.findById(requestId);

    if (!request) {
      throw new Error("Request not found.");
    }

    // Cập nhật trạng thái yêu cầu thành rejected
    const idUser = request.idUser;
    request.status = "rejected";
    await request.save();
    await NotificationService.createNotification({
      userId: idUser,
      title: "Phê duyệt của bạn đã bị từ chối",
      description: `Phê duyệt thất bại. Bạn không được phê duyệt lên làm tác giả`,
      link: `/`,
      type: "authorReject",
  });

    return { message: "Request has been rejected." };
    
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  registerAsAuthor,
  checkAuthorRequestStatus,
  getAllAuthorRequests,
  approveAuthorRequest,
  refuseAuthorRequest
};
