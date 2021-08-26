
const { Link, withRouter } = ReactRouterDOM
import { eventBusService } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail.service.js";
import { MailActions } from "./mail-actions.jsx";
import { MailDate } from "./mail-date.jsx";
import { MailPreview } from "./mail-preview.jsx";
import { MailStar } from "./mail-star.jsx";

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

    onStarToggle = () => {
        mailService.toggleStared(this.props.mail.id)
            .then(() => eventBusService.emit('mail-change'));
    }

    onEditMail = () => {
        eventBusService.emit('mail-edit', this.props.mail.id);
    }

    onToggleRead = () => {
        const { mail } = this.props;
        mailService.setMailIsRead(mail.id, !mail.status.isRead)
            .then(() => eventBusService.emit('mail-change'));
    }

    render() {
        const { mail, type } = this.props;
        const { isDraft, isRead, isStared } = mail.status;
        const { isChecked, isMouseOver } = this.state;
        return (
            <li className={`mail-list-item ${isRead && 'mail-list-item-read'} flex align-center`} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                <input type="checkbox" name="check" id="check" checked={isChecked} onChange={this.onChange} />
                <MailStar isStared={isStared} onStarToggle={this.onStarToggle} />
                {!isDraft && <Link to={`/mail/${mail.id}#${type}`} className={`flex mail-list-item-preview ${!isRead && 'bold'}`}>
                    <span className="sender-name">{this.getSenderName()}</span>
                    <MailPreview subject={mail.subject} body={mail.body} isRead={isRead} sentAt={mail.sentAt} />
                </Link>}
                {isDraft && <div className={'flex mail-list-item-preview'} onClick={this.onEditMail}>
                    <span className="sender-name">{this.getSenderName()}</span>
                    <MailPreview subject={mail.subject} body={mail.body} isRead={isRead} sentAt={mail.sentAt} />
                </div>}
                {!isMouseOver && <MailDate sentAt={mail.sentAt} isRead={isRead} />}
                {isMouseOver && <MailActions mailId={mail.id} onRemove={this.onRemove} isRead={isRead} onToggleRead={this.onToggleRead} />}
            </li>
        )
    }
}
export const MailListItem = withRouter(_MailListItem);