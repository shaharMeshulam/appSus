import { eventBusService } from '../../../services/event-bus-service.js'

export class NoteFilter extends React.Component {
    state = {
        type: '',
        txt: '',
        showFilter: null
    }

    componentDidMount() {
        this.setState({ type: '', txt: '', showFilter: false })
    }

    onToggleFilter = () => {
        this.setState(({ showFilter }) => ({ showFilter: !showFilter }));
    }

    onSearch = (ev) => {
        ev.preventDefault()
        const { txt, type } = this.state
        this.setState({ showFilter: false })
        eventBusService.emit('note-search', { search: txt, type })
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    setType = (type) => { this.setState({ type }) }

    render() {
        const { type, txt, showFilter } = this.state

        return (
            <form className="app-search" onSubmit={this.onSearch}>
                <label htmlFor="search" className="flex align-center">
                    <span className="btn material-icons-outlined" onClick={this.onToggleFilter}>
                        tune
                    </span>
                    <input type="search" name="txt" id="search" onChange={this.handleChange} value={txt} />
                    <span className="btn search-icon material-icons-outlined" onClick={this.onSearch}>
                        search
                    </span>
                    {showFilter && (
                        <div onMouseLeave={this.onToggleFilter} className="app-search-criteria flex direction-column">
                            <button onClick={() => { this.setType('') }} className="clickable">All</button>
                            <button onClick={() => { this.setType('note-vid') }} className="clickable">Video</button>
                            <button onClick={() => { this.setType('note-txt') }} className="clickable">Text</button>
                            <button onClick={() => { this.setType('note-todos') }} className="clickable">Todos</button>
                            <button onClick={() => { this.setType('note-img') }} className="clickable">Image</button>
                        </div>
                    )}
                </label>
            </form>
        )
    }
}

