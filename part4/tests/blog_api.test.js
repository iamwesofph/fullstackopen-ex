const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const { initialUsers, blogsInDb, usersInDb } = require("./test_helper");
let authHeader;

const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    const user = initialUsers[0];
    await api.post("/api/users").send(user);
    const response = await api.post("/api/login").send(user);
    authHeader = `Bearer ${response.body.token}`;

    await Blog.deleteMany({});

    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    };

    const response2 = await api.post("/api/blogs").set("Authorization", authHeader).send(blog);
});

test("correct number of blogs are returned as json", async () => {
    const response = await api
        .get("/api/blogs")
        .expect("Content-Type", /application\/json/)
        .expect(200);

    expect(response.body).toHaveLength(1);
});

test("unique identifier is id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;

    for (const blog of blogs) {
        expect(blog.id).toBeDefined(); // Check if id property is defined
    }
});

test("creating a new blog post", async () => {
    const newBlog = {
        title: "Healthy Eating Habits for a Busy Lifestyle",
        author: "Alex Carter",
        url: "https://example.com/blog/healthy-eating-habits",
        likes: 12,
    };

    const initialBlogs = await Blog.find({});
    await api.post("/api/blogs").set("Authorization", authHeader).send(newBlog).expect(201);

    const updatedBlogs = await Blog.find({});

    expect(updatedBlogs).toHaveLength(initialBlogs.length + 1);

    const savedBlog = updatedBlogs.find((blog) => blog.title === newBlog.title && blog.author === newBlog.author);
    expect(savedBlog).toBeDefined();
});

test("likes property defaults to 0 when missing from request", async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Test Author",
        url: "https://testblog.com",
    };

    const response = await api.post("/api/blogs").send(newBlog).set("Authorization", authHeader).expect(201);
    const savedBlog = response.body;

    expect(savedBlog.likes).toBe(0);
});

test("responds with 400 Bad Request if title is missing", async () => {
    const newBlog = {
        author: "Test Author",
        url: "https://testblog.com",
    };

    await api.post("/api/blogs").send(newBlog).set("Authorization", authHeader).expect(400);
});

test("responds with 400 Bad Request if url is missing", async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Test Author",
    };

    await api.post("/api/blogs").send(newBlog).set("Authorization", authHeader).expect(400);
});

test("responds with the 401 Unauthorized if a token is not provided", async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Test Author",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
});

describe("Deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
        const blogsAtStart = await blogsInDb();
        const blogToDelete = blogsAtStart[0];
        await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", authHeader).expect(204);

        const blogsAtEnd = await blogsInDb();

        expect(blogsAtEnd).toHaveLength(0);

        const titles = blogsAtEnd.map((r) => r.title);

        expect(titles).not.toContain(blogToDelete.title);
    });
});

describe("Updating a blog", () => {
    test("updating a blog with valid id", async () => {
        const blogsAtStart = await blogsInDb();
        const blogToUpdate = blogsAtStart[0];

        const updatedBlogData = {
            title: "Updated Title",
            author: "Updated Author",
            url: "https://updatedblog.com",
            likes: 100,
        };

        const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlogData).expect(200);

        const updatedBlog = response.body;

        expect(updatedBlog.title).toBe(updatedBlogData.title);
        expect(updatedBlog.author).toBe(updatedBlogData.author);
        expect(updatedBlog.url).toBe(updatedBlogData.url);
        expect(updatedBlog.likes).toBe(updatedBlogData.likes);

        const blogsAtEnd = await blogsInDb();
        const updatedBlogInDb = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);

        expect(updatedBlogInDb).toBeDefined();
        expect(updatedBlogInDb.title).toBe(updatedBlogData.title);
        expect(updatedBlogInDb.author).toBe(updatedBlogData.author);
        expect(updatedBlogInDb.url).toBe(updatedBlogData.url);
        expect(updatedBlogInDb.likes).toBe(updatedBlogData.likes);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
