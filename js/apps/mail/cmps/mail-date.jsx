export function MailDate({ sentAt, isRead }) {
    const formatDate = (sentAt) => {
        const currDate = new Date();
        const sentDate = new Date(sentAt);
        if (currDate.getDate() === sentDate.getDate()) {
            let hours = sentDate.getHours();
            if (hours < 10) hours = '0' + hours;
            let mins = sentDate.getMinutes();
            if (mins < 10) mins = '0' + mins;
            return `${hours}:${mins}`;
        } else return sentDate.toLocaleDateString('en-GB');
    }
    return (
        <span className={isRead ? '' : 'bold'}>{formatDate(sentAt)}</span>
    )
}