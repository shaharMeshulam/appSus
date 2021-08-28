import { eventBusService } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail.service.js";

export class MailSearch extends React.Component {
    state = {
        display: this.props.display,
        showFilter: false,
        labels: null,
        currentStatus: 'all',
        currentTxt: '',
        currentIsRead: '',
        currentIsStared: null,
        currentLabels: [],
        criteria: {
            status: '',
            txt: '',
            isRead: null,
            isStared: null,
            lables: []
        }
    }

    removeEventBus;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('search', this.onSearchChange);
        mailService.getLabels()
            .then(labels => this.setState({ labels }));
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.display !== this.props.display) this.setState({display: this.props.display});
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
            this.setState(({ criteria, currentStatus, currentTxt, currentIsRead, currentIsStared, currentLabels }) =>
            ({
                criteria: {
                    ...criteria,
                    status: currentStatus,
                    txt: currentTxt,
                    isRead: (currentIsRead === '') ? null : currentIsRead,
                    isStared: currentIsStared,
                    labels: currentLabels
                }
            }), () => eventBusService.emit('search-change', this.state.criteria));
        } else eventBusService.emit('search-change', this.state.criteria);
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
                const isStared = target.checked ? target.checked : null;
                this.setState(({ criteria }) => ({ criteria: { ...criteria, isStared: isStared } }));
            });
        } else if (name === 'lables') {
            if (this.state.currentLabels.includes(value)) {
                const idx = this.state.currentLabels.indexOf(value);
                const newLabels = this.state.currentLabels.splice(idx, 0);
                this.setState({ currentLabels: newLabels }, () => {
                    this.setState(({ criteria }) => ({ criteria: { ...criteria, labels: newLabels } }));
                });
            } else {
                this.setState(({ currentLabels }) => ({ currentLabels: [...currentLabels, value] }), () => {
                    this.setState(({ criteria }) => ({ criteria: { ...criteria, labels: this.state.currentLabels } }));
                });
            }
        }
        else { this.setState(({ criteria }) => ({ criteria: { ...criteria, [name]: value } })); }
    }

    onToggleFilter = () => {
        this.setState(({ showFilter }) => ({ showFilter: !showFilter }));
    }

    render() {
        const { showFilter, currentStatus, labels, display } = this.state;
        return (
            display && <form className="app-search" onSubmit={this.onSearch}>
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
                            <li>
                                <ul className="app-search-lables flex">
                                    {labels.map(label => (
                                        <li key={label.color} style={{ backgroundColor: label.color }}>
                                            <label htmlFor={label.value}>
                                                <input type="checkbox" name="lables" id={label.value} value={label.color} onChange={this.onChange} />
                                                {label.value}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="flex">
                                <input type="checkbox" name="isStared" id="is-stared" onChange={this.onChange} />
                                <label htmlFor="is-stared">Is stared</label>
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
                            <li>
                                <button className="btn">Search</button>
                            </li>
                        </ul>
                    )}
                </label>
            </form>
        )
    }
}