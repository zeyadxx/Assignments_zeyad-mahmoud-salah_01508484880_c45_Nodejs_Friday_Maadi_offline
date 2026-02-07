import { where } from "sequelize";
import { userModel } from "../../DB/Models/index.js";

export const signup = async (data) => {
  const { name, email, password, role } = data;
  try {
    const user = await userModel.create({ name, email, password, role });
    return user;
  } catch (error) {
    console.log("error at creation a user");
    throw error;
  }
};

export const Create_update = async (data, id) => {
  try {
    const result = await userModel.upsert(
      { id, ...data },
      { where: { id }, validate: false },
    );
    return result;
  } catch (error) {
    console.error("Upsert error:", error.message);
    console.error("Full error details:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.log("erroe in find the user by email");
  }
};

export const getUserById = async (id) => {
  try {
    const user = await userModel.findByPk(id, {
      attributes: { exclude: "role" },
    });
    return user;
  } catch (error) {
    console.log("error in get user by id exclude role");
  }
};

