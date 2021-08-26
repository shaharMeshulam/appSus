import { eventBusService } from "../../../services/event-bus-service.js";
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export class MailEditor extends React.Component {
    state = {
        mail: {
            id: utilService.makeId(),
            from: mailService.getUser().mail,
            to: '',
            subject: '',
            body: ''
        }
    }

    intervalId

    componentDidMount() {
        const { mail } = this.props;
        this.intervalId = setInterval(this.onSaveChanges, 5000);
        if (mail) this.setState({ mail });
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    onSaveChanges = () => {
        const { id, to, subject, body } = this.state.mail;
        if (to || subject || body) {
            const mail = this.state.mail;
            mail.status = {};
            mail.status.isDraft = true;
            mailService.addMail(mail).then(() => eventBusService.emit('email-change'));
        } else {
            mailService.remove(id).then(() => eventBusService.emit('email-change'));
        }
    }

    onChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(({ mail }) => ({ mail: { ...mail, [name]: value } }))
    }

    onBodyChange = ({ target }) => {
        this.setState(({ mail }) => ({ mail: { ...mail, body: target.innerText } }), () => { console.log(this.state.body) });
    }

    onSendMail = (ev) => {
        ev.preventDefault();
        const newMail = this.state.mail;
        newMail.status = {};
        newMail.status.isSent = true;
        newMail.status.isRead = false;
        newMail.status.isDraft = false;
        newMail.status.isStared = false;
        newMail.status.isInTrash = false;
        newMail.status.isInbox = (newMail.to === mailService.getUser().mail) ? true : false;
        mailService.addMail(newMail).then(() => {
            if (this.props.onMailSent) {
                this.props.onMailSent();
                eventBusService.emit('email-change');
            }
        })
    }

    render() {
        const { from, to, subject } = this.state.mail;
        return (
            <section className="mail-edit">
                <form className="mail-edit-form flex direction-column" onSubmit={this.onSendMail}>
                    <div className="flex justify-between">
                        <label htmlFor="from">From:</label>
                        <input type="text" name="from" id="from" defaultValue={from} />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="to">To:</label>
                        <input type="text" name="to" id="to" value={to} onChange={this.onChange} />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" name="subject" id="subject" value={subject} onChange={this.onChange} />
                    </div>
                    <pre className="mail-edit-body" contentEditable="true" onKeyUp={this.onBodyChange}>
                    </pre>
                    <button type="submit" className="btn btn-mail-send" onSubmit={this.onSendMail}>Send</button>
                </form>
            </section>
        )
    }
}