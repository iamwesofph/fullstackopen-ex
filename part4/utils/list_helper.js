const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let total = 0;
    blogs.forEach((blog) => {
        total = total + blog.likes;
    });
    return total; // Return the calculated total outside the forEach loop
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null; // Return null for an empty list of blogs
    }

    let maxLikes = -1;
    let favorite = null;

    blogs.forEach((blog) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes;
            favorite = blog;
        }
    });

    return favorite;
};

const _ = require("lodash");

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null; // Return null for an empty list of blogs
    }

    const authorCounts = _.countBy(blogs, "author");
    const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);

    return {
        author: topAuthor,
        blogs: authorCounts[topAuthor],
    };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null; // Return null for an empty list of blogs
    }

    const authorLikes = {};

    blogs.forEach((blog) => {
        if (!authorLikes[blog.author]) {
            authorLikes[blog.author] = 0;
        }
        authorLikes[blog.author] += blog.likes;
    });

    const topAuthor = Object.keys(authorLikes).reduce((prevAuthor, currentAuthor) => {
        return authorLikes[currentAuthor] > authorLikes[prevAuthor] ? currentAuthor : prevAuthor;
    });

    return {
        author: topAuthor,
        likes: authorLikes[topAuthor],
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
