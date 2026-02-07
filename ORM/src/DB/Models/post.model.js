import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { userModel } from "./user.model.js";

class Post extends Model {}
Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "posts",
  },
);
userModel.hasMany(Post, {
  foreignKey: "userId",
});
Post.belongsTo(userModel, {
  foreignKey: "userId",
});
export const postModel = Post;
