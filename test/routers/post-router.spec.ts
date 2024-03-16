import supertest from "supertest";
import app from "../../src/app";

const api = supertest(app);

describe("POST /posts", () => {
    it("should return 201 status code", async () => {
        let postBody = {
            title: "hello",
            content: "there",
        };
        await api.post("/posts").send(postBody).expect(201);
    });

    it("should return valid json response", async () => {
        let postBody = {
            title: "hello",
            content: "there",
        };
        await api
            .post("/posts")
            .send(postBody)
            .expect("Content-Type", /application\/json/);
    });

    it("should have `title` and `content` attributes in the response body", async () => {
        let postBody = {
            title: "hello",
            content: "there",
        };

        const response = await api.post("/posts").send(postBody);

        expect(response.body).toStrictEqual(postBody);
    });

    it("should return an error if `title` or `content` is missing", async () => {
        let postBody = {
            title: "hello",
        };

        const response = await api.post("/posts").send(postBody).expect(400);

        expect(response.body.error).toContain("Invalid Post Body");
    });
});
