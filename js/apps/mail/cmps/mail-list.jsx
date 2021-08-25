import { MailListItem } from "./mail-list-item.jsx";

export function MailList({mails}) {
    return (
        <ul>
            {mails.map(mail => (
                <MailListItem key={mail.id} mail={mail}/>
            ))}
        </ul>
    )
}