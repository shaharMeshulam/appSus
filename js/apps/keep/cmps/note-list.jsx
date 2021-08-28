
import { DinamicNote } from './dinamic-note.jsx'


export function NoteList({ notes, loadNotes }) {
    return (
        <section className="notes-list">
            <ul className="pinned-notes">
                {notes.map(note => {
                    if (note.isPinned) {
                        return <DinamicNote key={note.id} note={note} loadNotes={loadNotes} />
                    }
                })}
            </ul>
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