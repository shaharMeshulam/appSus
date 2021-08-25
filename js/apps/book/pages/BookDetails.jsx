import { utilService } from '../../../services/util.service.js'
import { bookService } from '../../../services/books-service.js'
import { LongTxt } from '../LongTxt.jsx'
import { ReviewList } from '../ReviewList.jsx'

const { Link } = ReactRouterDOM
export class BookDetails extends React.Component {
    state = {
        book: null
    }

    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getBookById(bookId).then(book => {
            this.setState({ book })
        })
    }

    getPriceColor = () => {
        const { book } = this.state
        if (book.listPrice.amount < 20) return 'green'
        if (book.listPrice.amount > 150) return 'red'
        return ''
    }

    formatCat = () => {
        const { book } = this.state
        let str = 'Categor'
        str += (book.authors.length > 1) ? 'ies' : 'y'
        str += ': '
        str += book.authors.map(author => author).join(' | ')
        return str
    }

    formatAuthors = () => {
        const { book } = this.state
        let str = 'Author'
        if (book.authors.length > 1) str += 's'
        str += ': '
        str += book.authors.map((author) => author).join('|')
        return str
    }

    formatPageCount = () => {
        const { book } = this.state
        const pageCnt = book.pageCount
        if (pageCnt > 500) return `Pages: ${pageCnt} - Long reading`
        if (pageCnt >= 100) return `Pages: ${pageCnt} - Decent reading`
        if (pageCnt < 100) return `Pages: ${pageCnt} - Light reading`
    }

    formatTimePublished = () => {
        const { book } = this.state
        const timePub = book.publishedDate
        const currYear = new Date().getFullYear()
        if (currYear - timePub <= 1) return `Time Published: ${timePub} New!`
        if (currYear - timePub >= 10) return `Time Published: ${timePub} Veteran Book!`
        return `Time Published: ${timePub}`
    }

    render() {
        const { book } = this.state
        return (book &&
            <section className="book-details" >
                <h1>{book.title}</h1>
                <h3>{this.formatAuthors()}</h3>
                <h6>{book.subtitle}</h6>
                <img src={book.thumbnail}></img>
                <p>{this.formatCat()}</p>
                {<LongTxt text={book.description} />}
                <p className={this.getPriceColor()}>{utilService.formatCurrency(book)}</p>
                <p>{this.formatPageCount()}</p>
                <p>{this.formatTimePublished()}</p>
                <ReviewList book={book} changeState={this.loadBook} />
                <Link to={`/book/${book.id}/review`}>Add Review</Link>
            </section >
        )
    }
}