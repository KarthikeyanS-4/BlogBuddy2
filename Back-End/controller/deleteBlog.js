const Blog = require("../model/blog");

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        await blog.destroy();
        await blog.save();
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Error deleting blog" });
    }
};

module.exports = deleteBlog;