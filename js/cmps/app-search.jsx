import { eventBusService } from "../services/event-bus-service.js";

export class AppSearch extends React.Component {
    state = {
        query: ''
    }

    onSearch = (ev) => {
        ev.preventDefault();
        eventBusService.emit('search', this.state.query);
    }

    render() {
        return (
            <form className="app-search" onSubmit={this.onSearch}>
                <input type="search" name="search" />
                <button>
                    <span className="search-icon material-icons-outlined">
                        search
                    </span>
                </button>
            </form>
        )
    }
}