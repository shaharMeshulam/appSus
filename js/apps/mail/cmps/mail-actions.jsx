export function MailActions({ onRemove, isRead, onToggleRead }) {
    return (
        <ul className="mail-actions flex">
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