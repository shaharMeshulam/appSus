import { NoteAction } from "./note-action.jsx";

export function NoteVid({ params }) {
    const { note, onClick, loadNotes, getShowActions, onMouseEnter, onMouseLeave ,editModeToggle } = params

    return (
        <div className="vid-note note clickable" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} editModeToggle={editModeToggle} >
            {note.title && <h1>{note.title}</h1>}
            {note.txt && <h1>{note.txt}</h1>}
            {getShowActions && <NoteAction note={note} />}
            {!getShowActions && <div className="note-action-placeholder"></div>}
        </div >
    )
}
