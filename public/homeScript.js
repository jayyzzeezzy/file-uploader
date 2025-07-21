const newfolderModal = document.querySelector("#newfolderModal");
const cancelNewFolderBtn = document.querySelector(".cancelNewFolderBtn");
const newFolderBtn = document.querySelector(".newFolderBtn");
cancelNewFolderBtn.addEventListener("click", () => {
    newfolderModal.close();
});
newFolderBtn.addEventListener("click", () => {
    newfolderModal.showModal();
});

const newFileModal = document.querySelector(".newFileModal");
const cancelNewFile = document.querySelector(".cancelNewFile");
const newFileBtn = document.querySelector(".newFileBtn");
// home page
cancelNewFile.addEventListener("click", () => {
    newFileModal.close();
});
newFileBtn.addEventListener("click", () => {
    newFileModal.showModal();
});
