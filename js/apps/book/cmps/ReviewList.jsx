import { ReviewPreview } from './ReviewPreview.jsx'


export function ReviewList({ book, changeState }) {
    const reviews = book.reviews
    const bookId = book.id
    if (!reviews || !reviews.length) return <React.Fragment></React.Fragment>
    return (reviews &&
        <section className="reviews-container">
            {reviews.map(review =>
                <ReviewPreview key={review.id} review={review} bookId={bookId} changeState={changeState} />
            )}
        </section>
    )
}