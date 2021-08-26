export function MailActions({onRemove}) {
    return (
        <ul className="mail-actions">
            <li title="delete">
                <span className="btn material-icons-outlined" onClick={onRemove}>
                    delete
                </span>
            </li>
        </ul>
    )
}