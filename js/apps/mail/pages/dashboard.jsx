const { Route } = ReactRouterDOM;
import { MailNav } from '../cmps/mail-nav.jsx';
import { Wall } from './wall.jsx';
import { MailDetails } from './mail-details.jsx';
import { FloatingMailEditor } from '../cmps/floating-mail-editor.jsx';
import { eventBusService } from '../../../services/event-bus-service.js';
import { mailService } from '../services/mail.service.js';

const { withRouter } = ReactRouterDOM
export class DashBoard extends React.Component {
    state = {
        isEditNewMail: false,
        mail: null
    }

    removeEventBus;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('mail-edit', this.onEdit)

    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    onEdit = (mailId) => {
        mailService.getMailById(mailId)
            .then(mail => this.setState({ isEditNewMail: true, mail }));
    }

    onEditNewMail = () => {
        this.setState({ isEditNewMail: true, mail: null });
    }

    onCloseEditor = () => {
        this.setState({ isEditNewMail: false })
    }

    render() {
        const { isEditNewMail, mail } = this.state;
        return (
            <React.Fragment>
                <div className="main-container flex">
                    <MailNav onEditNewMail={this.onEditNewMail} />
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <Route exact path="/mail" component={Wall} />
                    {isEditNewMail && (
                        <FloatingMailEditor onCloseEditor={this.onCloseEditor} mail={mail} />
                    )}
                </div>
            </React.Fragment>
        )
    }
}

// export const DashBoard = withRouter(_DashBoard)