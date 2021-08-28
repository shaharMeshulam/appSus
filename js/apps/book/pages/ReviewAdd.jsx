import { bookService } from '../../book/service/books-service.js'

export class ReviewAdd extends React.Component {
    state = {
        fullName: '',
        rate: '',
        txt: '',
        date: ''
    }

    componentDidMount() {
        this.setState({ date: this.formatedDate, rate: 1 })
    }

    get formatedDate() {
        const currDate = new Date()
        let month = currDate.getMonth() + 1 + ''
        let day = currDate.getDate() + ''
        month = (month.length > 1) ? month : 0 + month
        day = (day.length > 1) ? day : 0 + day
        return `${currDate.getFullYear()}-${month}-${day}`
    }

    onSubmitBook = (ev) => {
        ev.preventDefault()
        const { bookId } = this.props.match.params
        for (const key in this.state) {
            if (!this.state[key]) return
        }
        bookService.addReview(bookId, this.state)
        this.props.history.push(`/book/${bookId}`)
    }

    handleChange = ({ target }) => {
        const value = (target.name === 'rate') ? +target.value : target.value
        const field = target.name
        this.setState(prevState => ({ ...prevState, [field]: value }))
    }

    render() {
        const { fullName, txt, date } = this.state
        return (
            <section className="new-review">
                <form onSubmit={this.onSubmitBook}>
                    <label htmlFor="full-name">Full Name:</label>
                    <input value={fullName} name="fullName" id="full-name" placeholder="Enter full name" onChange={this.handleChange} type="text"></input>
                    <label htmlFor="date">Read At:</label>
                    <input value={date} name="date" id="full-name" onChange={this.handleChange} type="date"></input>
                    <label htmlFor="rating">Rating:</label>
                    <select onChange={this.handleChange} name="rate" id="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <textarea name="txt" onChange={this.handleChange} value={txt}></textarea>
                    <button>Submit</button>
                </form>
            </section>
        )
    }
}