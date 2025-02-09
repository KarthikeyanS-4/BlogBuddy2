const Blog = require("../model/blog");

const displayBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        blogs.sort((a, b) => a.id - b.id);
        res.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = displayBlogs;