const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'

export function BookPreview({ book }) {
    const { isOnSale } = book.listPrice
    return <div className="book">
        <div className="imgs-container">
            {isOnSale && <img className="sale" src="../assets/img/sale.png"></img>}
            <img src={book.thumbnail}></img>
        </div>
        <Link to={`/book/${book.id}`}>Read More</Link>
        <h2>{book.title}</h2>
        <p>Price: {utilService.formatCurrency(book)} </p>
    </div>
}