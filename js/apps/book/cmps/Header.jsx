const { NavLink } = ReactRouterDOM

export function Header() {
    return (
        <section className="header">
            <h1>My Book Store</h1>
            <div className="links">
                <NavLink exact to="/" >Home</NavLink>
                <NavLink to="/book" >Books</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/search" >Search</NavLink>
            </div>
        </section>
    )
}