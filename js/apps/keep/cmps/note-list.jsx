import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteVid } from './note-vid.jsx'
import { NoteTodo } from './note-todo.jsx'

export function NoteList({ notes }) {
    return notes.map(note => {
        switch (note.type) {
            case 'note-txt':
                return <NoteTxt key={note.id} note={note} />
            case 'note-img':
                return <NoteImg key={note.id} note={note} />
            case 'note-vid':
                return <NoteVid key={note.id} note={note} />
            case 'note-todo':
                return <NoteTodo key={note.id} note={note} />
        }
    })
}