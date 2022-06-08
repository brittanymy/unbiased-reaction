const fs = require("fs");
const util = require("util");
const uuid = require("../helpers/uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
    // Read notes
    read() {
        return readFileAsync("db/db.json", "utf-8");
    }
    // Write notes
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }
    // Get notes
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    // Add notes
    addNotes(note) {
        const { title, text } = note;
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

    deleteNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id != id))
        .then((updatedNotes) => this.write(updatedNotes))
    }
}

module.exports = new Store();