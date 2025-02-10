const DataTypes = require('sequelize');
const sequelize = require('../database/db');

const Blog = sequelize.define('blog', {
    
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url : {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false
});

Blog.sync();

module.exports = Blog;