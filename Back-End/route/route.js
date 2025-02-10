const express = require("express");
const router = express.Router();

const addBlog = require("../controller/addBlog");
const displayBlog = require("../controller/displayBlogs.js");
const updateBlog = require("../controller/updateBlog");
const landing = require("../controller/landing");
const deleteBlog = require("../controller/deleteBlog");
const blogDetail = require("../controller/BlogDetail.js");
const likeIncrement = require("../controller/likeIncrement.js")

router.get("/", landing);
router.post("/add", addBlog);
router.get("/display", displayBlog);
router.get("/blog/:id", blogDetail);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);
router.put("/like/:id", likeIncrement)

module.exports = router;