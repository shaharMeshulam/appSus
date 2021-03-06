import { eventBusService } from "../../../services/event-bus-service.js";
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export class MailEditor extends React.Component {
    state = {
        mail: {
            id: utilService.makeId(),
            from: mailService.getUser().mail,
            to: this.props.to || '',
            subject: this.props.subject || '',
            body: this.props.body || ''
        }
    }

    intervalId

    componentDidMount() {
        const { mail } = this.props;
        this.intervalId = setInterval(this.onSaveChanges, 5000);
        if (mail) this.setState({ mail });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.subject !== this.props.subject) this.setState(({ mail }) => ({ mail: { ...mail, subject: this.props.subject } }))
        if (prevProps.body !== this.props.body) this.setState(({ mail }) => ({ mail: { ...mail, body: this.props.body } }))
    }


    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    onSaveChanges = () => {
        const { id, to, subject, body } = this.state.mail;
        if (to || subject || body) {
            const mail = this.state.mail;
            mail.status = 'draft';
            mail.isRead = true;
            mail.labels = [];
            mailService.addMail(mail).then(() => eventBusService.emit('mail-change'));
        } else {
            mailService.remove(id).then(() => eventBusService.emit('mail-change'));
        }
    }

    onChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(({ mail }) => ({ mail: { ...mail, [name]: value } }))
    }

    onBodyChange = ({ target }) => {
        this.setState(({ mail }) => ({ mail: { ...mail, body: target.innerText } }));
    }

    onSendMail = (ev) => {
        ev.preventDefault();
        const newMail = this.state.mail;
        newMail.status = 'sent';
        newMail.isRead = true;
        newMail.isStared = false;
        if (!newMail.labels) newMail.labels = [];
        mailService.addMail(newMail).then(() => {
            if (this.props.onMailSent) {
                this.props.onMailSent();
            }
            eventBusService.emit('mail-change');
        })
    }

    render() {
        const { from, to, subject, body } = this.state.mail;
        const { isHtml = false } = this.props
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
                    {!isHtml && <div className="mail-edit-body" contentEditable="true" value={body} onKeyUp={this.onBodyChange}>
                    </div>}
                    {isHtml && <div className="mail-edit-body" contentEditable="true" dangerouslySetInnerHTML={{ __html: body }} value={body} onKeyUp={this.onBodyChange}>
                    </div>}
                    <button type="submit" className="btn btn-mail-send" onSubmit={this.onSendMail}>Send</button>
                </form>
            </section>
        )
    }
}