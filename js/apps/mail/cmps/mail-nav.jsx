const { NavLink } = ReactRouterDOM;

export function MailNav() {
    return (
        <nav className="mail-nav flex direction-column">
            <span className="mail-nav-item">New mail</span>
            <NavLink className="mail-nav-item" to="/mail#inbox">Inbox</NavLink>
            <NavLink className="mail-nav-item" to="/mail#sent">Sent</NavLink>
            <NavLink className="mail-nav-item" to="/mail#stared">Stared</NavLink>
            <NavLink className="mail-nav-item" to="/mail#trash">trash</NavLink>
            <NavLink className="mail-nav-item" to="/mail#draft">draft</NavLink>
        </nav>
    )
}