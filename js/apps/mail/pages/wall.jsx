
import { MailList } from "../cmps/mail-list.jsx";
import { mailService } from '../services/mail.service.js';

export class Wall extends React.Component {
    state = {
        type: null,
        mails: null,
        isAllChecked: false
    }

    componentDidMount() {
        this.setTypeFromHash();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.hash !== this.props.location.hash) this.setTypeFromHash();
    }

    setTypeFromHash = () => {
        const type = this.props.location.hash;
        if (!type || !mailService.getTypes().some(t => t.includes(type.substring(1)))) this.props.history.push('/');
        this.setState({ type: type.substring(1) }, this.getMailsForDisplay);
    }

    getMailsForDisplay = () => {
        mailService.getMailsToDisplay(this.state.type)
            .then(mails => this.setState({
                mails: mails.map(mail => {
                    mail.isChecked = false
                    return mail;
                })
            }));
    }

    onToggleCheckAll = () => {
        this.setState(({ isAllChecked }) => ({ isAllChecked: !isAllChecked }), () => {
            let mails = this.state.mails;
            mails = mails.map(mail => {
                mail.isChecked = this.state.isAllChecked;
                return mail;
            })
            this.setState({ mails });
        })
    }
    render() {
        const {mails} = this.state;
        if (!mails) return <section className="wall">loading</section>
        return (
            <section className="wall">
                <section className="actions">
                    <input type="checkbox" onChange={this.onToggleCheckAll} />
                </section>
                <MailList mails={mails} />
            </section>
        )
    }
}