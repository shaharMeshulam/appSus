const { NavLink } = ReactRouterDOM;

export function MailNav({onEditNewMail}) {
    return (
        <nav className="mail-nav flex direction-column">
            <span className="mail-nav-item" onClick={onEditNewMail}>New mail</span>
            <NavLink className="mail-nav-item" to="/mail#inbox" isActive={() => {
                return window.location.pathname + window.location.hash === "/index.html#/mail#inbox";
            }}>Inbox</NavLink>
            <NavLink className="mail-nav-item" to="/mail#sent" isActive={() => {
                return window.location.pathname + window.location.hash === "/index.html#/mail#sent";
            }}>Sent</NavLink>
            <NavLink className="mail-nav-item" to="/mail#draft" isActive={() => {
                return window.location.pathname + window.location.hash === "/index.html#/mail#draft";
            }}>draft</NavLink>
            <NavLink className="mail-nav-item" to="/mail#stared" isActive={() => {
                return window.location.pathname + window.location.hash === "/index.html#/mail#stared";
            }}>Stared</NavLink>
            <NavLink className="mail-nav-item" to="/mail#trash" isActive={() => {
                return window.location.pathname + window.location.hash === "/index.html#/mail#trash";
            }}>trash</NavLink>
        </nav>
    )
}