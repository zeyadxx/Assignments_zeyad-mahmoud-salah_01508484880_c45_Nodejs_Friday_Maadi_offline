import { dbService, UserModel } from "../DB/index.js";
import { tokenEnum } from "../Utils/Enums/user.enum.js";
import * as err from "../Utils/response/error.response.js";
import { getSignature, verifyToken } from "../Utils/tokens/token.js";

export const decodedToken = async ({
  authorization,
  tokenType = tokenEnum.Access,
}) => {
  const [Bearer, token] = authorization.split(" ") || [];

  if (!Bearer || !token)
    throw err.BadRequestException("Bearer or token is invalid");

  // get signature if be user or admain by using bearer
  const signature = await getSignature({ signatureLevel: Bearer });

  // decoded token
  const decoded = verifyToken({
    token,
    secrtKey:
      tokenType == tokenEnum.Access
        ? signature.accessSignature
        : signature.refreshSignature,
  });

  //check user if exist
  const user = await dbService.findById({ id: decoded._id, model: UserModel });
  if (!user) throw err.NotFoundException();

  return { user, decoded };
};

// authentication middleware
export const authentication = ({ tokenType = tokenEnum.Access }) => {
  return async (req, res, next) => {
    const { user, decoded } =
      (await decodedToken({
        authorization: req.headers.authorization,
        tokenType,
      })) || {};
    req.user = user;
    req.decoded = decoded;
    return next();
  };
};
export const authorization = (accessRoles = []) => {
  return (req, res, next) => {
    if (!accessRoles.includes(req.user.role)) throw err.UnauthorizedException();
    return next();
  };
};
