export class BookFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            startPrice: '',
            endPrice: ''
        }
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onFilterBy(this.state.filterBy)
        })
    }

    render() {
        const { name, startPrice, endPrice } = this.state.filterBy
        return (
            <div className="filter">
                <label htmlFor="name">Name:</label>
                <input onChange={this.handleChange} value={name} id="name" name="name" type="text"></input>
                <label htmlFor="startPrice">Start Price:</label>
                <input onChange={this.handleChange} value={startPrice} id="startPrice" name="startPrice" type="number"></input>
                <label htmlFor="endPrice">End Price:</label>
                <input onChange={this.handleChange} value={endPrice} id="endPrice" name="endPrice" type="number"></input>
            </div>
        )
    }
}