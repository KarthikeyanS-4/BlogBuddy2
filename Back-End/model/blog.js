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
    image : {
        type: DataTypes.BLOB,
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

// Blog.prototype.getFullContent = function() {
//     return {
//         title: this.title,
//         author: this.author_name,
//         image: this.image,
//         content: this.content,
//         likes: this.likes
//     };
// };

Blog.sync();

module.exports = Blog;