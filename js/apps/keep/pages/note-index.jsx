import { NoteAdd } from '../cmps/add-note.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'
const { withRouter } = ReactRouterDOM

class _KeepApp extends React.Component {
    state = {
        notes: null
    }
    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.getNotes().then(notes => {
            this.setState({ notes })
        }
        )
    }

    render() {
        const { notes } = this.state
        return (
            <React.Fragment>
                <NoteAdd loadNotes={this.loadNotes} />
                {notes && <NoteList loadNotes={this.loadNotes} notes={notes} />}
            </React.Fragment>
        )
    }
}
export const KeepApp = withRouter(_KeepApp)