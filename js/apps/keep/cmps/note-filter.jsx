export class NoteFilter extends React.Component {
    state = {
        type: '',
        search: ''
    }

    componentDidMount() {
        this.setState({ type: '', search: '' })
    }

    handleChange = ({ target }) => {
        const field = target.name
        this.setState({ [field]: target.value }, () => {
            const { type, search } = this.state
            this.props.setFilterBy({ type, search })
        })
    }

    render() {
        const { type, search } = this.state

        return (
            <section className="filter">
                <input value={search} onChange={this.handleChange} name="search" type="text" placeholder="Search" />
                <select value={type} onChange={this.handleChange} name="type">
                    <option value="">Show All</option>
                    <option value="note-vid">Video</option>
                    <option value="note-txt">Text</option>
                    <option value="note-todos">Todos</option>
                    <option value="note-img">Image</option>
                </select>
            </section>
        )
    }
}