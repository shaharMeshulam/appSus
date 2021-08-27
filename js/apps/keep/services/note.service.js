import { storageService } from "../../../services/storage.service.js";

export const noteService = {
    addNote,
    getNotes,
    removeNote,
    getNoteById,
    setColor,
    updateNote,
    togglePin,
    duplicateNote
}

import { utilService } from "../../../services/util.service.js";

function getNotes() {
    return Promise.resolve(gNotes)
}

function addNote(note) {
    if (note.type === 'note-todos') {
        note.info.todos = note.info.todos.split(',')
        note.info.todos = note.info.todos.map(todo => ({ txt: todo, isDone: false }))
    }
    for (const key in note.info) {
        if (note.info[key]) {
            note.id = utilService.makeId(8)
            console.log(note);
            gNotes.push(note)
            _saveNotes()
            return
        }
    }
}

function togglePin(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    note.isPinned = !note.isPinned
    _saveNotes()
}

function removeNote(noteId) {
    const noteIdx = gNotes.findIndex(note => note.id === noteId)
    gNotes.splice(noteIdx, 1);
    _saveNotes()
}

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function setColor(note, color) {
    note.style = { backgroundColor: color }
    _saveNotes()
}

function updateNote(noteId, content, field) {
    getNoteById(noteId).then(
        note => {
            note.info[field] = content || ''
            _saveNotes()
        }
    )

}

function duplicateNote(note) {
    const newNote = JSON.parse(JSON.stringify(note))
    newNote.id = utilService.makeId(8)
    gNotes.push(newNote)
    _saveNotes()
}

function _saveNotes() {
    storageService.saveToStorage('notesDB', gNotes)
}

function _loadNotes() {
    return storageService.loadFromStorage('notesDB')
}

let gNotes = _loadNotes() || [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" }
    }, {
        id: "n102",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Medasdasd Baby!" }
    },
    {
        id: "n112302",
        type: "note-img",
        info: {
            url: "https://i.stack.imgur.com/Op6dK.png",
            title: "Bobi and Me"
        },
        style: { backgroundColor: "#D3D3D3" }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [{ txt: "Driving liscence", isDone: false }, { txt: "Coding power", isDone: true }]
        }
    }
];