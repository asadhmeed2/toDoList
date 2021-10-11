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
        return `<input type='checkbox' id='check${this.id}'><div class="note" id="${this.id}"><input type='text' disabled="disabled" class="noteText" id="text${this.id}" value='${this.note}'><input type="button" class="noteDelete" id="delete${this.id}" value='delete'><input type="button" id="edit${this.id}" class="edit" value='edit'></div>`
    } toString() {
        return `note`
    }


}