import { mailService } from "../services/mail.service.js"

export class MailAddLabels extends React.Component {
    state = {
        showLabels: false,
        labels: null
    }

    componentDidMount() {
        mailService.getLabels()
            .then(labels => this.setState({ labels }));
    }

    onToggleAddLabel = () => {
        this.setState(({ showLabels }) => ({ showLabels: !showLabels }));
    }

    onAddLabel = (label) => {
        mailService.addLabel(this.props.mailId, label)
            .then(() => {
                this.onToggleAddLabel();
                this.getMailLabels();
            });
    }

    render() {
        const { showLabels, labels, mailLabels } = this.state;
        return (
            <ul className="mail-labels flex">
                <li title="Add label" title="Add label" onClick={this.onToggleAddLabel}>
                    <span className="btn material-icons-outlined">
                        label_important
                    </span>
                </li>
                {showLabels && (
                    <ul className="mail-labels-labels flex direction-column">
                        {labels.map(label => (
                            <li key={label.color}
                                className="btn"
                                style={{ backgroundColor: label.color }}
                                onClick={() => this.onAddLabel(label)}>{label.value}
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        )
    }
}