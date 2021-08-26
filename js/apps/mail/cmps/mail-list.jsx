import { MailListItem } from "./mail-list-item.jsx";

export function MailList({ mails, type }) {
    return (
        <ul>
            {mails.map(mail => (
                <MailListItem key={mail.id} mail={mail} isChecked={mail.isChecked} type={type} />
            ))}
        </ul>
    )
}