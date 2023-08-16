const _ = require("lodash");
const listHelper = require("../utils/list_helper");

describe("mostBlogs", () => {
    test("returns null for an empty list of blogs", () => {
        const result = listHelper.mostBlogs([]);
        expect(result).toBe(null);
    });

    test("returns the author with the most blogs", () => {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 3", author: "Author 1", likes: 12 },
            { title: "Blog 4", author: "Author 3", likes: 8 },
            { title: "Blog 5", author: "Author 2", likes: 7 },
        ];
        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({
            author: "Author 1",
            blogs: 2,
        });
    });

    test("handles multiple authors with the same highest blog count", () => {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 3", author: "Author 1", likes: 12 },
            { title: "Blog 4", author: "Author 3", likes: 8 },
            { title: "Blog 5", author: "Author 2", likes: 7 },
            { title: "Blog 6", author: "Author 3", likes: 6 },
        ];
        const result = listHelper.mostBlogs(blogs);
        expect(_.includes(["Author 1", "Author 2"], result.author)).toBe(true);
    });
});
