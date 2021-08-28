const { Link, withRouter } = ReactRouterDOM
import { eventBusService } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail.service.js";
import { MailActions } from "./mail-actions.jsx";
import { MailDate } from "./mail-date.jsx";
import { MailLabels } from "./mail-labels.jsx";
import { MailPreview } from "./mail-preview.jsx";
import { MailStar } from "./mail-star.jsx";

class _MailListItem extends React.Component {
    state = {
        isChecked: this.props.isChecked || false,
        isMouseOver: false
    }

    onChange = () => {
        this.setState(({ isChecked }) => ({ isChecked: !isChecked }), () => {
            this.props.onMailSetChecked(this.props.mail.id, this.state.isChecked);
        });
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
        mailService.setMailIsRead(mail.id, !mail.isRead)
            .then(() => eventBusService.emit('mail-change'));
    }

    render() {
        const { mail, type } = this.props;
        const { status, isRead, isStared, subject, body, sentAt, id } = mail;
        const { isChecked, isMouseOver } = this.state;
        return (
            <li className={`mail-list-item ${isRead && 'mail-list-item-read'} flex align-center`} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                <input type="checkbox" name="check" id="check" checked={isChecked} onChange={this.onChange} />
                <MailStar isStared={isStared} onStarToggle={this.onStarToggle} />
                <MailLabels mailId={id} />
                {status !== 'draft' && <Link to={`/mail/${mail.id}#${type}`} className={`flex mail-list-item-preview ${!isRead && 'bold'}`}>
                    <span className="sender-name">{this.getSenderName()}</span>
                    <MailPreview subject={subject} body={body} isRead={isRead} sentAt={sentAt} />
                </Link>}
                {status === 'draft' && <div className={'flex mail-list-item-preview'} onClick={this.onEditMail}>
                    <span className="sender-name">{this.getSenderName()}</span>
                    <MailPreview subject={subject} body={body} isRead={isRead} sentAt={sentAt} />
                </div>}
                {!isMouseOver && <MailDate sentAt={sentAt} isRead={isRead} />}
                {isMouseOver && <MailActions mailId={mail.id} onRemove={this.onRemove} isRead={isRead} onToggleRead={this.onToggleRead} />}
            </li>
        )
    }
}
export const MailListItem = withRouter(_MailListItem);