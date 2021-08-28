import { searchService } from '../../../services/gbook-service.js'
import { bookService } from '../service/books-service.js'

export class Search extends React.Component {
    state = {
        searchKey: '',
        results: ''
    }

    onSubmitForm = (ev) => {
        ev.preventDefault()
        searchService.search(this.state.searchKey).then(books => {
            this.setState({ results: books })
        })
    }

    onAddBook = (bookId) => {
        const book = this.state.results.find(book => book.id === bookId)
        bookService.addGoogleBook(book)
    }

    handleChange = ({ target }) => {
        this.setState({ searchKey: target.value })
    }


    render() {
        const { searchKey, results } = this.state
        return (
            <section className="search-page">
                <form onSubmit={this.onSubmitForm}>
                    <label htmlFor="search"></label>
                    <input onChange={this.handleChange} value={searchKey} id="search" name="searchKey" type="text" placeholder="Search Book Name" />
                    <button onClick={this.onSubmitForm}>Search</button>
                </form>
                {results && <section className="book-results">
                    <ul>
                        {results.map(book => {
                            return <li key={book.id}>{book.volumeInfo.title}<button onClick={() => { this.onAddBook(book.id) }}>+</button></li>
                        })}
                    </ul>
                </section>}

            </section>
        )
    }
}