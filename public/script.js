const modal = document.querySelector("#modal");
const cancelBtn = document.querySelector(".cancelBtn");
const newFolderBtn = document.querySelector(".newFolderBtn");

cancelBtn.addEventListener("click", () => {
    modal.close();
});

newFolderBtn.addEventListener("click", () => {
    modal.showModal();
});

