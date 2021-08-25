export function MailPreview({ subject, txt, isRead, timeStamp }) {
    const className = isRead ? '' : 'bold';
    return (
        <div className="mail-preview">
                <p className="mail-preview-content">
                    <span className={`mail-preview-subject ${className}`}>{subject}</span> - {txt}
                </p>
        </div>
    )
}