const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
console.log(itemsArray)

document.querySelector("#enter").addEventListener("click", ()=>{
const item = document.querySelector("#item").value;
createItem(item);
})

function displayItems(){
    let items = " "
    for (let i = 0; i < itemsArray.length; i++){
        items += ` <div class="item">
                    <div class="input-controller">
                    <textarea disabled>${itemsArray[i]}</textarea>
                    <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-regular fa-pen-to-square editBtn"></i>
                    </div>
                </div>
                <div class="update-controller">
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                </div>
            </div>`
    }
document.querySelector(".todo-list").innerHTML = items;
activateDeleteListeners();
activateEditListeners();
activateSaveListeners();
activateCancelListeners();
}

function activateDeleteListeners(){
    let deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach((btn,i) => {
        btn.addEventListener("click", () => {
            deleteItem(i);
        });
    });
}
    function deleteItem(i){
        itemsArray.splice(i, 1);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        location.reload();
    
}

function activateEditListeners(){
    let editBtns = document.querySelectorAll(".editBtn");
    const updateControllers = document.querySelectorAll(".update-controller ");
    const inputControllers = document.querySelectorAll(".input-controller textarea");
    editBtns.forEach((btn,i) => {
        btn.addEventListener("click", () => {
            updateControllers[i].style.display = "block";
            inputControllers[i].disabled = false;
        });
    });
}

function activateSaveListeners(){
    const saveBtns = document.querySelectorAll(".saveBtn");
    const inputControllers = document.querySelectorAll(".input-controller textarea");
    saveBtns.forEach((btn,i) => {
        btn.addEventListener("click", () => {
            updateItem(inputControllers [i].value, i);
            
        });

    });
}

function updateItem(value, i){
    itemsArray[i] = value;
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();
}

function activateCancelListeners(){
    const cancelBtn= document.querySelectorAll(".cancelBtn");
    const updateControllers = document.querySelectorAll(".update-controller");
    inputControllers = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((btn,i) => {
        btn.addEventListener("click", () => {
            updateControllers[i].style.display = "none";
            inputControllers[i].disabled = true;
        });
    });
}

function createItem(item){
itemsArray.push(item);
localStorage.setItem('items', JSON.stringify(itemsArray));
location.reload();

}

function displayDate(){
    let date = new Date();
    date = date.toDateString().split(" ");
   document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3] + " " ;
}

window.onload = function(){
    displayDate();
    displayItems();
}


