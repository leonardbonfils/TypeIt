import { personalInfo } from "./types";
import * as app from "./app"

export let infos: personalInfo[] = [];

let max = 9999;
let min = 1;
let randomId = Math.floor(Math.random() * (max - min + 1) + min)

export const hasValues =
    (obj) => Object.values(obj).some(o => o !== null && typeof o !== "undefined")
export const isDefined =
    (val) => val !== null && typeof val !== "undefined"

export const generatedInfo: personalInfo = {
    id: randomId,
    name: "John Smith",
    email: "john.smith@icloud.com",
    phone: "+1 (416) 335-4512"
}

infos.push(generatedInfo)

export function createInfo(body: any) {
    
    const {name, email, phone} = body

    const createdInfo: personalInfo = {
      id: Math.floor(Math.random() * (max - min + 1) + min),
      name: name,
      email: email,
      phone: phone
    };

    infos.push(createdInfo)

    return createdInfo.id
}

export function deleteAllInfos() {
    infos = []
}

export function searchInfo(id: number) {
    return infos.find(info => info.id === id);
}

export function checkIdExists(id: number) {
    console.log("Checking if id: " + id + " exists.")
    return isDefined(infos.find(info => info.id === id))
}

export function checkUserExists(body: any) {
    const { name, email, phone } = body;
    return isDefined(infos.find(info => info.name === name || info.email === email || info.phone === phone))
}