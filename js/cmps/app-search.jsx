import { eventBusService } from "../services/event-bus-service.js";

export class AppSearch extends React.Component {
    state = {
        query: '',
        criteria: {
            status: [],
            txt: '',
            isRead: null,
            isStared: null,
            lables: [] // has any of the labels
        }
    }

    onSearch = (ev) => {
        ev.preventDefault();
        eventBusService.emit('search', this.state.query);
    }

    render() {
        return (
            <form className="app-search" onSubmit={this.onSearch}>
                <label htmlFor="search" className="flex align-center">
                    <input type="search" name="search" id="search" />
                    <span className="search-icon material-icons-outlined">
                        search
                    </span>
                </label>
            </form>
        )
    }
}