import { AppNav } from "./app-nav.jsx";
import { AppSearch } from "./app-search.jsx";
import { HeaderAbout } from "./header-about.jsx";
import { HeaderBook } from "./header-book.jsx";
import { HeaderHome } from "./header-home.jsx";
import { HeaderMail } from "./header-mail.jsx";
import { HeaderNotes } from "./header-notes.jsx";

const { NavLink, withRouter, Route, Switch } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {
    route: ''
  }

  componentDidMount() {
    this.setState({ route: this.props.location.pathname });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ route: this.props.location.pathname });
    }
  }


  render() {
    const { route } = this.state;
    return (
      <header className="app-header flex justify-between align-center clickable">
        <h2><NavLink to="/">AppSus</NavLink></h2>
        <AppSearch route={route} />
        <div className="flex align-center">
          <Switch>
            <Route path="/about" component={HeaderAbout} />
            <Route path="/book" component={HeaderBook} />
            <Route path="/keep" component={HeaderNotes} />
            <Route path="/mail" component={HeaderMail} />
            <Route path="/" component={HeaderHome} />
          </Switch>
          <AppNav />
        </div>
      </header>
    )
  }
}
export const AppHeader = withRouter(_AppHeader);