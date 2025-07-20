const newfolderModal = document.querySelector("#newfolderModal");
const cancelNewFolderBtn = document.querySelector(".cancelNewFolderBtn");
const newFolderBtn = document.querySelector(".newFolderBtn");

const uploadModal = document.querySelector("#uploadModal");
const cancelUploadBtn = document.querySelector(".cancelUploadBtn");
const uploadBtn = document.querySelector(".uploadBtn");

const renameModal = document.querySelector("#renameModal");
const cancelRenameBtn = document.querySelector(".cancelRenameBtn");
const renameBtn = document.querySelector(".renameBtn");

/*
* ------------- new folder modal ---------------------
*/ 
cancelNewFolderBtn.addEventListener("click", () => {
    newfolderModal.close();
});
newFolderBtn.addEventListener("click", () => {
    newfolderModal.showModal();
});

/*
* ------------- rename modal ------------------------
*/ 
cancelRenameBtn.addEventListener("click", () => {
    renameModal.close();
});
renameBtn.addEventListener("click", () => {
    renameModal.showModal();
});

/*
* ------------- upload modal ------------------------
*/ 
cancelUploadBtn.addEventListener("click", () => {
    uploadModal.close();
});
uploadBtn.addEventListener("click", () => {
    uploadModal.showModal();
});