import { noteService } from "../services/note.service.js"


export class NoteDetails extends React.Component {
    state = {
        note: null,
        title: null,
        content: null,
    }

    getField = note => {
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

    componentDidMount() {
        noteService.getNoteById(this.props.match.params.noteId)
            .then(note => {
                let content;
                if (note.type === 'todos') content = note.info[this.getField(note)].slice()
                else content = note.info[this.getField(note)]
                this.setState({ note, title: (note.info.title) ? note.info.title : '', content })
            })
    }

    handleChange = ({ target }) => {
        const field = target.name
        this.setState(prevState => ({ ...prevState, [field]: target.value }))
    }

    handleTodoChange = ({ target }) => {
        const content = this.state.content.slice()
        content[+target.dataset.idx].txt = target.value
        this.setState({ content })
    }

    onSave = () => {
        const { note, content, title } = this.state
        const field = this.getField(note)
        noteService.updateNote(note.id, title, content, field)
        this.props.history.push('/keep')
    }

    render() {
        const { note, content, title } = this.state
        if (!note) return <React.Fragment></React.Fragment>
        return (
            <div className="screen">
                <section className="note-details">
                    {<textarea onChange={this.handleChange} name="title" value={title}></textarea>}
                    {!note.info.todos && content && <textarea name="content" onChange={this.handleChange} value={content}></textarea>}
                    {note.info.todos && content.map((todo, idx) => {
                        return (<React.Fragment>
                            <textarea data-idx={idx} onChange={this.handleTodoChange} value={todo.txt} key={`${note.key}${idx}`}></textarea>
                            <span onClick={()=>{this.removeNote(idx)}} className="material-icons">
                                remove_circle
                            </span>
                            <span className="material-icons">
                                add_circle
                            </span>
                        </React.Fragment>
                        )
                    })}

                    <button onClick={this.onSave}>Save</button>
                </section>
            </div>
        )
    }
}
