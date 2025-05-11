const express = require('express');
const multer = require('multer');
const cloudinary = require('../../../config/cloudinary');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
const streamifier = require('streamifier');

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Không có file nào được gửi lên.' });
    }

    // Tạo stream từ buffer
    const stream = streamifier.createReadStream(req.file.buffer);

    // Upload ảnh lên Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'novel_img' }, // Thư mục trên Cloudinary
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);  // Log lỗi nếu có
          return res.status(500).json({ error: 'Có lỗi xảy ra khi upload ảnh.' });
        }
        console.log('Upload successful:', result);  // Log kết quả upload
        res.json({ url: result.secure_url });
      }
    );

    // Sử dụng stream để upload
    stream.pipe(result);
  } catch (error) {
    console.error('Error during file upload:', error);  // Log lỗi trong try-catch
    res.status(500).json({ error: 'Có lỗi xảy ra khi upload ảnh.' });
  }
});
module.exports = router;
