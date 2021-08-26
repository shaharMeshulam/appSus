import { MailLabels } from "./mail-labels.jsx"

export function MailActions({mailId, onRemove, isRead, onToggleRead }) {
    return (
        <ul className="mail-actions flex">
            <MailLabels mailId={mailId}/>
            {!isRead && <li title="Mark as read">
                <span className="btn material-icons-outlined" onClick={onToggleRead}>
                    mark_email_read
                </span>
            </li>}
            {isRead && <li title="mark as unread">
                <span className="btn material-icons-outlined" onClick={onToggleRead}>
                    markunread
                </span>
            </li>}
            <li title="Delete">
                <span className="btn material-icons-outlined" onClick={onRemove}>
                    delete
                </span>
            </li>
        </ul>
    )
}