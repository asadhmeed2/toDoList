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
    }else{
        toDoList = new ToDoList();
        updateItemInLocalStorage(localStorageItemName, { id: 0, todo: toDoList });
    }
}

function handleAddItem() {
    if (getHtmlObject('#noteTextInput').value !== "") {
        getHtmlObject('.taskData').style.visibility = 'visible';
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
    getHtmlObject('.taskData').style.visibility = 'heddin';
    //call the function that shows the items on the screen
    console.log(data);
}



function getHtmlObject(IdOrClass) {
    return document.querySelector(IdOrClass);
}

//local storage
function getItemFromLocalStorage(key) {
    return ifItemInLocalStorage(key)
        ;
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
}
