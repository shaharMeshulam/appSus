import { NoteAction } from "./note-action.jsx";

export function NoteImg({ params }) {

    const { note, onClick, loadNotes, getShowActions, onMouseEnter, onMouseLeave, editModeToggle, getIsEditMode } = params

    return (
        <div style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }} className="note-img note clickable" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {note.info.url && <img src={note.info.url} />}
            {note.info.title && <h1 contentEditable={getIsEditMode}>{note.info.title}</h1>}
            {note.info.txt && <h1 contentEditable={getIsEditMode}>{note.info.txt}</h1>}
            {getShowActions && <NoteAction note={note} loadNotes={loadNotes} editModeToggle={editModeToggle} />}
            {!getShowActions && <div className="note-action-placeholder"></div>}
        </div >
    )
}
