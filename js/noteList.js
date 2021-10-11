import { Note } from "./note.js";

export class ToDoList {
    constructor(data=null) {
        this.noteList = [];
        if (!data) {
            this.noteList=[];
        }else{
            data=[...data.todo.noteList];
            console.log(data);
            data.map(el=>{
                this.noteList.push(new Note(el.id,el.note,el.isActive,el.startDate,el.endDate))
            })
        }

    }
    addNote(note) {
        if (new Note().typeof(note)) {
            if (!this.varify(note.getId())) {
                this.noteList = [...this.noteList, note];
            }
        }
        return note;
    }
    delete(noteId){
        if(this.varify(noteId)){
            console.log(noteId);
            this.noteList =this.noteList.filter(el=>!(el.id === noteId));
        }
    }
    varify(noteId) {
        if (typeof noteId === 'number') {
            let element = this.noteList.find((el) => el.getId() === noteId)
            if (element) {
                return true;
            }
        }
        return false;
    }
    editNote(noteId, noteString, isActive, startDate, endDate) {
    
        let note = this.getNote(noteId)
        if (note) {
            note.setNote(noteString);
            note.setIsActive(isActive);
            try {
                if (startDate ){
                    note.setStartDate(startDate);
                }
                if(endDate) {
                    note.setEndDate(endDate);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    getNote(noteId) {
        if (this.varify(noteId)) {
            return this.noteList.find((el) => el.getId() == noteId);
        }
    }
    getAllNotes() {
        return this.noteList;
    }

}