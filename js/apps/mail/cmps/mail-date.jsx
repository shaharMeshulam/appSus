export function MailDate({ timeStamp}) {
    const formatDate = (timeStamp) => {
        const currDate = Date.now();
        const day = 1000 * 60 * 60 * 24;
        const yesterday = currDate - day;
        const date = new Date(timeStamp);
        if (timeStamp > yesterday) {
            let hours = date.getHours();
            if (hours < 10) hours = '0' + hours;
            let mins = date.getMinutes();
            if (mins < 10) mins = '0' + mins;
            return `${hours}:${mins}`;
        } else return date.toLocaleDateString('en-CA');
    }
    return (
        <span>{formatDate(timeStamp)}</span>
    )
}