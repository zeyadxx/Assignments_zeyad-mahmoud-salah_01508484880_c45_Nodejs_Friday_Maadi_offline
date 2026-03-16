import { Router } from "express";
import * as authService from "./auth.service.js";
import { authentication } from "../../Middlewares/auth.middleware.js";
import { tokenEnum } from "../../Utils/Enums/user.enum.js";
const router = Router();

router.post("/signup", authService.signup);
router.post("/login", authService.login);
router.post(
  "/refresh-Token",
  authentication({ tokenType: tokenEnum.Refresh }),
  authService.refreshToken,
);

export default router;
