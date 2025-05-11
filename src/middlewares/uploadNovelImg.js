const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // đường dẫn tới file cloudinary config

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'novel_img', // tên folder trên Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: file.originalname.split('.')[0], // đặt tên file theo tên gốc (loại bỏ đuôi)
  }),
});

const upload = multer({ storage });

// 👇 export hàm upload.any() để dùng
module.exports = upload.any(); // chấp nhận tất cả file từ mọi field
