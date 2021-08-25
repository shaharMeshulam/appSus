import { NoteAction } from "./note-action.jsx"

export class NoteTodos extends React.Component {
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
            <div className="todos-note note clickable" onClick={onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                {note.info.title && <h2 className="note-title">{note.info.title}</h2>}
                <ul>
                    {note.info.todos.map((todo, idx) => <li key={`${note.key}${idx}`}>{todo.txt}</li>)}
                </ul>
                {this.state.showActions && <NoteAction />}
            </div>
        )
    }
}