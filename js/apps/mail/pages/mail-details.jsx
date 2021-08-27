import { eventBusService } from "../../../services/event-bus-service.js";
import { MailActions } from "../cmps/mail-actions.jsx";
import { MailDate } from "../cmps/mail-date.jsx";
import { MailLabels } from "../cmps/mail-labels.jsx";
import { MailStar } from "../cmps/mail-star.jsx";
import { mailService } from "../services/mail.service.js";

export class MailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.getMail();
    }

    getMail = () => {
        const mailId = this.props.match.params.mailId;
        mailService.getMailById(mailId)
            .then(mail => {
                mailService.setMailIsRead(mail.id, true)
                    .then(m => this.setState({ mail: m }))
            });
    }

    onRemove = () => {
        mailService.remove(this.state.mail.id)
            .then(() => {
                this.props.history.push('/mail#inbox');
            });
    }

    onToggleRead = () => {
        const { mail } = this.state;
        mailService.setMailIsRead(mail.id, !mail.isRead)
            .then(m => this.setState({ mail: m }));
    }

    onStarToggle = () => {
        mailService.toggleStared(this.state.mail.id)
            .then((mail) => this.setState({ mail }));
    }

    render() {
        const { mail } = this.state;
        if (!mail) return <div className="mail-details">Loading</div>
        return (
            <div className="mail-details">
                <div className="mail-details-container flex direction-column">
                    <div className="flex justify-between">
                        <p className="mail-details-from">{mail.from}</p>
                        <div className="actions flex">
                            <MailStar isStared={mail.isStared} onStarToggle={this.onStarToggle} />
                            <MailLabels mailId={mail.id}/>
                            <MailActions mailId={mail.id} onRemove={this.onRemove} isRead={mail.isRead} onToggleRead={this.onToggleRead} />
                            <MailDate sentAt={mail.sentAt} isRead={true} />
                        </div>
                    </div>
                    <pre className="mail-detail-body">
                        {mail.body}
                    </pre>
                </div>
            </div>
        )
    }
}