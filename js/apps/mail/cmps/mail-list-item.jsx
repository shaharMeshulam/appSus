import { MailDate } from "./mail-date.jsx";
import { MailPreview } from "./mail-preview.jsx";

export class MailListItem extends React.Component {
    state = {
        isChecked: this.props.isChecked || false
    }

    onChange = () => {
        this.setState(({isChecked}) => ({isChecked: !isChecked}));
    }
    
    render() {
        const { mail } = this.props;
        const { isChecked } = this.state
        return (
            <li className="mail-list-item flex">
                <input type="checkbox" name="check" id="check" checked={isChecked} onChange={this.onChange}/>
                <span className="sender-name">{mail.from}</span>
                <MailPreview subject={mail.subject} txt={mail.txt} isRead={mail.isRead} timeStamp={mail.timeStamp}/>
                <MailDate timeStamp={mail.timeStamp}/>
            </li>
        )
    }
}