import { sequelize } from "../connection.js";
import { DataTypes, Model } from "sequelize";
import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";

class comment extends Model {}

comment.init(
  {
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  },
  { sequelize, tableName: "comments" },
);
userModel.hasMany(comment, {
  foreignKey: "userId",
});
comment.belongsTo(userModel, {
  foreignKey: "userId",
});
postModel.hasMany(comment, {
  foreignKey: "postId",
});
comment.belongsTo(postModel, {
  foreignKey: "postId",
});
export const commentModel = comment;
