import { mongoPW } from "./security"

const mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://typeit-dev:' + mongoPW + '@typeit.mwr4c.mongodb.net/TypeIt?retryWrites=true&w=majority';
var schema = mongoose.Schema;
var TypeItSchema = new schema({
  id: Number,
  name: String,
  email: String,
  phone: String
})
var TypeItModel = mongoose.model('TypeIdModel', TypeItSchema);
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let max = 9999;
let min = 1;
let randomId = Math.floor(Math.random() * (max - min + 1) + min)

export const hasValues =
    (obj) => Object.values(obj).some(o => o !== null && typeof o !== "undefined")

export function createInfo(body: any) {
    const {name, email, phone} = body
    const id = Math.floor(Math.random() * (max - min + 1) + min)

    var createdInfo = new TypeItModel({
        id: id,
        name: name,
        email: email,
        phone: phone
    })

    createdInfo.save(function (err) {
        if (err) return handleError(err);
    })
    console.log('id is: ' + id)
    return id
}

export const handleError = (err) => {
    console.log(err);
}

export function searchInfo(id: number) {
    return TypeItModel.
                findOne().
                where('id').equals(id).
                select('id name email phone')
                .clone()
                .exec();
}

export async function checkIdExists(id: number) {
    console.log("Checking if id: " + id + " exists.")
    const numInfos = await TypeItModel.countDocuments( { id: id }, function (err, count) {
        console.log('Record was found for id: ' + id);
    }).clone();
    return numInfos > 0
}

export async function checkUserExists(body: any) {
    const { name, email, phone } = body;
    const numNames = await TypeItModel.countDocuments ( { name: name }, function (err, count) {}).clone().exec()
    const numEmails = await TypeItModel.countDocuments ( { email: email }, function (err, count) {}).clone().exec()
    const numPhones = await TypeItModel.countDocuments ( { phone: phone }, function (err, count) {}).clone().exec()
    console.log((numNames + numEmails + numPhones))
    return (numNames + numEmails + numPhones) > 0
}