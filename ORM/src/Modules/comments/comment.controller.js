import e, { Router } from "express";
import * as commentService from "./comment.service.js";
const route = Router();

//1. Create a bulk of Comments
route.post("/createBulk", async (req, res) => {
  try {
    const result = await commentService.createBlunk(req.body);
    return res.status(result.statusCode).json(result.message);
  } catch (error) {
    console.error(error);
  }
});

// update comment
route.patch("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const result = await commentService.updateComment(commentId, req.body);
    console.log(result.message);
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    console.error(error);
  }
});

route.post("/find-or-create", async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    if (!postId || !userId || !content) {
      return res.status(400).json({
        success: false,
        message: "postId, userId and content are required",
      });
    }
    const { comment, created } = await commentService.findOrCreateComment({
      postId,
      userId,
      content,
    });

    return res.status(created ? 201 : 200).json({
      success: true,
      created,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

route.get("/search", async (req, res) => {
  try {
    const { word } = req.query;

    if (!word) {
      return res.status(400).json({
        success: false,
        message: "search word is required",
      });
    }

    const { rows, count } = await commentService.searchComments(word);

    return res.status(200).json({
      success: true,
      count,
      comments: rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

route.get("/newest/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "postId is required",
      });
    }

    const comments = await commentService.getRecentComments(postId);

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

route.get("/details/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentService.getCommentByPk(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
export default route;
