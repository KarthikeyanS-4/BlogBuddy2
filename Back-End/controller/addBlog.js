const Blog = require("../model/blog");

const addBlog = async (req, res) => {
    const { title, content, author_name, url } = req.body;

    try {
        const blog = new Blog({
            title: title,
            author_name: author_name,
            content: content,
            url: url
        });

        await blog.save();
        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = addBlog;
