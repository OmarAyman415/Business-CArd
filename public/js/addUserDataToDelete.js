deleteBtns = document.getElementsByClassName("delete");
editBtns = document.getElementsByClassName("edit");
deleteInputButton = document.getElementById("userId")
editInputButton = document.getElementById("editUserId")
console.log(deleteInputButton)
for (let i = 0; i < deleteBtns.length; i++) {
    const btn = deleteBtns[i];
    
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(btn.id)
        deleteInputButton.setAttribute("value", btn.id);
       
    })
    
}
for (let i = 0; i < editBtns.length; i++) {
    const btn = editBtns[i];
    
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(btn.id)
        editInputButton.setAttribute("value", btn.id);
       
    })
    
}




console.log("hello")