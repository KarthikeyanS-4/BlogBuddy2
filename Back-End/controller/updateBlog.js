const Blog = require("../model/blog");

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, author_name, content } = req.body;

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        blog.title = title;
        blog.author_name = author_name;
        blog.content = content;
        await blog.save();

        res.json(blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Error updating blog" });
    }
};

module.exports = updateBlog;