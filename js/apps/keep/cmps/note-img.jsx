import { NoteAction } from "./note-action.jsx";

export function NoteImg({ params }) {

    const {
        note,
        loadNotes,
        getShowActions,
        onMouseEnter,
        onMouseLeave,
        setTarget,
        updateNote } = params

    const setEl = ({ target }) => {
        setTarget(target)
    }

    return (
        <li
            style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }}
            className="note-img note remove-txt-marker"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            {note.info.url && <img src={note.info.url} />}
            {note.info.title && <h1
                onBlur={() => { updateNote('title') }}
                onClick={setEl}
                contentEditable={true}
                suppressContentEditableWarning={true}>
                {note.info.title}</h1>}
            {!note.info.title && <span title="Add title"
                onClick={() => { addField('title') }}
                className={`material-icons-outlined ${(getShowActions) ? 'show' : 'hidden'}`}>
                add_circle
            </span>}
            {note.info.txt && <p
                onBlur={() => { updateNote() }}
                onClick={setEl}
                contentEditable={true}
                suppressContentEditableWarning={true}>
                {note.info.txt}</p>}
            {!note.info.txt && <span title="Add text"
                onClick={() => { addField('txt') }}
                className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                add_circle
            </span>}
            {<NoteAction note={note} loadNotes={loadNotes} getShowActions={getShowActions} />}
        </li >
    )
}
