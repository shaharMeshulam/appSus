const { NavLink } = ReactRouterDOM;

export function MailNav() {
    return (
        <nav className="mail-nav flex direction-column">
            <NavLink to="/mail#inbox">Inbox</NavLink>
            <NavLink to="/mail#sent">Sent</NavLink>
            <NavLink to="/mail#stared">Stared</NavLink>
            <NavLink to="/mail#trash">trash</NavLink>
            <NavLink to="/mail#draft">draft</NavLink>
        </nav>
    )
}