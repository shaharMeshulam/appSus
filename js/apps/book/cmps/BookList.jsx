import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {
    return (
        <section className="books-container">
            {books.map(book => {
                return <BookPreview key={book.id} book={book} />
            }
            )}
        </section>
    )
}