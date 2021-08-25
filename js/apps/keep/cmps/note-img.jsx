export function NoteImg({ note }) {
    return (
        <div className="note-img note">
            {note.info.url && <img src={note.info.url} />}
            {note.title && <h1>{note.title}</h1>}
            {note.info.txt && <h1>{note.info.txt}</h1>}
        </div>
    )
}