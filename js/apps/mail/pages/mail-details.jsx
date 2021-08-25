import { MailDate } from "../cmps/mail-date.jsx";
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
                    <div class="flex justify-between">
                        <p className="mail-details-from">{mail.from}</p><MailDate timeStamp={mail.timeStamp} />
                    </div>
                    <pre class="mail-detail-txt">
                        {mail.txt}
                    </pre>
                </div>
            </div>
        )
    }
}