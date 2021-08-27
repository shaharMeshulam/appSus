import { NoteAction } from "./note-action.jsx"

export function NoteTodos({ params }) {
    const { note, onClick, loadNotes, getShowActions, onMouseEnter, onMouseLeave, editModeToggle, getIsEditMode } = params

    return (
        <div
            style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }}
            className="todos-note note clickable"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            {note.info.title && <h2 className="note-title">{note.info.title}</h2>}
            <ul>
                {note.info.todos.map((todo, idx) => {
                    return (
                        <label key={`${note.key}${idx}`} htmlFor={idx}>
                            <li contentEditable={getIsEditMode}>{todo.txt}<input onClick={(ev) => { ev.stopPropagation() }} type="checkbox" style={{ display: 'none' }} id={idx}></input></li>
                        </label>
                    )
                })}
            </ul>
            {getShowActions && <NoteAction note={note} loadNotes={loadNotes} editModeToggle={editModeToggle} />}
            {!getShowActions && <div className="note-action-placeholder"></div>}
        </div>
    )
}
