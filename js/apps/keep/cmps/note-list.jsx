
import { DinamicNote } from './dinamic-note.jsx'


export function NoteList({ notes, loadNotes }) {
    return (
        <section className="notes-list main-layout">
            <h1>Pinned Notes</h1>
            <ul className="pinned-notes">
                {notes.map(note => {
                    if (note.isPinned) {
                        return <DinamicNote key={note.id} note={note} loadNotes={loadNotes} />
                    }
                })}
            </ul>
            <h1>Unpinned Notes</h1>
            <ul className="unpinned-notes">
                {notes.map(note => {
                    if (!note.isPinned) {
                        return <DinamicNote key={note.id} note={note} loadNotes={loadNotes} />
                    }
                })}
            </ul>


        </section>
    )
}