const listHelper = require("../utils/list_helper");

describe("favoriteBlog", () => {
    test("returns null for an empty list of blogs", () => {
        const result = listHelper.favoriteBlog([]);
        expect(result).toBe(null);
    });

    test("returns the blog with the most likes", () => {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 3", author: "Author 3", likes: 12 },
        ];
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual({
            title: "Blog 2",
            author: "Author 2",
            likes: 15,
        });
    });

    test("returns one of the top favorite blogs if multiple blogs have the same highest likes", () => {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 3", author: "Author 3", likes: 15 },
        ];
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual(expect.objectContaining({ likes: 15 }));
    });
});
