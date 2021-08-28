import { AppNav } from "./app-nav.jsx";
import { AppSearch } from "./app-search.jsx";

const { NavLink, withRouter } = ReactRouterDOM

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
        <AppSearch route={route}/>
        <AppNav />
      </header>
    )
  }
}
export const AppHeader = withRouter(_AppHeader);