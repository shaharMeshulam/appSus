import { noteService } from "../services/note.service.js"

export class NoteAdd extends React.Component {

    state = {
        type: null,
        isPinned: false,
        info: {
            title: '',
            txt: '',
            url: '',
            labels: null,
            todos: ''
        },
        style: {
            backgroundColor: null
        }

    }

    componentDidMount() {
        this.setState({ type: 'note-txt' })
    }

    handleChange = ({ target }) => {
        const field = target.name
        this.setState(prevState => ({ info: { ...prevState.info, [field]: target.value } }))
    }

    onSetNoteType = (noteType) => {
        this.setState({ type: noteType, info: { txt: '', url: '', todos: '' } })
    }

    onAddNote = () => {
        noteService.addNote(JSON.parse(JSON.stringify(this.state)))
        this.props.loadNotes()
    }

    get getPlaceholder() {
        const { type } = this.state
        switch (type) {
            case 'note-vid':
                return 'Enter Video URL:'
            case 'note-img':
                return 'Enter Image URL:'
            case 'note-todos':
                return 'Write your comma sepereated Todolist :'
        }
        return 'Write your note..'
    }

    get getName() {
        const { type } = this.state
        switch (type) {
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
        const { title } = this.state.info

        return (
            <section className="add-note">
                <input onChange={this.handleChange} value={title} name="title" type="text" placeholder="title" />
                <input onChange={this.handleChange} value={this.state.info[this.getName]} name={this.getName} type="text" placeholder={this.getPlaceholder} />
                <button onClick={this.onAddNote}>Add Note</button>
                <div className="note-type">
                    <span onClick={(ev) => {
                        ev.preventDefault()
                        this.onSetNoteType('note-vid')
                    }} className="clickable material-icons-outlined">
                        movie
                    </span>
                    <span onClick={(ev) => { this.onSetNoteType('note-img') }} className="clickable material-icons-outlined">
                        image
                    </span>
                    <span onClick={(ev) => { this.onSetNoteType('note-todos') }} className="clickable material-icons-outlined">
                        format_list_bulleted
                    </span>
                    <span onClick={(ev) => { this.onSetNoteType('note-txt') }} className="clickable material-icons-outlined">
                        format_color_text
                    </span>
                </div>
            </section>
        )
    }

}