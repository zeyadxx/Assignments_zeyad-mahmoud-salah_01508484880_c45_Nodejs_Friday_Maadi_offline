import { where } from "sequelize";
import { userModel } from "../../DB/Models/index.js";

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
