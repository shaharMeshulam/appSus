
import { MailList } from "../cmps/mail-list.jsx";
import { mailService } from "../services/mail.service.js";

export class Wall extends React.Component {
    state = {
        isAllChecked: false,
        sortBy: 'decening'
    }

    componentDidMount() {
        const sortBy = mailService.getSortBy();
        this.setState({ sortBy });
    }

    onSort = ({target}) => {
        const sortBy = target.value;
        this.setState({sortBy});
        this.props.onSort(sortBy);
    }

    render() {
        const { mails, type, onToggleCheckAll, onSort } = this.props;
        const { sortBy } = this.state;
        if (!mails) return <section className="wall">loading</section>
        return (
            <section className="wall">
                <section className="actions flex justify-between">
                    <input type="checkbox" onChange={onToggleCheckAll} />
                    <label htmlFor="sort-by">
                        Sort by:
                        <select name="sortBy" id="sort-by" value={sortBy} onChange={this.onSort}>
                            <option value="decening">Date descending</option>
                            <option value="ascending">Date ascending</option>
                            <option value="title">By title</option>
                        </select>
                    </label>
                </section>
                <MailList mails={mails} type={type} />
            </section>
        )
    }
}