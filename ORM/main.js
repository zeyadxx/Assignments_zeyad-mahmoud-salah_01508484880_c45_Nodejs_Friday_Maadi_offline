import express from "express";
import { testConnection } from "./src/DB/connection.js";
import * as models from "./src/DB/Models/index.js";
import { userRouter, postRouter, commentRouter } from "./src/Modules/index.js";
await testConnection();
const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/post", postRouter);
app.use("/comments", commentRouter);
app.listen(5000, () => {
  console.log("the server running on port 5000");
});
