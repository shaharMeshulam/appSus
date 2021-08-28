import { NoteAction } from "./note-action.jsx";

export function NoteVid({ params }) {
    const {
        note,
        loadNotes,
        getShowActions,
        onMouseEnter,
        onMouseLeave,
        setTarget,
        getIsEditMode,
        toggleEditMode,
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
            {note.info.url && !getIsEditMode && <iframe className="note-vid note" src={note.info.url}></iframe>}
            {note.info.url && getIsEditMode && <p
                onBlur={() => { updateNote('url') }}
                onClick={setEl}
                contentEditable={true}
                suppressContentEditableWarning={true}>
                {note.info.url} </p>}
            {note.info.title && <h1 suppressContentEditableWarning={true} contentEditable={true}>{note.info.title}</h1>}
            {!note.info.title && <span
                title="Add title" onClick={() => { onAddField('title') }}
                className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                add_circle
            </span>}
            {note.info.txt &&
                <p suppressContentEditableWarning={true}
                    contentEditable={true}>{note.info.txt}</p>}
            {
                !note.info.txt && <span
                    title="Add text" onClick={() => { onAddField('txt') }}
                    className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                    add_circle
                </span>
            }
            {<NoteAction note={note} loadNotes={loadNotes} getShowActions={getShowActions} toggleEditMode={toggleEditMode} />}
        </li >
    )
}
