import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("test", "zeyad", "000156", {
  dialect: "mysql",
  port: 3306,
  host: "localhost",
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("connection of db successfull");
  } catch (error) {
    console.error("Error at connection of db!!!!", error.message);
    console.error("Full error:", error);
  }
};
