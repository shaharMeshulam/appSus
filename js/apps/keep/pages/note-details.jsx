import { noteService } from "../services/note.service.js"


export class NoteDetails extends React.Component {
    state = { note: null }
    componentDidMount() {
        noteService.getNoteById(this.props.match.params.noteId)
            .then(note => { this.setState({ note }) })
    }
    render() {
        const { note } = this.state
        if (!note) return <React.Fragment></React.Fragment>
        return (
            <div className="screen">
                <section className="note-details">
                    {note.info.url && note.type === 'note-img' && <img src={note.info.url} />}
                    {note.info.url && note.type === 'note-vid' && <iframe src={note.info.url} />}
                    {note.info.txt && note.type === 'note-txt' && <p>{note.info.txt}</p>}
                    <button onClick={() => { this.props.history.push('/keep') }}>Back</button>
                </section>
            </div>
        )
    }
}