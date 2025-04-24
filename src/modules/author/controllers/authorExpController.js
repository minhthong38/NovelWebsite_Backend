const AuthorExpService = require("../services/authorExpService");

  // Lấy tất cả AuthorExp
  const getAllAuthorExp = async (req, res) => {
    try {
      const data = await AuthorExpService.getAllAuthorExp();
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // Lấy Exp của một Author theo IDUser
  const getAuthorExpByIdUser = async (req, res) => {
    try {
      const { idUser } = req.params; // dùng đúng tên params
      const authorExp = await AuthorExpService.getByUserId(idUser); // truyền đúng
  
      if (!authorExp) {
        return res.status(404).json({ message: 'Không tìm thấy kinh nghiệm tác giả.' });
      }
  
      return res.status(200).json(authorExp);
    } catch (error) {
      console.error('Lỗi khi lấy kinh nghiệm tác giả:', error);
      return res.status(500).json({ message: 'Lỗi server.' });
    }
  };
  

  // Lấy Exp của một Author theo ID
  const getAuthorExpById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await AuthorExpService.getAuthorExpById(id);
      if (!data) return res.status(404).json({ success: false, message: "Không tìm thấy dữ liệu" });

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

module.exports = {
  getAllAuthorExp,
  getAuthorExpByIdUser,
  getAuthorExpById
};
