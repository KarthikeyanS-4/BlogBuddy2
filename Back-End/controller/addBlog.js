const express = require("express");
const multer = require("multer");
const Blog = require("../model/blog");

const router = express.Router();

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to create a new blog post without using req.body
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        // Extract form data from req.query
        const title = req.query.title;
        const author_name = req.query.author;
        const content = req.query.content;
        const imageBuffer = req.file ? req.file.buffer : null; // Get image file

        console.log("Received Data:", { title, author_name, content, image: imageBuffer });

        // Save to database
        const newBlogPost = await Blog.create({
            title,
            author_name,
            content,
            image: imageBuffer,
        });

        res.json({
            message: "Post created successfully",
            post: newBlogPost,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
});

module.exports = router;
