const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
});

test("correct number of blogs are returned as json", async () => {
    const response = await api
        .get("/api/blogs")
        .expect("Content-Type", /application\/json/)
        .expect(200);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier is id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;

    for (const blog of blogs) {
        expect(blog.id).toBeDefined(); // Check if id property is defined
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});
