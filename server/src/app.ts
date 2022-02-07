const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World 2!");
});

app.post("/endpoint", (req, res) => {
  res.json(req.params[0]);
});

app.get("/testGET", (req, res) => {
  res.send("Testing new GET.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
