const { NavLink } = ReactRouterDOM;

export function MailNav({ onEditNewMail }) {
    const getIsActive = (hash) => {
        return window.location.hash.includes(hash);
    }
    return (
        <nav className="mail-nav flex direction-column">
            <div className="mail-nav-item flex justify-center" onClick={onEditNewMail}>
                <p className="mail-nav-item-compose flex align-center" >
                    <span className="material-icons-outlined">
                        add
                    </span>
                    <span>
                        Compose
                    </span>
                </p>
            </div>
            <NavLink className="mail-nav-item flex align-center" to="/mail#inbox" isActive={() => getIsActive('#inbox')}>
                <span className="material-icons-outlined">
                    email
                </span>
                <span>Inbox</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center" to="/mail#sent" isActive={() => getIsActive('#sent')}>
                <span className="material-icons-outlined">
                    send
                </span>
                <span>Sent</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center" to="/mail#draft" isActive={() => getIsActive('#draft')}>
                <span className="material-icons-outlined">
                    drafts
                </span>
                <span>draft</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center" to="/mail#stared" isActive={() => getIsActive('#stared')}>
                <span className="material-icons-outlined">
                    star_outline
                </span>
                <span>Stared</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center" to="/mail#trash" isActive={() => getIsActive('#trash')}>
                <span className="material-icons-outlined">
                    delete
                </span>
                <span>trash</span>
            </NavLink>
        </nav>
    )
}