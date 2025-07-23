const deleteFileModal = document.querySelector("#deleteFileModal");
const deleteFileBtn = document.querySelector(".deleteFileBtn");
const cancelFileDelete = document.querySelector(".cancelFileDelete");

cancelFileDelete.addEventListener("click", () => {
    deleteFileModal.close();
});
deleteFileBtn.addEventListener("click", () => {
    deleteFileModal.showModal();
});