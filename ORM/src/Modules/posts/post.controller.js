import { Router } from "express";
import * as postService from "./post.service.js";
const route = Router();

//---create post
route.post("/posts", async (req, res) => {
  try {
    const result = await postService.createPost(req.body);
    console.log("the post create successful");
    return res
      .status(201)
      .json({ message: "the post create successful", post: result });
  } catch (error) {
    console.log("faild on create post!!!", error);
    res.status(400).json({ message: "faild on create post!!!", error });
  }
});

//---delete post by postId and userId
route.delete("/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const result = await postService.deletePost(postId, userId);
    res.status(result.statusCode).json({ message: result.message });
  } catch (error) {
    console.log(error);
    res.status(402).json({ message: "faild of delete!!" });
  }
});

route.get("/posts/details", async (req, res) => {
  try {
    const result = await postService.detailsOfPosts();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
  const result = await postService.detailsOfPosts();
  res.status(200).json(result);
});
export default route;
