import { Router } from "express";
import * as userService from "./user.service.js";
import {
  authentication,
  authorization,
} from "../../Middlewares/auth.middleware.js";
import { roleEnum } from "../../Utils/Enums/user.enum.js";
const router = Router();

router.get(
  "/getProfile",
  authentication({}),
  authorization([roleEnum.Admain]),
  userService.getProfile,
);
router.post("/create", userService.create);
router.patch("/update/:id", userService.update);
export default router;
