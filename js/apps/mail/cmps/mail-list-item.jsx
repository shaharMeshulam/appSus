
const { Link, withRouter } = ReactRouterDOM
import { eventBusService } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail.service.js";
import { MailActions } from "./mail-actions.jsx";
import { MailDate } from "./mail-date.jsx";
import { MailPreview } from "./mail-preview.jsx";

class _MailListItem extends React.Component {
    state = {
        isChecked: this.props.isChecked || false,
        isMouseOver: false
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

    getSenderName() {
        const { mail } = this.props;
        return (mail.from === mailService.getUser().mail) ? `to: ${mail.to}` : mail.from;
    }

    onMouseOver = () => {
        this.setState({ isMouseOver: true })
    }

    onMouseLeave = () => {
        this.setState({ isMouseOver: false })
    }

    onRemove = () => {
        mailService.remove(this.props.mail.id)
            .then(() => eventBusService.emit('mail-change'));
    }

    onStarToggle = (mailId) => {
        mailService.toggleStared(mailId)
            .then(() => eventBusService.emit('mail-change'));
    }

    onEditMail = () => { 
        eventBusService.emit('mail-edit', this.props.mail.id);
    }

    render() {
        const { mail, type } = this.props;
        const { isDraft } = mail.status;
        const { isChecked, isMouseOver } = this.state
        return (
            <li className={`mail-list-item ${mail.isRead ? 'mail-list-item-red' : ''} flex align-center`} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                {!mail.status.isStared && <span className="btn material-icons-outlined" onClick={() => this.onStarToggle(mail.id)}>
                    star_outline
                </span>}
                {mail.status.isStared && <span className="btn material-icons-outlined" onClick={() => this.onStarToggle(mail.id)}>
                    star
                </span>}
                <input type="checkbox" name="check" id="check" checked={isChecked} onChange={this.onChange} />
                {!isDraft && <Link to={`/mail/${mail.id}#${type}`} className={`flex mail-list-item-preview ${!mail.status.isRead && 'bold'}`}>
                    <span className="sender-name">{this.getSenderName()}</span>
                    <MailPreview subject={mail.subject} body={mail.body} isRead={mail.status.isRead} sentAt={mail.sentAt} />
                </Link>}
                {isDraft && <div className={'flex mail-list-item-preview'} onClick={this.onEditMail}>
                    <span className="sender-name">{this.getSenderName()}</span>
                    <MailPreview subject={mail.subject} body={mail.body} isRead={mail.status.isRead} sentAt={mail.sentAt} />
                </div>}
                {!isMouseOver && <MailDate sentAt={mail.sentAt} />}
                {isMouseOver && <MailActions onRemove={this.onRemove} />}
            </li>
        )
    }
}
export const MailListItem = withRouter(_MailListItem);