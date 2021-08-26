import { NoteAction } from '../cmps/note-action.jsx'

export class NoteTxt extends React.Component {
    state = {
        showActions: null
    }

    componentWillMount() {
        this.setState({ showActions: false })
    }

    onMouseEnter = () => { this.setState({ showActions: true }) }
    onMouseLeave = () => { this.setState({ showActions: false }) }

    render() {
        const { note, onClick, loadNotes } = this.props
        return (
            <div style={{ backgroundColor: (note.style) ? note.style.backgroundColor : 'white' }} className="note-txt note clickable" onClick={onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
                {note.info.title && <h1>{note.info.title}</h1>}
                {note.info.txt && <p>{note.info.txt}</p>}
                {this.state.showActions && <NoteAction note={note} loadNotes={loadNotes} />}
                {!this.state.showActions && <div className="note-action-placeholder"></div>}
            </div >
        )
    }
}