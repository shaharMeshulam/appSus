import { NoteAction } from '../cmps/note-action.jsx'

export function NoteTxt({ params }) {

    const {
        note,
        loadNotes,
        getShowActions,
        onMouseEnter,
        onMouseLeave,
        setTarget,
        updateNote,
        onAddField } = params


    const setEl = ({ target }) => {
        setTarget(target)
    }
    return (
        <li
            style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }}
            className="note-txt note remove-txt-marker"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} >
            {note.info.title &&
                <h1 onBlur={() => { updateNote('title') }}
                    onClick={setEl}
                    suppressContentEditableWarning={true}
                    contentEditable={true}>{note.info.title}</h1>}
            {!note.info.title && <span title="Add title" onClick={() => { onAddField('title') }}
                className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                add_circle
            </span>}
            {note.info.txt &&
                <p onBlur={() => { updateNote() }}
                    onClick={setEl}
                    contentEditable={true}
                    suppressContentEditableWarning={true}>{note.info.txt}</p>}
            {!note.info.txt && <span title="Add text" onClick={() => { onAddField('txt') }}
                className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                add_circle
            </span>}
            {<NoteAction note={note} loadNotes={loadNotes} getShowActions={getShowActions} />}
        </li >
    )
}
