import { noteService } from "../services/note.service.js"
import { NoteAction } from "./note-action.jsx"

export function NoteTodos({ params }) {
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

    const onToggleDoneTask = (taskIdx) => {
        noteService.toggleDoneTask(note.id, taskIdx)
        loadNotes()
    }

    const onRemoveTask = (taskIdx) => {
        noteService.removeTask(note.id, taskIdx)
        loadNotes()
    }

    if (!note.info.todos.length) return <React.Fragment></React.Fragment>

    return (
        <li
            style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }}
            className="todos-note note remove-txt-marker"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            {note.info.title &&
                <h1
                    onBlur={() => { updateNote('title') }}
                    onClick={setEl}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="note-title">{note.info.title}
                </h1>}
            {!note.info.title && <span title="Add title" onClick={() => { onAddField('title') }}
                className={`material-icons-outlined clickable ${(getShowActions) ? 'show' : 'hide'}`}>
                add_circle
            </span>}
            <ul>
                {note.info.todos.map((todo, idx) => {
                    return (
                        <li className="todo-container flex justify-between" key={`${note.key}${idx}`} >
                            <p className={`${(todo.isDone) ? 'done' : ''}`}
                                suppressContentEditableWarning={true}
                                onClick={setEl}
                                onBlur={() => { updateNote('todos', idx) }}
                                contentEditable={true}>
                                {todo.txt}
                            </p>
                            <div className="actions">
                                <span title="Done/Undone "
                                    onClick={() => { onToggleDoneTask(idx) }}
                                    className={`material-icons-outlined clickable toggle-done-todo-btn ${(getShowActions) ? 'show' : 'hide'}`}>
                                    rule
                                </span>
                                <span title="Remove task"
                                    onClick={() => { onRemoveTask(idx) }}
                                    className={`material-icons-outlined clickable remove-todo-btn ${(getShowActions) ? 'show' : 'hide'}`}>
                                    remove_circle
                                </span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {<NoteAction note={note} loadNotes={loadNotes} getShowActions={getShowActions} />}
        </li>
    )
}
