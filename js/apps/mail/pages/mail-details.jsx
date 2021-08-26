import { MailDate } from "../cmps/mail-date.jsx";
import { MailEditor } from "../cmps/mail-editor.jsx";
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
        mailService.getEmailById(mailId)
            .then(mail => this.setState({ mail }));
    }

    render() {
        const { mail } = this.state;
        if (!mail) return <div className="mail-details">Loading</div>
        return (
            <div className="mail-details">
                <div className="mail-details-container flex direction-column">
                    <div className="flex justify-between">
                        <p className="mail-details-from">{mail.from}</p><MailDate sentAt={mail.sentAt} />
                    </div>
                    <pre className="mail-detail-body">
                        {mail.body}
                    </pre>
                </div>
            </div>
        )
    }
}