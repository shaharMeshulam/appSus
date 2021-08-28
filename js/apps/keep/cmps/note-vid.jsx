import { NoteAction } from "./note-action.jsx";

export function NoteVid({ params }) {
    const {
        note,
        loadNotes,
        getShowActions,
        onMouseEnter,
        onMouseLeave,
        setTarget,
        onAddField } = params

    const setEl = ({ target }) => {
        setTarget(target)
    }

    return (
        <li
            style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }}
            className="vid-note note remove-txt-marker"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <iframe className="note-vid note" src={note.info.url}></iframe>
            {note.info.title && <h1 suppressContentEditableWarning={true} contentEditable={true}>{note.info.title}</h1>}
            {!note.info.title && <span
                title="Add title" onClick={() => { onAddField('title') }}
                className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                add_circle
            </span>}
            {note.info.txt &&
                <h1 suppressContentEditableWarning={true}
                    contentEditable={true}>{note.info.txt}</h1>}
            {
                !note.info.txt && <span
                    title="Add text" onClick={() => { onAddField('txt') }}
                    className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                    add_circle
                </span>
            }
            {<NoteAction note={note} loadNotes={loadNotes} getShowActions={getShowActions} />}
        </li >
    )
}
