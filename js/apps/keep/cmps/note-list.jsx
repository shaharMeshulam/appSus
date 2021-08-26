import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteVid } from './note-vid.jsx'
import { NoteTodos } from './note-todos.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onClick, loadNotes }) {
    return (
        <section className="notes-list">
            {notes.map(note => {
                switch (note.type) {
                    case 'note-txt':
                        return <NoteTxt loadNotes={loadNotes} key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                    case 'note-img':
                        return <NoteImg loadNotes={loadNotes} key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                    case 'note-vid':
                        return <NoteVid loadNotes={loadNotes} key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                    case 'note-todos':
                        return <NoteTodos loadNotes={loadNotes} key={note.id} note={note} onClick={() => { onClick(`/keep/${note.id}`) }} />
                }
            })}
        </section>
    )
}