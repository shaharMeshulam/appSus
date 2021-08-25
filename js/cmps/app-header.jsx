import { AppSearch } from "./app-search.jsx";

const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader() {
  return (
    <header className="app-header">
      <h2><NavLink to="/">AppSus</NavLink></h2>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mail" >Mail</NavLink>
        <NavLink to="/keep" >Notes</NavLink>
        <NavLink to="/book" >Books</NavLink>
        <NavLink to="/about" >About</NavLink>
      </nav>
      <AppSearch />
      <span className="material-icons-outlined">
        apps
      </span>
    </header>
  )
}
export const AppHeader = withRouter(_AppHeader)