import express from "express"
const cors = require('cors');
const app = express();
const port = 3000;

import * as data from "./data"

export let emptyPOST = "No parameters were provided in the request body."
export let infoNotFound = "No info associated with that id could be found. Enter a valid id."
export let infoAlreadyExists = "User info for that particular id already exists."
export let infoCreatedSuccess = "Personal info was successfully saved."
export let infoRetrievedSuccess = "Personal info was successfully retrieved."
export let allInfoDeleted = "All stored info has successfully been deleted."

app.use(express.json())
// app.use(cors({
//   origin: ['http://localhost:8080', 'http://www.typeit.ca']
// }));
app.use(cors());

// app.get("/", (req, res) => {
//   res.send(data.infos);
// })

app.get("/test", (req, res) => {
  res.json(data.generatedInfo)
})

app.post("/saveInfo", (req, res) => {
  validateBody(req, res)
  if (data.checkUserExists(req.body)) {
    res.status(409).send({error: infoAlreadyExists})
  } else {
      res.send({result: infoCreatedSuccess,
            id: data.createInfo(req.body)})
  }
})

app.post("/retrieveInfo", (req, res) => {
  validateBody(req, res)
  if (!data.checkIdExists(req.body.id)) {
    console.log(app.infoNotFound);
    res.status(409).send({ error: infoNotFound });
  } else {
    let foundInfo = data.searchInfo(req.body.id)
    res.send({result: infoRetrievedSuccess, userInfo: foundInfo})
  }
})

// app.get("/wipeInfo", (req, res) => {
//   data.deleteAllInfos()
//   res.send({result: allInfoDeleted})
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const validateBody = function(req, res) {
    if (!data.hasValues(req.body)) {
      console.log(emptyPOST);
      res.status(400).send({ error: emptyPOST });
    }
}