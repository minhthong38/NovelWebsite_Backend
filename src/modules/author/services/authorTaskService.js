const AuthorTask = require("../../../models/authors/authorTaskModel");
const Task = require("../../../models/authors/taskModel");
const AuthorExp = require("../../../models/authors/authorExpModel");
const { addExpForAuthor } = require("./expUtils");


//Tạo Author Task (Task hiện tại của Author)
const createAuthorTask = async (authorExpID) => {
    try {
      const firstTask = await Task.findOne().sort({ order: 1 }); // Lấy task đầu tiên
  
      if (!firstTask) {
        throw new Error("Không có task nào để gán!");
      }
  
      await AuthorTask.create({
        idAuthorExp: authorExpID,
        idTask: firstTask._id, // Lưu task đầu tiên
        expEarned: firstTask.expPoint, // Lấy exp từ task đó
      });
  
      console.log(`AuthorTask được tạo với Task: ${firstTask.taskName}, Exp: ${firstTask.expPoint}`);
    } catch (error) {
      console.log("Lỗi khi tạo AuthorTask:", error.message);
    }
  };

const getAuthorTaskById = async (id) => {
    try {
        const authorTask = await AuthorTask.findById(id);
        if (!authorTask) {
            throw new Error("Không tìm thấy nhiệm vụ tác giả.");
        }
        return authorTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

//Hoàn thành nhiệm vụ
const completeAuthorTask = async (id) => {
    try {
      // 1️⃣ Lấy nhiệm vụ hiện tại
      const authorTask = await AuthorTask.findById(id);
      if (!authorTask) {
        throw new Error("❌ Không tìm thấy nhiệm vụ!");
      }
  
      // 2️⃣ Đánh dấu là "completed"
      authorTask.status = "completed";
  
      console.log(`✅ Nhiệm vụ ${authorTask.idTask} đã hoàn thành!`);
  
      // 3️⃣ Cập nhật exp cho AuthorExp
      const authorExp = await AuthorExp.findById(authorTask.idAuthorExp);
      if (!authorExp) {
        throw new Error("❌ Không tìm thấy AuthorExp!");
      }
      await addExpForAuthor(authorExp.idUser, authorTask.expEarned);
  
      authorExp.totalExp += authorTask.expEarned;
  
      await authorExp.save();
      console.log(`📈 Cộng ${authorTask.expEarned} Exp! Tổng Exp: ${authorExp.totalExp}`);
  
      // 4️⃣ Lấy task tiếp theo dựa trên order
      const currentTask = await Task.findById(authorTask.idTask);
      let nextTask = await Task.findOne({ order: currentTask.order + 1 });

      // 🔄 Nếu không còn nhiệm vụ -> quay lại nhiệm vụ đầu tiên
      if (!nextTask) {
        nextTask = await Task.findOne().sort({ order: 1 });
        console.log("🔄 Không còn nhiệm vụ -> Quay lại nhiệm vụ đầu tiên!");
      }

      // ✅ Cập nhật nhiệm vụ hiện tại thay vì tạo mới
      authorTask.idTask = nextTask._id;
      authorTask.expEarned = nextTask.expPoint;
      authorTask.status = "pending";

      await authorTask.save();

      console.log(`✅ Đã cập nhật nhiệm vụ: ${nextTask.taskName}`);
  
      return { success: true, message: "Nhiệm vụ hoàn thành và cập nhật exp!" };
    } catch (error) {
      console.log("🔥 Lỗi khi hoàn thành nhiệm vụ:", error.message);
      throw new Error(error.message);
    }
};


module.exports = { getAuthorTaskById, createAuthorTask, completeAuthorTask };
