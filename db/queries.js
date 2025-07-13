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

exports.addAFolder = async (folderName = 'new folder', userId) => {
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
    // console.log(add);
    return add;
};

exports.getAllFolders = async (userId) => {
    const folders = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            folders: {
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    });
    // console.log(folders);
    return folders;
};

exports.findNewestFolderId = async (userId) => {
    // find the newly created folder
    const folder = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            folders: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            },
        },
    });
    // find its id
    const folderId = folder.folders[0].id;
    console.log(folder);
    console.log(folderId);
    return folderId;
};
