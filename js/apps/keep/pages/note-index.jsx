import { NoteAdd } from '../cmps/add-note.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'
export class KeepApp extends React.Component {
    state = {
        notes: null
    }
    componentDidMount() {
        noteService.getNotes().then(notes => {
            this.setState({ notes })
        }
        )
    }

    render() {
        const { notes } = this.state
        return (
            <section className="keep-app">
                <NoteAdd />
                {notes && <NoteList notes={notes} />}
            </section>
        )
    }
}