export function MailPreview({ subject, body, isRead, sentAt }) {
    const className = isRead ? '' : 'bold';
    return (
        <div className="mail-preview">
                <p className="mail-preview-content">
                    <span className={`mail-preview-subject ${className}`}>{subject}</span> - {body}
                </p>
        </div>
    )
}