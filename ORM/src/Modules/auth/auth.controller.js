import { Router } from "express";
const router = Router();
import * as auth from "./auth.service.js";

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const inputs = req.body;

    const [user, created] = await auth.Create_update(inputs, id);
    console.log("the user created or updated successful");
    return res.status(201).json({ user, created });
  } catch (error) {
    return res.status(500).json({
      message: "created failed",
      error: error.message,
    });
  }
});

export default router;
