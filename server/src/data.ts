type personalInfo = {
    id?: number
    name?: string
    email?: string
    phone?: string
}

let infos: personalInfo[] = [];

let max = 9999;
let min = 1;
let randomId = Math.floor(Math.random() * (max - min + 1) + min)

const generatedInfo: personalInfo = {
    id: randomId,
    name: "leonard bonfils",
    email: "leonard.bonfils@gmail.com",
    phone: "(514) 699-5586"
}

function createInfo(name?: string, email?: string, phone?: string) {
    const createdInfo: personalInfo = {
      id: Math.floor(Math.random() * (max - min + 1) + min),
      name: name,
      email: email,
      phone: phone
    };

    infos.push(createdInfo)
    return createdInfo
}

function searchInfo(id: number) {
    return infos.find(info => info.id === id);
}

exports.generatedInfo = generatedInfo;
exports.createInfo = createInfo;
exports.searchInfo = searchInfo;