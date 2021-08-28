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
        if (urlPrms.subject) this.setState({ subject: urlPrms.subject });
        if (urlPrms.body) this.setState({ body: urlPrms.body });
        if (urlPrms.isHtml) this.setState({ isHtml: urlPrms.isHtml });
    }

    onMailSent = () => {
        this.props.history.push('/mail#sent');
    }

    render() {
        const { subject, body,isHtml } = this.state;
        return (
            <MailEditor subject={subject} body={body} isHtml={isHtml} onMailSent={this.onMailSent}/>
        )
    }
}