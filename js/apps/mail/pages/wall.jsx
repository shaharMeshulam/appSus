
import { MailList } from "../cmps/mail-list.jsx";

export class Wall extends React.Component {
    state = {
        isAllChecked: false
    }

    render() {
        const { mails, type, onToggleCheckAll } = this.props;
        if (!mails) return <section className="wall">loading</section>
        return (
            <section className="wall">
                <section className="actions">
                    <input type="checkbox" onChange={onToggleCheckAll} />
                </section>
                <MailList mails={mails} type={type} />
            </section>
        )
    }
}