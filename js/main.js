import { Note } from "./note.js";
import { ToDoList } from "./noteList.js";
let toDoList;

function start() {

}


function checkAndLoadLocalStorage(){
    if(getItemFromLocalStorage('toDoList')){
        let data = getItemFromLocalStorage('toDoList');
        console.log(data);
        toDoList = new ToDoList(data);
    }
    
}

function handleAddItem(){
    if (getHtmlObject('#noteTextInput').value !== ""){
        getHtmlObject('.taskData').style.visibility = 'visible';
    }
}
function handleConfirmBtn(){
    const note = getHtmlObject('#noteTextInput'),
    startDate = getHgetHtmlObject('#startDate'),
    endDate = getHgetHtmlObject('#endDate')
    
}



function getHtmlObject(IdOrClass){
    return document.querySelector(IdOrClass);
}

//local storage
function getItemFromLocalStorage(key) {
    return ifItemInLocalStorage(key) 
;
}
function updateItemInLocalStorage(key, data) {
    if(ifItemInLocalStorage(key)) {
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
function addEventListenerToObject(IdOrClass,callback,type) {
    document.querySelector(IdOrClass).addEventListener(type,callback);
}
window.onload = function () {
    start();
    checkAndLoadLocalStorage();
    addEventListenerToObject("#addItemBtn",handleAddItem,"click");
    addEventListenerToObject("#confirmBtn",handleConfirmBtn,"click");
}
