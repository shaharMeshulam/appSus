export function NoteTodos({ note }) {
    console.log(note);
    return (
        <div className="note">
            <ul>
                {note.info.todos.map((todo, idx) => <li key={note.key + idx}>{todo.txt}</li>)}
            </ul>
        </div>
    )
}