import { bookService } from '../service/books-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export class BookApp extends React.Component {

    state = {
        books: null,
        filterBy: null
    }

    componentDidMount() {
        this.loadBooks(this.state.filterBy)
    }

    loadBooks = () => {
        bookService.getBooks(this.state.filterBy).then(books => {
            this.setState({ books })
        })
    }



    setFilterBy = (filterBy) => {
        this.setState({ filterBy: { ...filterBy } }, this.loadBooks)
    }


    render() {
        const { books } = this.state
        return (books && <React.Fragment>
            <BookFilter onFilterBy={this.setFilterBy} />
            <BookList books={books} />
        </React.Fragment>)

    }
}