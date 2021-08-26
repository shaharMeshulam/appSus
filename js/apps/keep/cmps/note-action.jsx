import { noteService } from "../services/note.service.js";
import { ColorPallete } from "./color-pallete.jsx";

export class NoteAction extends React.Component {
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
        this.setState(prevState => ({ isPinned: !prevState.isPinned }))
    }

    onDeleteBook = () => {
        noteService.removeNote()
        this.props.loadNotes()
    }

    onChangeColor = (color) => {
        const { note, loadNotes } = this.props
        noteService.setColor(note, color)
        loadNotes()
    }

    render() {
        const { showPallete } = this.state
        return (
            <section className="note-action" onClick={(ev) => { ev.stopPropagation() }}>
                <span onClick={this.onPinNote} className="material-icons-outlined">
                    push_pin
                </span>
                {showPallete && <ColorPallete onChangeColor={this.onChangeColor} hideColorPallete={this.hideColorPallete} />}
                <span onMouseEnter={this.showColorPallete} className="material-icons-outlined" >
                    color_lens
                </span>
                <span onClick={this.onDeleteBook} className="material-icons-outlined">
                    delete
                </span>
            </section>
        )
    }
}
