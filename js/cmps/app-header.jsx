import { AppNav } from "./app-nav.jsx";
import { AppSearch } from "./app-search.jsx";

const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader() {
  return (
    <header className="app-header flex justify-between">
      <h2><NavLink to="/">AppSus</NavLink></h2>
      <AppSearch />
      <AppNav/>
    </header>
  )
}
export const AppHeader = withRouter(_AppHeader);