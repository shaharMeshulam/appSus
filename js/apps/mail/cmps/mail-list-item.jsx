const { Link } = ReactRouterDOM;
import { MailDate } from "./mail-date.jsx";
import { MailPreview } from "./mail-preview.jsx";

export class MailListItem extends React.Component {
    state = {
        isChecked: this.props.isChecked || false
    }

    onChange = () => {
        this.setState(({ isChecked }) => ({ isChecked: !isChecked }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isChecked !== this.props.isChecked) this.setState({ isChecked: this.props.isChecked });
    }

    render() {
        const { mail } = this.props;
        const { isChecked } = this.state
        return (
            <li className="mail-list-item flex">
                <input type="checkbox" name="check" id="check" checked={isChecked} onChange={this.onChange} />
                <Link to={`/mail/${mail.id}`}>
                    <span className="sender-name">{mail.from}</span>
                    <MailPreview subject={mail.subject} txt={mail.txt} isRead={mail.isRead} timeStamp={mail.timeStamp} />
                </Link>
                <MailDate timeStamp={mail.timeStamp} />
            </li>
        )
    }
}