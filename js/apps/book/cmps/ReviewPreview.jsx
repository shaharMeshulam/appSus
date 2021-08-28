import { bookService } from '../service/books-service.js'

export function ReviewPreview({ review, bookId, changeState }) {
    const { fullName, txt, rate, date, id } = review

    console.log(review.id, bookId);
    return (
        <div className="review">
            <p>Full Name: {fullName}</p>
            <p>Rate: {rate}</p>
            <p>Date Read: {date}</p>
            <p>Review: {txt}</p>
            <button onClick={() => {
                bookService.deleteReview(bookId, review.id)
                changeState()
            }}>X</button>
        </div >
    )
}