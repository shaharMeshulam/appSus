import { NoteAdd } from '../cmps/add-note.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'

const { withRouter } = ReactRouterDOM

class _KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: {
            type:'',
            search:''
        }
    }

    componentDidMount() {

        this.loadNotes()
    }

    setFilterBy = (filterBy) => { this.setState({ filterBy }, () => { this.loadNotes() }) }

    loadNotes = () => {
        noteService.getNotesToShow(this.state.filterBy).then(notes => {
            this.setState({ notes })
        }
        )
    }

    render() {
        const { notes } = this.state
        return (
            <React.Fragment>
                <NoteAdd loadNotes={this.loadNotes} />
                <NoteFilter setFilterBy={this.setFilterBy} />
                {notes && <NoteList loadNotes={this.loadNotes} notes={notes} />}
            </React.Fragment>
        )
    }
}
export const KeepApp = withRouter(_KeepApp)