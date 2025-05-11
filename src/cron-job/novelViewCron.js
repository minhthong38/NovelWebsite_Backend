const cron = require('node-cron');
const {updateNovelViews} = require('../modules/novel/services/novelService');

cron.schedule('*/2 * * * *', async () => {
  console.log('🔄 Cron: Đang cập nhật view tiểu thuyết...');
  await updateNovelViews();
});
