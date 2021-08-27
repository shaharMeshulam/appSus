import { NoteAction } from '../cmps/note-action.jsx'

export function NoteTxt({ params }) {

    const { note, onClick, loadNotes, getShowActions, onMouseEnter, onMouseLeave, editModeToggle, getIsEditMode } = params
    const log = ({target}) => {
        console.log(target)
    }
    return (
        <div style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }} className="note-txt note clickable" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            {note.info.title && <h1 onFocus={log} contentEditable={getIsEditMode}>{note.info.title}</h1>}
            {note.info.txt && <p onFocus={log} contentEditable={getIsEditMode}>{note.info.txt}</p>}
            {getShowActions && <NoteAction note={note} loadNotes={loadNotes} editModeToggle={editModeToggle} />}
            {!getShowActions && <div className="note-action-placeholder"></div>}
        </div >
    )
}
