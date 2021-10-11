import { Note } from "./note.js";
import { ToDoList } from "./noteList.js";
let toDoList;
const localStorageItemName = 'toDoListandId'
function start() {

}


function checkAndLoadLocalStorage() {
    if (ifItemInLocalStorage(localStorageItemName)) {
        let data = getItemFromLocalStorage(localStorageItemName);
        console.log(data);
        toDoList = new ToDoList(data);
    } else {
        toDoList = new ToDoList();
        updateItemInLocalStorage(localStorageItemName, { id: 0, todo: toDoList });
    }
}

function handleAddItem() {
    if (getHtmlObject('#noteTextInput').value !== "") {
        getHtmlObject('.taskData').style.display = 'flex';
    }
}
function handleConfirmBtn() {
    const note = getHtmlObject('#noteTextInput').value,
        startDate = getHtmlObject('#startDate').value,
        endDate = getHtmlObject('#endDate').value

    let data = getItemFromLocalStorage(localStorageItemName);
    let task = new Note(data.id + 1, note, true, startDate, endDate)
    toDoList.addNote(task);
    data.todo = toDoList;
    data.id++;
    updateItemInLocalStorage(localStorageItemName, data)
    getHtmlObject('.taskData').style.display = 'none';
    //call the function that shows the items on the screen
    showTasks();
    
    console.log(data);
}

function showTasks() {
    const tasks = getHtmlObject('.todoListShowScreen');
    let string = "";
    toDoList.getAllNotes().map((note) => {
        string += note.getDisplayData();
      
    });
    tasks.innerHTML = string;
    addEventListenerToDeleteEditBtn();
}
function addEventListenerToDeleteEditBtn(){
    toDoList.getAllNotes().map((note) => {
        getHtmlObject(`#editFormWraper${note.id}`).style.display = "none"
        addEventListenerToObject(`#delete${note.getId()}`, handleDeletion, 'click');
        addEventListenerToObject(`#edit${note.getId()}`, handleEdit, 'click');
        addEventListenerToObject(`#check${note.getId()}`, handleCheck, 'click');
    });
}
function handleCheck(e) {

}
function handleEdit(e) {
    console.log("edit Clicked");
    const editForm = getHtmlObject(`#editFormWraper${e.target.id.slice('edit'.length)}`);
    editForm.style.display="flex";
    editForm.style.flexDirection="column"
    addEventListenerToObject(`#editedConfirmBtn${e.target.id.slice('edit'.length)}`, handleEditedData,"click");
}

function handleEditedData(e){
    const text = getHtmlObject(`#EditedNoteTextInput${this.id.slice('editedConfirmBtn'.length)}`), startDate = getHtmlObject(`#editedStartDate${this.id.slice('editedConfirmBtn'.length)}`), endDate = getHtmlObject(`#editedEndDate${this.id.slice('editedConfirmBtn'.length)}`);
    if(text.value.length>0){
        toDoList.editNote(parseInt(this.id.slice('editedConfirmBtn'.length)), text.value,true,startDate.value,endDate.value )
        console.log(toDoList);
        updateItemInLocalStorage(localStorageItemName, { id: getItemFromLocalStorage(localStorageItemName).id,todo:toDoList});
        showTasks()
    }
    getHtmlObject(`#editFormWraper${this.id.slice('editedConfirmBtn'.length)}`).style.display = "none"
    
}
function handleDeletion(e) {
    toDoList.delete(parseInt(e.target.id.slice('delete'.length)));
    console.log(parseInt(e.target.id.slice('delete'.length)));
    updateItemInLocalStorage(localStorageItemName, { id: getItemFromLocalStorage(localStorageItemName).id,todo: toDoList})
    showTasks();
}
function getHtmlObject(IdOrClass) {
    return document.querySelector(IdOrClass);
}



//local storage
function getItemFromLocalStorage(key) {
    return ifItemInLocalStorage(key);
}
function updateItemInLocalStorage(key, data) {
    if (ifItemInLocalStorage(key)) {
        localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(data));
}
function ifItemInLocalStorage(key) {
    let item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
}
function addEventListenerToObject(IdOrClass, callback, type) {
    document.querySelector(IdOrClass).addEventListener(type, callback);
}
window.onload = function () {
    start();
    checkAndLoadLocalStorage();
    addEventListenerToObject("#addItemBtn", handleAddItem, "click");
    addEventListenerToObject("#confirmBtn", handleConfirmBtn, "click");
    showTasks();
}
