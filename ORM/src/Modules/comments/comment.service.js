import { commentModel } from "../../DB/Models/comment.model.js";
import { Op } from "sequelize";
import { userModel } from "../../DB/Models/user.model.js";
import { postModel } from "../../DB/Models/post.model.js";
//1. Create a bulk of Comments

export const createBlunk = async (inputs) => {
  const { content, postId, userId } = inputs;
  try {
    await commentModel.bulkCreate(inputs);
    return {
      message: "comments created",
      statusCode: 201,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "can not create comments!!",
      statusCode: 400,
    };
  }
};

//update comments

export const updateComment = async (commentId, data) => {
  const { content, userId } = data;
  try {
    const comment = await commentModel.findByPk(commentId);
    if (!comment) {
      console.log("not found this comment!!");
      return {
        statusCode: 404,
        message: "not found this comment!!",
      };
    }
    if (comment.userId != userId) {
      console.log("you are not authorized to update this comment");
      return {
        success: false,
        statusCode: 400,
        message: "you are not authorized to update this comment",
      };
    }
    await commentModel.update(
      { content },
      {
        where: {
          id: commentId,
        },
      },
    );
    console.log("update comment successfull");

    return {
      statusCode: 201,
      message: "update comment successfull",
    };
  } catch (error) {
    console.log({ error: error.message });
  }
};

//find a comment for a specific post, user, and content. If the comment exists, return it, otherwise, create a new
//comment with the given details

export const findOrCreateComment = async ({ postId, userId, content }) => {
  const [comment, created] = await commentModel.findOrCreate({
    where: {
      postId,
      userId,
      content,
    },
    defaults: {
      postId,
      userId,
      content,
    },
  });

  return { comment, created };
};

// search comments
export const searchComments = async (word) => {
  const result = await commentModel.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });

  return result;
};

//5. Retrieve the 3 most recent comments for a specific post, ordered by creation date. (0.5 Grade)

export const getRecentComments = async (postId) => {
  const comments = await commentModel.findAll({
    where: {
      postId,
    },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });

  return comments;
};

//6 Get Specific Comment By PK with User and Post Information.

export const getCommentByPk = async (commentId) => {
  const comment = await commentModel.findByPk(commentId, {
    include: [
      {
        model: userModel,
        attributes: ["id", "name", "email"],
      },
      {
        model: postModel,
        attributes: ["id", "title"],
      },
    ],
  });

  return comment;
};
