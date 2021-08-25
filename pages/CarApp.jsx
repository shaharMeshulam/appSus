const { Link } = ReactRouterDOM

import { carService } from '../services/car.service.js';
import { CarList } from '../cmps/CarList.jsx';
import { CarFilter } from '../cmps/CarFilter.jsx';
import { eventBusService } from '../services/event-bus-service.js';
export class CarApp extends React.Component {
  state = {
    cars: [],
    filterBy: null,
  };

  componentDidMount() {
    // const urlSrcPrm = new URLSearchParams(this.props.location.search)
    // const res = urlSrcPrm.get('q')
    // for (const [key, val] of urlSrcPrm) {
    //   console.log('key: ', key);
    //   console.log('val: ', val);
    // }
    console.log('this.props: ', this.props);
    

    this.loadCars();
  }

  loadCars = () => {
    carService.query(this.state.filterBy).then((cars) => {
      eventBusService.emit('cars-count', cars.length)
      this.setState({ cars });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadCars);
  };

  get urlParamCtg() {
    const urlSrcPrm = new URLSearchParams(this.props.location.search)
    return urlSrcPrm.get('ctg')
  }


  get carsToDisplay() {
    const { cars } = this.state
    const ctg = this.urlParamCtg
    return cars.filter(car => !ctg || car.ctg === ctg)
  }



  render() {
    return (
      <section className='car-app'>
        <CarFilter onSetFilter={this.onSetFilter} />
        <section>
          <Link to="/car/edit">Add Car</Link>
        </section>
        <CarList cars={this.carsToDisplay} onSelectCar={this.onSelectCar} />
      </section>
    );
  }
}
