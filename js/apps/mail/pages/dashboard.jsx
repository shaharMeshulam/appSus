import { mailService } from '../services/mail.service.js';
import { MailNav } from '../cmps/mail-nav.jsx';
import { Wall } from './wall.jsx';

const { withRouter } = ReactRouterDOM
class _DashBoard extends React.Component {
    state = {
        type: null,
        mails: null,
    }

    componentDidMount() {
        this.setTypeFromHash();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.hash !== this.props.location.hash) {
            this.setTypeFromHash();
        }
    }

    setTypeFromHash =() => {
        const type = this.props.location.hash;
        if (!type || !mailService.getTypes().some(t => t.includes(type.substring(1)))) this.props.history.push('/');
        this.setState({ type: type.substring(1) }, this.getMailsForDisplay);
    }
    

    getMailsForDisplay = () => {
        mailService.getMailsToDisplay(this.state.type)
            .then(mails => this.setState({ mails }));
    }

    render() {
        const { mails } = this.state;
        return (
            <React.Fragment>
                <section className="actions">

                </section>
                <div className="main-container flex">
                    <MailNav />
                    <Wall mails={mails} />
                </div>
            </React.Fragment>
        )
    }
}

export const DashBoard = withRouter(_DashBoard)