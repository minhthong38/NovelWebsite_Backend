const Bookmark = require("../../../models/novels/bookmarkModel");

const toggleBookmark = async (idUser, idChapter) => {
  const existing = await Bookmark.findOne({ idUser, idChapter });

  if (existing) {
    await Bookmark.findByIdAndDelete(existing._id);
    return { message: "Bookmark removed", removed: true };
  } else {
    const newBookmark = new Bookmark({ idUser, idChapter });
    await newBookmark.save();
    return { message: "Bookmark added", bookmark: newBookmark, removed: false };
  }
};

module.exports = {
  toggleBookmark
};
