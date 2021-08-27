import { mailService } from "../services/mail.service.js";

export class MailLabels extends React.Component {
    state = {
        labels: []
    }
    componentDidMount() {
        this.getMailLabels();
    }
    getMailLabels = () => {
        mailService.getMailLabels(this.props.mailId)
            .then(labels => this.setState({ labels }));
    }
    render() {
        const { labels } = this.state;
        return (
            <ul className="mail-labels flex">
                {labels.map(label => (
                    <li key={label.value} title={label.value}>
                        <span className="btn material-icons-outlined" style={{ color: label.color }}>
                            label_important
                        </span>
                    </li>
                ))}
            </ul>
        )
    }
}