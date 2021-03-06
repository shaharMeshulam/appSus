import { storageService } from "../../../services/storage.service.js";

export const noteService = {
    addNote,
    getNotesToShow,
    removeNote,
    getNoteById,
    setColor,
    updateNote,
    togglePin,
    duplicateNote,
    toggleDoneTask,
    removeTask,
    addField,
    addTask
}

import { utilService } from "../../../services/util.service.js";


function getNotesToShow(filterBy) {
    let { search } = filterBy
    search = search.toLowerCase()
    const notes = gNotes.filter(
        note => {
            let includesSearch;
            if (note.type === 'note-todos') {
                includesSearch = note.info.todos.some(todo => todo.txt.toLowerCase().includes(search))
            } else {
                includesSearch = note.info.txt &&
                    note.info.txt.toLowerCase().includes(search) ||
                    note.info.title &&
                    note.info.title.toLowerCase().includes(search) || (!note.info.title && !note.info.txt && !search)
            }
            return note.type.includes(filterBy.type) && includesSearch
        }
    )
    return Promise.resolve(notes)
}

function toggleDoneTask(noteId, taskIdx) {
    getNoteById(noteId).then(
        note => {
            note.info.todos[taskIdx].isDone = !note.info.todos[taskIdx].isDone
            _saveNotes()
        }
    )
}

function addTask(noteId) {
    getNoteById(noteId).then(
        note => {
            note.info.todos.push({ txt: '', isDone: false })
            _saveNotes
        }
    )
}

function removeTask(noteId, taskIdx) {
    getNoteById(noteId).then(
        note => {
            note.info.todos.splice(taskIdx, 1)
            if (!note.info.todos.length) removeNote(noteId)
            _saveNotes()
        }
    )
}

function addNote(note) {
    if (note.type === 'note-todos') {
        note.info.todos = note.info.todos.split(',')
        note.info.todos = note.info.todos.map(todo => ({ txt: todo, isDone: false }))
    }
    if (note.type === 'note-vid') note.info.url = getEmbedURL(note)
    for (const key in note.info) {
        if (note.info[key]) {
            note.id = utilService.makeId(8)
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

function updateNote(noteId, content, field, todoIdx) {
    debugger
    getNoteById(noteId).then(
        note => {
            if (todoIdx || todoIdx === 0) {
                if (!content) {
                    note.info.todos.splice(todoIdx)
                    _saveNotes()
                    return
                }
                note.info.todos[todoIdx].txt = content
                _saveNotes()
                return
            }
            note.info[field] = content || ''
            if (!note.info.txt && !note.info.title && !note.info.url) {
                removeNote(noteId)
            }
            _saveNotes()
        }
    )
}

function addField(noteId, field, content) {
    getNoteById(noteId)
        .then(note => {
            note.info[field] = content
            _saveNotes
        })
}

function getEmbedURL(note) {
    const youtubeEmbed = 'https://www.youtube.com/embed/'
    const { url } = note.info
    const vidIdIdx = url.indexOf('?v')
    if (vidIdIdx !== -1) {
        return youtubeEmbed + url.slice(vidIdIdx + 3)
    }
    return url
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
        "id": "n101",
        "type": "note-txt",
        "isPinned": true,
        "info": {
            "txt": "Fullstack Me Baby!",
            "title": "FullOn"
        },
        "style": {
            "backgroundColor": "#FF7F50"
        }
    },
    {
        "id": "n102",
        "type": "note-txt",
        "isPinned": true,
        "info": {
            "txt": "l",
            "title": "d"
        },
        "style": {
            "backgroundColor": "#40E0D0"
        }
    },
    {
        "id": "n112302",
        "type": "note-img",
        "info": {
            "url": "https://i.stack.imgur.com/Op6dK.png",
            "title": "Bobi and Me",
            "txt": "asdasdasd"
        },
        "style": {
            "backgroundColor": "#9FE2BF"
        },
        "isPinned": false
    },
    {
        "id": "n103",
        "type": "note-todos",
        "info": {
            "label": "Get my stuff together",
            "todos": [
                {
                    "txt": "Driving liscencedasdasdasdasdasdasdasdasd",
                    "isDone": false
                },
                {
                    "txt": "Coding power",
                    "isDone": true
                },
                {
                    "txt": "ddgf",
                    "isDone": true
                }
            ],
            "title": "dasdasfa"
        },
        "isPinned": true,
        "style": {
            "backgroundColor": "#DFFF00"
        }
    },
    {
        "type": "note-img",
        "isPinned": false,
        "info": {
            "txt": "",
            "url": "https://picsum.photos/200/300",
            "todos": "",
            "title": "LoremPicsum"
        },
        "style": {
            "backgroundColor": "#FF7F50"
        },
        "id": "udmd0Qc6"
    },
    {
        "type": "note-vid",
        "isPinned": false,
        "info": {
            "txt": "",
            "url": "https://www.youtube.com/embed/xiJlAE2sfQc",
            "todos": "",
            "title": " "
        },
        "style": {
            "backgroundColor": "#FFBF00"
        },
        "id": "ecAxmglp"
    },
    {
        "type": "note-vid",
        "isPinned": true,
        "info": {
            "txt": " ",
            "url": "https://www.youtube.com/embed/xiJlAE2sfQc",
            "todos": "",
            "title": " "
        },
        "style": {
            "backgroundColor": "#9FE2BF"
        },
        "id": "W1qCsqXb"
    },
    {
        "id": "Y0GDP4t2",
        "type": "note-txt",
        "isPinned": true,
        "info": {
            "txt": "Fullstack Me Baby!",
            "title": "FullOn"
        },
        "style": {
            "backgroundColor": "#FF7F50"
        }
    },
    {
        "id": "YtQNssKI",
        "type": "note-img",
        "info": {
            "url": "https://i.stack.imgur.com/Op6dK.png",
            "title": "Bobi and Me",
            "txt": "asdasdasd"
        },
        "style": {
            "backgroundColor": "#9FE2BF"
        },
        "isPinned": true
    },
    {
        "id": "5SezG4W4",
        "type": "note-img",
        "info": {
            "url": "https://i.stack.imgur.com/Op6dK.png",
            "title": "Bobi and Me",
            "txt": "asdasdasd"
        },
        "style": {
            "backgroundColor": "#9FE2BF"
        },
        "isPinned": false
    },
    {
        "type": "note-todos",
        "isPinned": false,
        "info": {
            "txt": "",
            "url": "",
            "todos": [
                {
                    "txt": "list1",
                    "isDone": false
                },
                {
                    "txt": "list1",
                    "isDone": false
                },
                {
                    "txt": "list1",
                    "isDone": true
                },
                {
                    "txt": "list1",
                    "isDone": false
                },
                {
                    "txt": "list1",
                    "isDone": true
                },
                {
                    "txt": "list1",
                    "isDone": false
                },
                {
                    "txt": "list1",
                    "isDone": true
                }
            ],
            "title": "more list"
        },
        "style": {
            "backgroundColor": "#6495ED"
        },
        "id": "VNkX3YjU"
    }
]