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

// currentUser is the root folder
// this query will only find the next one level down childFolders
exports.readHomeFolders = async (userId, parentId = null) => {
    const folders = await prisma.folder.findMany({
        where: {
            ownershipId: userId,
            parentId: parentId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return folders;
}

exports.readParentChildFolders = async (userId, parentId) => {
    const folders = await prisma.folder.findMany({
        where: {
            ownershipId: userId,
            parentId: parentId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return folders;
}

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
    // console.log(folder);
    // console.log(folderId);
    return folderId;
};

exports.getFolderPath = async (userId, folderId, array = []) => {
    if (!folderId) return array;

    const folder = await prisma.folder.findFirst({
        where: {
          id: folderId,
          ownershipId: userId,
        },
    });

    if (!folder) return;

    array.push(folder);
    
    if (!folder.parentId) {
        return array.reverse();
    } else {
        return await this.getFolderPath(userId, folder.parentId, array);
    }
}

exports.addFolderToFolder = async (folderName, ownershipId, parentId) => {
    const folder = await prisma.folder.create({
        data: {
            name: folderName,
            ownershipId: ownershipId,
            parentId: parentId,
        },
    });
    return folder;
}

exports.renameFolder = async (userId, folderId, newName) => {
    const folder = await prisma.folder.update({
        where: {
            ownershipId: userId,
            id: folderId,
        },
        data: {
            name: newName,
        },
    });
    return folder;
}

exports.readFolder = async (userId, folderId) => {
    const folder = await prisma.folder.findFirst({
        where: {
            ownershipId: userId,
            id: folderId,
        }
    });
    return folder;
}

exports.deleteFolder = async (userId, folderId, array = []) => {
    array.push(folderId);

    const childrenFolders = await prisma.folder.findMany({
        where: {
          ownershipId: userId,
          parentId: folderId,
        },
    });

    await Promise.all(
        childrenFolders.map((folder) => this.deleteFolder(userId, folder.id, array)),
    );

    if (folderId === array[0]) {
        await prisma.$transaction(async (tx) => {
            await tx.folder.deleteMany({
                where: {
                  id: {
                    in: array,
                  },
                },
            });
        });
        return { deletedFolders: array.length };
    };
    return null;
}

/*
* ---------------- file queries ---------------------------
*/
exports.addAFile = async (filename, originalName, fileType, path, userId, folderId = null) => {
    const file = await prisma.file.create({
        data: {
            name: filename,
            originalName: originalName,
            fileType: fileType,
            path: path,
            ownershipId: userId,
            folderId: folderId,
        },
    });
    console.log("added file: ", file);
    return file;
}
