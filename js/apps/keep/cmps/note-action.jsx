import { noteService } from "../services/note.service.js";
import { ColorPallete } from "./color-pallete.jsx";

const { withRouter } = ReactRouterDOM

class _NoteAction extends React.Component {
    state = {
        showPallete: null,
        note: null
    }

    componentDidMount() {
        const { note } = this.props
        this.setState({ showPallete: false, note })
    }

    showColorPallete = () => {
        this.setState({ showPallete: true })
    }

    hideColorPallete = () => {
        this.setState({ showPallete: false })
    }

    onPinNote = () => {
        noteService.togglePin(this.state.note.id)
        this.props.loadNotes()
    }

    onDeleteBook = () => {
        noteService.removeNote(this.state.note.id)
        this.props.loadNotes()
    }

    onChangeColor = (color) => {
        const { note, loadNotes } = this.props
        noteService.setColor(note, color)
        loadNotes()
    }

    onDuplicateNote = () => {
        const { note, loadNotes } = this.props
        noteService.duplicateNote(note)
        loadNotes()
    }

    onEmailClick = () => {
        let { title, txt, url } = this.state.note.info
        const { type } = this.state.note
        if (url) {
            if (type === 'note-img') url = `<img src="${url}"/>`
            else url = `<iframe src="${note.url}"></iframe>`
        }
        this.props.history.push(`/mail/new?subject=${(title) ? title : ''}&body=${(url) ? url : ''}${(txt) ? txt : ''}&isHtml=${type === 'note-img' || type === 'note-vid'}`)
    }

    render() {
        const { showPallete, note } = this.state

        if (!note) return <React.Fragment></React.Fragment>
        return (
            <section className={`remove-txt-marker note-action ${(this.props.getShowActions) ? 'show' : 'hide'} `} onClick={(ev) => { ev.stopPropagation() }}>
                <span onClick={this.onPinNote} className={`clickable material-icons${(note.isPinned) ? '' : '-outlined'}`}>
                    push_pin
                </span>
                {showPallete && <ColorPallete onChangeColor={this.onChangeColor} hideColorPallete={this.hideColorPallete} />}
                <span onMouseEnter={this.showColorPallete} className="clickable material-icons-outlined" >
                    color_lens
                </span>
                <span onClick={this.onDeleteBook} className="clickable material-icons-outlined">
                    delete
                </span>
                <span title="Duplicate note" onClick={this.onDuplicateNote} className="clickable material-icons-outlined">
                    content_copy
                </span>
                <span title="Send as email" onClick={this.onEmailClick} className="material-icons-outlined">
                    email
                </span>
                {note.type === 'note-todos' && <span title="Add task" className="material-icons-outlined clickable">
                    add_task
                </span>}
                {(note.type === 'note-vid' || note.type === 'note-img') && <span className="material-icons clickable">
                    edit
                </span>}
            </section>
        )


    }
}

export const NoteAction = withRouter(_NoteAction)