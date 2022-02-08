const express = require("express");
const app = express();
const port = 3000;

const data = require("./data.ts");

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to TypeIt");
})

app.get("/get2", (req, res) => {
  res.send(data.generatedInfo)
})

app.get("/params/:param1/:param2", (req, res) => {
  res.send(req.params)
})

app.post("/saveInfo", (req, res) => {
  res.json({id: data.createInfo(String(req.body.name), String(req.body.email), String(req.body.phone)).id})
  // res.send(req.body.name)
})

app.post("/retrieveInfo", (req, res) => {
  res.json(data.searchInfo(Number(req.body.id)))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
