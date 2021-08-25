const { Link } = ReactRouterDOM

import { carService } from "../services/car.service.js";
import { eventBusService } from "../services/event-bus-service.js";

export class CarDetails extends React.Component {

  state = {
    car: null
  }

  componentDidMount() {
    this.loadCar()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.carId !== this.props.match.params.carId) {
      this.loadCar()
    }
    
  }
  

  loadCar = () => {
    const id = this.props.match.params.carId
    carService.getCarById(id)
      .then(car => {
        if (!car) this.props.history.push('/')
        this.setState({ car })
      })

  }

  onDeleteCar = () => {
    carService.deleteCar(this.state.car.id).then(this.onBack)
    eventBusService.emit('user-msg', {txt:'car deleted!', type:'danger'})
  }

  onBack = () => {
    this.props.history.push('/car')
  }

  render() {
    console.log('RENDERD!');
    const { car } = this.state
    if (!car) return <div>Loading...</div>
    return (
      <section className='car-details'>
        <img src={`https://robohash.org/${car.vendor}`} alt='' />
        <h2>Vendor {car.vendor}</h2>
        <h4>Speed: {car.speed}</h4>
        <p>{car.desc}</p>
        <Link to={`/car/edit/${car.id}`}>Edit Car</Link>
        <section className="actions">
          <button onClick={this.onBack}>Go Back</button>
          <button onClick={this.onDeleteCar}>
            Delete Car
        </button>
          <Link to={`/car/${carService.getNextCarId(car.id)}`}>Next Car</Link>

        </section>
      </section>
    );
  }

}

