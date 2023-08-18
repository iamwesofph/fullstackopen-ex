const User = require("../models/user");
const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "The Power of Positive Thinking",
        author: "Jane Doe",
        url: "https://example.com/blog/power-positive-thinking",
        likes: 45,
    },
    {
        title: "Mastering Time Management",
        author: "Michael Johnson",
        url: "https://example.com/blog/mastering-time-management",
        likes: 33,
    },
    {
        title: "Introduction to Machine Learning",
        author: "Emily Williams",
        url: "https://example.com/blog/intro-to-machine-learning",
        likes: 68,
    },
    {
        title: "Healthy Eating Habits for a Busy Lifestyle",
        author: "Alex Carter",
        url: "https://example.com/blog/healthy-eating-habits",
        likes: 12,
    },
];

const nonExistingId = async () => {
    const blog = new Blog({ content: "willremovethissoon" });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
};
