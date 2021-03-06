const { NavLink } = ReactRouterDOM

export class AppNav extends React.Component {
    state = {
        isExpended: false
    }

    toggleExpended = () => {
        this.setState(({ isExpended }) => ({ isExpended: !isExpended }));
    }

    render() {
        const { isExpended } = this.state;
        return (
            <nav className="app-nav flex">
                <span className="material-icons-outlined" onClick={this.toggleExpended}>
                    apps
                </span>
                {isExpended && (
                    <ul className="app-nav-nav flex">
                        <li>
                            <NavLink className="flex direction-column align-center" to="/" onClick={this.toggleExpended}>
                                <span className="material-icons-outlined">
                                    home
                                </span>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex direction-column align-center" to="/mail#inbox" onClick={this.toggleExpended}>
                                <span className="material-icons-outlined">
                                    email
                                </span>
                                <span>Mail</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex direction-column align-center" to="/keep" onClick={this.toggleExpended}>
                                <span className="material-icons-outlined">
                                    description
                                </span>
                                <span>Notes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex direction-column align-center" to="/book" onClick={this.toggleExpended}>
                                <span className="material-icons-outlined">
                                    menu_book
                                </span>
                                <span>Books</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="flex direction-column align-center" to="/about" onClick={this.toggleExpended}>
                                <span className="material-icons-outlined">
                                    info
                                </span>
                                <span>About</span>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        )
    }
}