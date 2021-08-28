import { MailListItem } from "./mail-list-item.jsx";

export function MailList({ mails, type, onMailSetChecked }) {
    return (
        <ul>
            {mails.map(mail => (
                <MailListItem key={mail.id} mail={mail} isChecked={mail.isChecked} type={type} onMailSetChecked={onMailSetChecked}/>
            ))}
        </ul>
    )
}