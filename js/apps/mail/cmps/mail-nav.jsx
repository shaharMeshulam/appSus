import { eventBusService } from "../../../services/event-bus-service.js";

const { NavLink } = ReactRouterDOM;

export function MailNav({ onEditNewMail }) {
    const getIsActive = (hash) => {
        return window.location.hash.includes(hash);
    }

    const setSearch = (criteria) => {
        eventBusService.emit('search', criteria);
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
            <NavLink className="mail-nav-item flex align-center"
                to="/mail#inbox"
                onClick={() => { setSearch({ status: 'inbox' }) }}
                isActive={() => getIsActive('#inbox')}>
                <span className="material-icons-outlined">
                    email
                </span>
                <span>Inbox</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center"
                to="/mail#sent"
                onClick={() => { setSearch({ status: 'sent' }) }}
                isActive={() => getIsActive('#sent')}>
                <span className="material-icons-outlined">
                    send
                </span>
                <span>Sent</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center"
                to="/mail#draft"
                onClick={() => { setSearch({ status: 'draft' }) }}
                isActive={() => getIsActive('#draft')}>
                <span className="material-icons-outlined">
                    drafts
                </span>
                <span>draft</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center"
                to="/mail#stared"
                onClick={() => { setSearch({ isStared: true }) }}
                isActive={() => getIsActive('#stared')}>
                <span className="material-icons-outlined">
                    star_outline
                </span>
                <span>Stared</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center"
                to="/mail#trash"
                onClick={() => { setSearch({ status: 'trash' }) }}
                isActive={() => getIsActive('#trash')}>
                <span className="material-icons-outlined">
                    delete
                </span>
                <span>Trash</span>
            </NavLink>
            <NavLink className="mail-nav-item flex align-center"
                to="/mail#all"
                onClick={() => { setSearch({ status: 'all' }) }}
                isActive={() => getIsActive('#all')}>
                <span className="material-icons-outlined">
                    mark_as_unread
                </span>
                <span>All</span>
            </NavLink>
        </nav>
    )
}