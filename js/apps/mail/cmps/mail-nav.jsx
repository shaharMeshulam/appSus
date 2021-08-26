const { NavLink } = ReactRouterDOM;

export function MailNav({onEditNewMail}) {
    const getIsActive = (hash) => {
        return window.location.hash.includes(hash);
    }
    return (
        <nav className="mail-nav flex direction-column">
            <span className="mail-nav-item" onClick={onEditNewMail}>New mail</span>
            <NavLink className="mail-nav-item" to="/mail#inbox" isActive={() => getIsActive('#inbox')}>Inbox</NavLink>
            <NavLink className="mail-nav-item" to="/mail#sent" isActive={() => getIsActive('#sent')}>Sent</NavLink>
            <NavLink className="mail-nav-item" to="/mail#draft" isActive={() => getIsActive('#draft')}>draft</NavLink>
            <NavLink className="mail-nav-item" to="/mail#stared" isActive={() => getIsActive('#stared')}>Stared</NavLink>
            <NavLink className="mail-nav-item" to="/mail#trash" isActive={() => getIsActive('#trash')}>trash</NavLink>
        </nav>
    )
}