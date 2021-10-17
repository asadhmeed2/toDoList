export class Note {
    constructor(id, whatToDo, isActive, startDate, endDate) {
        this.id = id;
        this.note = whatToDo;
        this.isActive = isActive;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    getId() {
        return this.id;
    }
    setNote(note) {
        this.note = note;
    }
    getNote() {
        return this.note;
    }
    getStartData(){
        return this.startDate;
    }
    setStartDate(startDate) {
        this.startDate =startDate;
    }
    getEndData() {
        return this.endDate;
    }
    setEndDate(endDate) {
        this.endDate =endDate;
    }
    setIsActive(isActive) {
        if (typeof isActive == 'boolean') {
            this.isActive = isActive;
        }
    }
    getIsActive() {
        return this.isActive;
    }
    typeof(note) {
        try {
            if (note.toString() === 'note') {
                return true;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
        return false;
    }
    getDisplayData() {

        return `<div class="note" id="note${this.id}"><input type='checkbox' id='check${this.id}'><div class="note-buttons"><input type="button" class="noteDelete" id="delete${this.id}" value='delete'><input type="button" id="edit${this.id}" class="edit" value='edit'></div><div type='text' class="noteText" id="text${this.id}">${this.note}</div></div>
         <div class="editFormWrapper" id="editFormWraper${this.id}" ><label for="editTaskText">Task</label>
            <input type="text" placeholder="Enter your notes" name="editTaskText" class="editedNote" id="EditedNoteTextInput${this.id}">
            <label for="editedStartDate">Start Date</label>
            <input type="date" class="note" id="editedStartDate${this.id}" name="editedStartDate">
            <label for="editedEndDate">End Date</label>
            <input type="date" class="note" id="editedEndDate${this.id}" name="editedEndDate">
            <input type="button" value="Confirm" id="editedConfirmBtn${this.id}">
        </div>`
    } toString() {
        return `note`
    }


}