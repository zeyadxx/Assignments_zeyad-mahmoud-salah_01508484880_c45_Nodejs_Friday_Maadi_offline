import { commentModel, postModel, userModel } from "../../DB/Models/index.js";

//---create new post
export const createPost = async (data) => {
  const { title, content, userId } = data;
  try {
    const newpost = postModel.build({ title, content, userId });
    await newpost.save();
    return newpost;
  } catch (error) {
    console.log("error in create new post!");
    throw error;
  }
};

//---delete post by postId and userId
export const deletePost = async (postId, userId) => {
  try {
    const post = await postModel.findByPk(postId);
    if (!post) {
      console.log("post not found!!");
      return {
        success: false,
        statusCode: 404,
        message: "post not found!!",
      };
    }
    if (post.userId != userId) {
      console.log("you are not authorized to delete this post");
      return {
        success: false,
        statusCode: 400,
        message: "you are not authorized to delete this post",
      };
    }
    await postModel.destroy({
      where: {
        id: postId,
      },
    });
    console.log("deleted successful");

    return {
      success: true,
      statusCode: 201,
      message: "deleted post successful",
    };
  } catch (error) {
    console.log({ error: error.message });
  }
};

// Retrieve all posts, including the details of the user who created each post and the associated comments. (Show
//only for the post the “id, title”, and for user “id, name”, and for the comments “id, content”)
export const detailsOfPosts = async () => {
  try {
    const result = await postModel.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: userModel,
          attributes: ["id", "name"],
        },
        {
          model: commentModel,
          attributes: ["id", "content"],
        },
      ],
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};
