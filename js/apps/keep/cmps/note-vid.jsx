import { NoteAction } from "./note-action.jsx";

export class NoteVid extends React.Component {
    state = {
        showActions: null
    }
    componentWillMount() {
        this.setState({ showActions: false })
    }

    onMouseEnter = () => { this.setState({ showActions: true }) }
    onMouseLeave = () => { this.setState({ showActions: false }) }

    render() {
        const { note, onClick } = this.props
        return (
            <div className="vid-note note clickable" onClick={onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
                {note.title && <h1>{note.title}</h1>}
                {note.txt && <h1>{note.txt}</h1>}
                {this.state.showActions && <NoteAction note={note}  />}
                {!this.state.showActions && <div className="note-action-placeholder"></div>}
            </div >
        )
    }
}