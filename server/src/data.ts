type personalInfo = {
    id?: number
    name?: string
    email?: string
    phone?: string
}

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

    return createdInfo
}

exports.generatedInfo = generatedInfo;
exports.createInfo = createInfo;