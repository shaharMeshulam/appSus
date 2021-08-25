export const noteService = {
    addNote,
    getNotes
}

import { utilService } from "../../../services/util.service.js";

function getNotes() {
    return Promise.resolve(gNotes)
}

function addNote(note) {
    note.id = utilService.makeId(8)
    gNotes.push(note)
    console.log('success', gNotes);
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
    // {
    //     id: "n102",
    //     type: "note-img",
    //     info: {
    //         url: "http://some-img/me",
    //         title: "Bobi and Me"
    //     },
    //     style: { backgroundColor: "#00d" }
    // },
    // {
    //     id: "n103",
    //     type: "note-todos",
    //     info: {
    //         label: "Get my stuff together",
    //         todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
    //     }
    // }
];