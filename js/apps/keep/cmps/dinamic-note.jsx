import { NoteTxt } from './note-txt.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteVid } from './note-vid.jsx'
import { NoteTodos } from './note-todos.jsx'
import { noteService } from '../services/note.service.js'

export class DinamicNote extends React.Component {
    state = {
        showActions: null,
        isEditMode: null,
        content: '',
        title: '',
        target: null
    }

    componentWillMount() {
        const { note } = this.props
        this.setState({
            showActions: false,
            isEditMode: false,
            content: note.info[this.getField],
            title: note.info.title
        })
    }

    setTarget = (target) => { this.setState({ target }) }
    onMouseEnter = () => { this.setState({ showActions: true }) }
    onMouseLeave = () => { this.setState({ showActions: false, isEditMode: false }) }
    get getShowActions() { return this.state.showActions }
    get getTarget() { return this.state.target }
    updateNote = (field) => {
        debugger

        noteService.updateNote(this.props.note.id, this.getTarget.innerText, field || this.getField)
    }

    get getField() {
        const { note } = this.props
        switch (note.type) {
            case 'note-txt':
                return 'txt'
            case 'note-vid':
            case 'note-img':
                return 'url'
            case 'note-todos':
                return 'todos'
        }
    }

    render() {
        const { note, loadNotes } = this.props

        const params = {}
        params.note = note
        params.loadNotes = loadNotes
        params.getShowActions = this.getShowActions
        params.onMouseEnter = this.onMouseEnter
        params.onMouseLeave = this.onMouseLeave
        params.setTarget = this.setTarget
        params.updateNote = this.updateNote


        if (!note) return <React.Fragment></React.Fragment>
        switch (note.type) {
            case 'note-txt':
                return <NoteTxt params={params} />
            case 'note-img':
                return <NoteImg params={params} />
            case 'note-vid':
                return <NoteVid params={params} />
            case 'note-todos':
                return <NoteTodos params={params} />
        }

    }
}