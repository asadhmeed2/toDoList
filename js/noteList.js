import { Note } from "./note.js";

export class ToDoList {
    constructor() {
        this.noteList = [];
    }
    add(note) {
        if (new Note().typeof(note)) {
            if (!this.varify(note.getID())) {
                this.noteList = [...this.noteList, note];
            }
        }
        return note;
    }
    varify(noteId) {
        if (typeof noteId === 'number') {
            let element = this.noteList.find((el) => el.getID() === noteId)
            if (element) {
                return true;
            }
        }
        return false;
    }
    editNote(noteId, noteString, startDate, endDate) {
        let note = this.getNote(noteId)
        if (note) {
            note.setNote(noteString);
            note.setisActive(isActive);
            try {
                if (startDate.getDate() && endDate.getDate()) {
                    note.setStartDate(startDate);
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