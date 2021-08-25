export function NoteTxt({ note }) {
    return (
        <div className="note-txt note">
            {note.info.title && <h1>{note.info.title}</h1>}
            {note.info.txt && <p>{note.info.txt}</p>}
        </div>
    )
}