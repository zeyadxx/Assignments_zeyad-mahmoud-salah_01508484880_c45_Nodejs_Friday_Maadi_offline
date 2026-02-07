import { sequelize } from "../connection.js";
import { DataTypes, Model } from "sequelize";

export const userModel = sequelize.define("Users", {
  name: {
    type: DataTypes.STRING,
    validate: {
      checkNameLength(name) {
        if (name.length <= 2) {
          console.log("invalid name, must be greater than 2");
          throw new Error("invalid name, must be greater than 2");
        }
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      checkPasswordLength(password) {
        if (password.length <= 6) {
          {
            console.log("the password must be greater than 6");
            throw new Error("the password must be greater than 6");
          }
        }
      },
    },
  },

  role: DataTypes.ENUM("user", "admin"),
});
