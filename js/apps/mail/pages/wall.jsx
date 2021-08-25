import { MailList } from "../cmps/mail-list.jsx"

export function Wall({ mails }) {
    if (!mails) return <section className="wall">loading</section>
    return (
        <section className="wall">
            <MailList mails={mails}/>
        </section>
    )
}