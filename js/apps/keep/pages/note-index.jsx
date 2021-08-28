import { eventBusService } from '../../../services/event-bus-service.js'
import { NoteAdd } from '../cmps/add-note.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'

const { withRouter } = ReactRouterDOM

class _KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: {
            type: '',
            search: ''
        }
    }

    busListener = null;

    componentDidMount() {
        this.busListener = eventBusService.on('note-search', (filterBy) => { this.setFilterBy(filterBy) })
        this.loadNotes()
    }

    componentWillUnmount() {
        this.busListener()
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
                {notes && <NoteList loadNotes={this.loadNotes} notes={notes} />}
            </React.Fragment>
        )
    }
}
export const KeepApp = withRouter(_KeepApp)