// import Primsa Client
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (username, password) => {
    const user = await prisma.user.create({
        data: {
            username,
            password,
        }
    })
    return user;
};

exports.findUserByUsername = async (username = null) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    return user;
};

exports.findUserById = async (id = null) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
};
