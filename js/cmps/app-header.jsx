import { eventBusService } from "../services/event-bus-service.js"

const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  state = {
    carsCount: 0
  }

  removeEventBus;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('cars-count', (carsCount) => {
      this.setState({ carsCount })
    })
  }

  componentWillUnmount() {
    this.removeEventBus()
  }
  


  render() {

    return (
      <section className="app-header">
        <h2><NavLink to="/">AppSus</NavLink></h2>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/mail" >Mail</NavLink>
          <NavLink to="/note" >Notes</NavLink>
          <NavLink to="/book" >Books</NavLink>
          <NavLink to="/about" >About</NavLink>
        </nav>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)