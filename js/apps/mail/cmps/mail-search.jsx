import { eventBusService } from "../../../services/event-bus-service.js";

export class MailSearch extends React.Component {
    state = {
        showFilter: false,
        currentStatus: 'all',
        currentTxt: '',
        currentIsRead: '',
        currentIsStared: "off",
        criteria: {
            status: '',
            txt: '',
            isRead: null,
            isStared: null,
            lables: [] // has any of the labels
        }
    }

    removeEventBus;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('search', this.onSearchChange);
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    onSearchChange = (criteria) => {
        if (!criteria) return;
        this.setState({ criteria }, this.onSearch);
    }

    onSearch = (ev = null) => {
        if (ev) {
            ev.preventDefault();
            this.setState(({ criteria, currentStatus, currentTxt, currentIsRead, currentIsStared }) =>
            ({
                criteria: {
                    ...criteria,
                    status: currentStatus,
                    txt: currentTxt,
                    isRead: (currentIsRead === '') ? null : currentIsRead,
                    isStared: currentIsStared
                }
            }), () => {
                if (!this.state.criteria.txt.trim()) return;
                eventBusService.emit('search-change', this.state.criteria)
            }
            );
        } else {
            if (this.state.criteria.txt && !this.state.criteria.txt.trim()) return;
            eventBusService.emit('search-change', this.state.criteria);
        }
    }

    onChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        if (name === 'status') {
            this.setState({ currentStatus: value }, () => {
                this.setState(({ criteria, currentStatus }) => ({ criteria: { ...criteria, status: currentStatus } }));
            })
        } else if (name === 'txt') {
            this.setState({ currentTxt: value }, () => {
                this.setState(({ criteria, currentTxt }) => ({ criteria: { ...criteria, status: currentTxt } }));
            })
        } else if (name === 'isRead') {
            this.setState({ currentIsRead: value }, () => {
                const isRead = (value === '') ? null : value;
                this.setState(({ criteria }) => ({ criteria: { ...criteria, isRead } }));
            })
        } else if (name === 'isStared') {
            this.setState({ currentIsStared: target.checked }, () => {
                this.setState(({ criteria, currentIsStared }) => ({ criteria: { ...criteria, isStared: currentIsStared } }))
            });
        }
        else { this.setState(({ criteria }) => ({ criteria: { ...criteria, [name]: value } })); }
    }

    onToggleFilter = () => {
        this.setState(({ showFilter }) => ({ showFilter: !showFilter }));
    }

    render() {
        const { showFilter, currentStatus, currentIsStared } = this.state;
        return (
            <form className="app-search" onSubmit={this.onSearch}>
                <label htmlFor="search" className="flex align-center">
                    <span className="btn material-icons-outlined" onClick={this.onToggleFilter}>
                        tune
                    </span>
                    <input type="search" name="txt" id="search" onChange={this.onChange} />
                    <span className="btn search-icon material-icons-outlined" onClick={this.onSearch}>
                        search
                    </span>
                    {showFilter && (
                        <ul className="app-search-criteria flex direction-column">
                            <li className="flex">
                                <label htmlFor="is-stared">Is stared</label>
                                <input type="checkbox" name="isStared" id="is-stared" onChange={this.onChange} />
                            </li>
                            <li className="flex">
                                <label htmlFor="is-read-both">
                                    <input type="radio" name="isRead" id="is-read-both" defaultChecked={true} value="" onChange={this.onChange} />
                                    All
                                </label>
                                <label htmlFor="is-read-true">
                                    <input type="radio" name="isRead" id="is-read-true" value="true" onChange={this.onChange} />
                                    Marked as read
                                </label>
                                <label htmlFor="is-read-false">
                                    <input type="radio" name="isRead" id="is-read-false" value="false" onChange={this.onChange} />
                                    Marked as not read
                                </label>
                            </li>
                            <li className="flex">
                                <label htmlFor="status">Search</label>
                                <select name="status" id="status" value={currentStatus} onChange={this.onChange}>
                                    <option value="all">All mail</option>
                                    <option value="inbox">Inbox</option>
                                    <option value="sent">Sent</option>
                                    <option value="trash">Trash</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </li>
                        </ul>
                    )}
                </label>
            </form>
        )
    }
}