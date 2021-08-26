import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteVid } from './note-vid.jsx'
import { NoteTodos } from './note-todos.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onClick }) {
    return (
        <section className="notes-list">
            {notes.map(note => {
                switch (note.type) {
                    case 'note-txt':
                        return <NoteTxt key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                    case 'note-img':
                        return <NoteImg key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                    case 'note-vid':
                        return <NoteVid key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                    case 'note-todos':
                        return <NoteTodos key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                }
            })}
        </section>
    )
}