const listHelper = require("../utils/list_helper");

describe("mostLikes", () => {
    test("returns null for an empty list of blogs", () => {
        const result = listHelper.mostLikes([]);
        expect(result).toBe(null);
    });

    test("returns the author with the most likes", () => {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 3", author: "Author 1", likes: 12 },
            { title: "Blog 4", author: "Author 3", likes: 8 },
            { title: "Blog 5", author: "Author 2", likes: 7 },
        ];
        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual({
            author: "Author 1",
            likes: 22,
        });
    });

    test("handles multiple authors with the same highest like count", () => {
        const blogs = [
            { title: "Blog 1", author: "Author 1", likes: 10 },
            { title: "Blog 2", author: "Author 2", likes: 15 },
            { title: "Blog 3", author: "Author 1", likes: 12 },
            { title: "Blog 4", author: "Author 3", likes: 12 },
            { title: "Blog 5", author: "Author 2", likes: 7 },
        ];
        const result = listHelper.mostLikes(blogs);
        expect(["Author 1", "Author 3"]).toContain(result.author);
    });
});
