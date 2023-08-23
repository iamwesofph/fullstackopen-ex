const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/info", async (request, response) => {
    const count = await Blog.countDocuments();
    // const count = await Blog.where({ author: "Jane Doe" }).count();
    response.status(200).json(`Total blogs: ${count}`);
});

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
    const body = request.body;
    const user = request.user;

    if (!body.title || !body.url || !body.author) {
        return response.status(400).json({ error: "Title, URL and Author are required" });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === request.user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } else {
        return response.status(401).json({ error: "Only the blog creator has rights to delete the blog." });
    }
});

blogsRouter.put("/:id", async (request, response) => {
    const blog = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog);
});

module.exports = blogsRouter;
