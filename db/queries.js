// import Primsa Client
const { name } = require('ejs');
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

exports.addAFolder = async (folderName, userId, parentId) => {
    const add = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            folders: {
                create: {
                    name: folderName,
                }
            }
        },
        include: {
            folders: true,
        },
    });
    return add;
};