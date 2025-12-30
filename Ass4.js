const express = require("express");
const app = express();
const port = 5000;
const fs = require("node:fs");
app.use(express.json());
function rf() {
  return JSON.parse(fs.readFileSync("./file.json", "utf-8"));
}
function wf(data) {
  fs.writeFileSync("./file.json", JSON.stringify(data, null, 2));
}
const users = rf();

//1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)(1

app.post("/users", (req, res) => {
  const newuser = req.body;
  if (users.some((user) => user.email == newuser.email)) {
    return res.status(404).json({ message: "the user already exist!!" });
  } else {
    users.push(newuser);
    wf(users);
    return res.json({ message: "user added successfully" });
  }
});

//2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the params. (1 Grade)

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id == id);
  if (userIndex == -1) {
    return res.status(404).json({ message: "the user not found!!" });
  } else {
    const body = req.body;
    users[userIndex] = { ...users[userIndex], ...body };
    wf(users);
    return res.json({ message: "the user updated \n", user: users[userIndex] });
  }
});

//3. Create an API that deletes a User by ID. The user id should be retrieved from either the request body or optional params. (1 Grade)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  if (users.some((user) => user.id == id)) {
    const newusers = users.filter((user) => user.id != id);
    wf(newusers);
    return res.json({
      message: "the user deleted successfull",
      users: newusers,
    });
  } else {
    return res.status(404).json({ message: "the user id not found!! " });
  }
});

//4. Create an API that gets a user by their name. The name will be provided as a query parameter. (1 Grade)
app.get("/users/getByName/", (req, res) => {
  const { name } = req.query;
  const user = users.find((user) => user.name == name);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "user name not found!!" });
  }
});

//5. Create an API that gets all users from the JSON file. (1 Grade)
app.get("/users", (req, res) => {
  res.json(users);
});

//6. Create an API that filters users by minimum age. (1 Grade)

app.get("/users/filter", (req, res) => {
  const { minAge } = req.query;
  const newusers = users.filter((user) => user.age > minAge);
  console.log(newusers);

  if (newusers.length == 0) {
    return res.status(404).json({ message: "users not found!" });
  } else {
    return res.json(newusers);
  }
});

//7. Create an API that gets User by ID. (1 Grade)
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  if (user) {
    return res.json(user);
  } else {
    res.status(404).json({ message: "user not found! " });
  }
});

app.listen(port, () => {
  console.log(`you listen in port: ${port}`);
});
