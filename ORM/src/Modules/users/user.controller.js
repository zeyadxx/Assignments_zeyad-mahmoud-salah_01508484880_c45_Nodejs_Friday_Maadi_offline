import { Router } from "express";
const router = Router();
import * as users from "./user.service.js";


//----signup-----
router.post("/signup", async (req, res) => {
  const inputs = req.body;
  try {
    const result = await users.signup(inputs);
    console.log("created user successful");

    return res
      .status(201)
      .json({ message: "created user successful", user: result });
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      console.log("the email already exist!");
      return res
        .status(400)
        .json({ message: "the email already exist!", error });
    }
    console.log("faild to create user!!", error.message);
    return res
      .status(400)
      .json({ message: "faild to create user!!", error: error.message });
  }
});
//-----upsert-----
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const inputs = req.body;

    const [user, created] = await users.Create_update(inputs, id);
    console.log("the user created or updated successful");
    return res.status(201).json({ user, created });
  } catch (error) {
    return res.status(500).json({
      message: "created failed",
      error: error.message,
    });
  }
});

//----get by email----
router.get("/by_email", async (req, res) => {
  const { email } = req.query;
  try {
    const result = await users.getUserByEmail(email);

    if (!result) {
      console.log("this email not found!!");
      return res.status(404).json({ message: "this email not found!!" });
    }
    return res.status(200).json(result);
  } catch (error) {}
});

// get by id----
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await users.getUserById(id);
    if (!result) {
      console.log("not found user by this id!");
      return res.status(404).json({ message: "not found user by this id!" });
    }
    console.log({ user: result });
    return res.status(200).json(result);
  } catch (error) {
    console.log({ error: error.message });

    return res.status(500).json({
      message: "getting by id failed",
      error: error.message,
    });
  }
});


export default router;
