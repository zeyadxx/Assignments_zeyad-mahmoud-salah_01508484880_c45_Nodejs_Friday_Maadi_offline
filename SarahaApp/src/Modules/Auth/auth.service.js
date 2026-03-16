import {
  REFRESH_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_SECRET_KEY,
} from "../../../config/config.service.js";
import { dbService, UserModel } from "../../DB/index.js";
import { hashEnum } from "../../Utils/Enums/hash.enum.js";
import { err, succesResponse } from "../../Utils/response/index.js";
import { encrypt } from "../../Utils/security/encryption.js";
import { compareHash, generetHash } from "../../Utils/security/hash.js";
import jwt from "jsonwebtoken";
import {
  generateToken,
  getLoginCredientials,
  verifyToken,
} from "../../Utils/tokens/token.js";

//---- SIGNUP-----
export const signup = async (req, res) => {
  // check user exist
  const userExist = await dbService.findOne({
    model: UserModel,
    filter: { email: req.body.email },
  });

  if (userExist) {
    throw err.ConflictException({ message: "the user is already exist!!" });
  }

  // hash password before store
  const hashPassword = await generetHash({
    plainText: req.body.password,
    algo: hashEnum.Argon,
  });

  // encryption phone
  const encryptedPhone = await encrypt(req.body.phone);

  // create user in DB
  const user = await dbService.create({
    model: UserModel,
    data: { ...req.body, password: hashPassword, phone: encryptedPhone },
  });

  return succesResponse({
    res,
    data: user,
    message: "the user created successfully",
  });
};

// -----LOGIN-----
export const login = async (req, res) => {
  const { email, password } = req.body;

  //check email exist
  const user = await dbService.findOne({
    model: UserModel,
    filter: { email },
    options: { lean: true },
  });

  if (!user) {
    throw err.NotFoundException({ message: "Not found this email !!" });
  }

  //check password
  if (user) {
    const matched = await compareHash({
      plainText: password,
      cipherText: user.password,
    });
    if (!matched) {
      return err.BadRequestException({ message: "incorrect password" });
    }
  }

  // generate token
  const credientials = await getLoginCredientials(user);
  
  return succesResponse({
    res,
    status: 200,
    message: "login successfully",
    data: { credientials },
  });
};

export const refreshToken = async (req, res) => {
  
  const credientials = await getLoginCredientials(req.user);

  return succesResponse({
    res,
    message: "Refresh token successfull",
    data: { credientials },
    status: 200,
  });
};
