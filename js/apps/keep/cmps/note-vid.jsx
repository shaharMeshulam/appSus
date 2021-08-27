import { NoteAction } from "./note-action.jsx";

export function NoteVid({ params }) {
    const { note,
        loadNotes,
        getShowActions,
        onMouseEnter,
        onMouseLeave } = params

    const setEl = ({ target }) => {
        setTarget(target)
    }

    return (
        <li
            style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }}
            className="vid-note note clickable"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            {note.title && <h1 suppressContentEditableWarning={true} contentEditable={true}>{note.title}</h1>}
            {!note.info.title && getShowActions && <span title="Add title" onClick={() => { addField('title') }} className="material-icons-outlined">
                add_circle
            </span>}
            {note.txt && <h1 suppressContentEditableWarning={true} contentEditable={true}>{note.txt}</h1>}
            {!note.info.txt && getShowActions && <span title="Add text" onClick={() => { addField('txt') }} className="material-icons-outlined">
                add_circle
            </span>}
            {getShowActions && <NoteAction note={note} loadNotes={loadNotes} />}
            {!getShowActions && <div className="note-action-placeholder"></div>}
        </li >
    )
}
