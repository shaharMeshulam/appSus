export const noteService = {
    addNote,
    getNotes,
    getNoteById
}

import { utilService } from "../../../services/util.service.js";

function getNotes() {
    return Promise.resolve(gNotes)
}

function addNote(note) {
    if (note.type === 'note-todos') {
        note.info.todos = note.info.todos.split(',')
        note.info.todos = note.info.todos.map(todo => ({ txt: todo, doneAt: null }))
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

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
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
            todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
        }
    }
];