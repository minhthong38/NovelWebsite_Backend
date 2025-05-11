const authorRegisterService = require("../services/authorRegisterService");

const registerAsAuthor = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await authorRegisterService.registerAsAuthor({ idUser: userId });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const checkAuthorRequestStatus = async (req, res) => {
    try {
      const { userId } = req.params; // lấy thông tin user từ params
      const status = await authorRegisterService.checkAuthorRequestStatus(userId);
      return res.status(200).json({ status });
    } catch (error) {
      return res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };

const getAllAuthorRequests = async (req, res) => {
  try {
    const requests = await authorRegisterService.getAllAuthorRequests();
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

const approveAuthorRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await authorRegisterService.approveAuthorRequest(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

const refuseAuthorRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await authorRegisterService.refuseAuthorRequest(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

module.exports = {
  registerAsAuthor,
  checkAuthorRequestStatus,
  getAllAuthorRequests,
  approveAuthorRequest,
  refuseAuthorRequest
};
