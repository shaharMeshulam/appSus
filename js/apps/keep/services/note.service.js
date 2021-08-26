export const noteService = {
    addNote,
    getNotes,
    removeNote,
    getNoteById,
    setColor,
    updateNote
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
            return
        }
    }
}

function removeNote(noteId) {
    const noteIdx = gNotes.find(note => note.id === noteId)
    gNotes.splice(noteIdx, 1);
}

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function setColor(note, color) {
    note.style = { backgroundColor: color }
}

function updateNote(noteId, title, content, field) {
    getNoteById(noteId).then(
        note => {
            note.info.title = title
            note.info[field] = content
        }
    )

}

const gNotes = [
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
        style: { backgroundColor: "#00d" }
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