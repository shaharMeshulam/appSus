import { NoteAction } from "./note-action.jsx";

export class NoteImg extends React.Component {
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
            <div className="note-img note clickable" onClick={onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                {note.info.url && <img src={note.info.url} />}
                {note.title && <h1>{note.title}</h1>}
                {note.info.txt && <h1>{note.info.txt}</h1>}
                {this.state.showActions && <NoteAction />}
            </div >
        )
    }
}