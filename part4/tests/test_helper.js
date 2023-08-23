const Blog = require("../models/blog");
const User = require("../models/user");

const initialUsers = [{ username: "tester", password: "secret" }];

const nonExistingId = async () => {
    const blog = new Blog({ title: "willremovethissoon", author: "willremovethissoon", url: "willremovethissoon" });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const notes = await Blog.find({});
    return notes.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

module.exports = {
    nonExistingId,
    blogsInDb,
    usersInDb,
    initialUsers,
};
