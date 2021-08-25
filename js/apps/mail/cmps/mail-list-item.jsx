
const { Link, withRouter } = ReactRouterDOM
import { MailDate } from "./mail-date.jsx";
import { MailPreview } from "./mail-preview.jsx";


class _MailListItem extends React.Component {
    state = {
        isChecked: this.props.isChecked || false
    }

    onChange = () => {
        this.setState(({ isChecked }) => ({ isChecked: !isChecked }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isChecked !== this.props.isChecked) this.setState({ isChecked: this.props.isChecked });
    }

    onOpenMail = (mailId) => {
        this.props.history.push(`/mail/${mailId}`);
    }

    render() {
        const { mail } = this.props;
        const { isChecked } = this.state
        return (
            <li className="mail-list-item flex">
                <input type="checkbox" name="check" id="check" checked={isChecked} onChange={this.onChange} />
                <Link to={`/mail/${mail.id}`} className={`flex mail-list-item-preview ${!mail.isRead && 'bold'}`}>
                {/* <div className={`flex mail-list-item-preview ${!mail.isRead && 'bold'}`} onClick={() => this.onOpenMail(mail.id)}> */}
                    <span className="sender-name">{mail.from}</span>
                    <MailPreview subject={mail.subject} txt={mail.txt} isRead={mail.isRead} timeStamp={mail.timeStamp} />
                {/* </div> */}
                </Link>
                <MailDate timeStamp={mail.timeStamp} />
            </li>
        )
    }
}
export const MailListItem = withRouter(_MailListItem);