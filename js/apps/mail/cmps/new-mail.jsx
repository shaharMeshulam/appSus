import { MailEditor } from "./mail-editor.jsx";

export class NewMail extends React.Component {
    state = {
        subject: '',
        body: '',
        isHtml: false
    }

    componentDidMount() {
        const urlPrms = new URLSearchParams(this.props.location.search);
        console.log('urlPrms', urlPrms);
        const subject = urlPrms.get('subject')
        const body = urlPrms.get('body')
        const isHtml = urlPrms.get('isHtml')
        this.setState({ subject, body, isHtml })
    }

    onMailSent = () => {
        this.props.history.push('/mail#sent');
    }

    render() {
        const { subject, body, isHtml } = this.state;
        return (
            <MailEditor subject={subject} body={body} isHtml={isHtml} onMailSent={this.onMailSent} />
        )
    }
}