import jwt from "jsonwebtoken";
import {
  REFRESH_TOKEN_ADMIN_SECRET_KEY,
  REFRESH_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_MANAGER_SECRET_KEY,
  REFRESH_TOKEN_USER_SECRET_KEY,
  TOKEN_ADMIN_SECRET_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_MANAGER_SECRET_KEY,
  TOKEN_SECRET_KEY,
  TOKEN_USER_SECRET_KEY,
} from "../../../config/config.service.js";
import { roleEnum, signatureEnum } from "../Enums/user.enum.js";

export const generateToken = ({
  payload,
  secrtKey = TOKEN_SECRET_KEY,
  option = {
    expiresIn: TOKEN_EXPIRE_TIME,
    noTimestamp: true,
    issuer: "http://localhost:3000",
  },
}) => {
  return jwt.sign(payload, secrtKey, option);
};

export const verifyToken = ({ token, secrtKey = TOKEN_SECRET_KEY }) => {
  return jwt.verify(token, secrtKey);
};

export const getSignature = ({ signatureLevel = signatureEnum.User }) => {
  let signature = { accessSignature: undefined, refreshSignature: undefined };
  switch (signatureLevel) {
    case signatureEnum.User:
      ((signature.accessSignature = TOKEN_USER_SECRET_KEY),
        (signature.refreshSignature = REFRESH_TOKEN_USER_SECRET_KEY));
      break;

    case signatureEnum.Admain:
      ((signature.accessSignature = TOKEN_ADMIN_SECRET_KEY),
        (signature.refreshSignature = REFRESH_TOKEN_ADMIN_SECRET_KEY));
      break;

    default:
      ((signature.accessSignature = TOKEN_USER_SECRET_KEY),
        (signature.refreshSignature = REFRESH_TOKEN_USER_SECRET_KEY));
      break;
  }
  return signature;
};

export const getLoginCredientials = async (user) => {
  const signature = await getSignature({
    signatureLevel: (user.role == roleEnum.Admain
      ? signatureEnum.Admain
      : signatureEnum.User),
  });
  
  const accessToken = generateToken({
    payload: { _id: user._id },
    secrtKey: signature.accessSignature,
  });
  const refreshToken = generateToken({
    payload: { _id: user._id },
    secrtKey: signature.refreshSignature,
    option: { expiresIn: REFRESH_TOKEN_EXPIRE_TIME },
  });
  return { accessToken, refreshToken };
};
