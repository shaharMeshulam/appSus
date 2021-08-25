export function NoteVid({ note }) {
    return (
        <div className="note">
            {note.title && <h1>{note.title}</h1>}
            {note.txt && <h1>{note.txt}</h1>}
        </div>
    )
}