const Blog = require("../model/blog");

const likeIncrement = async (req, res) => {
    const { id } = req.params;
    const {likes} = req.body;

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        blog.likes = likes  
        await blog.save();

        res.json(blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Error updating blog" });
    }
};

module.exports = likeIncrement;