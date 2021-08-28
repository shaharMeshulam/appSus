const { Route, Switch } = ReactRouterDOM

import { ReviewAdd } from "../apps/book/pages/ReviewAdd.jsx";
import { BookDetails } from "../apps/book/pages/BookDetails.jsx";
import { BookApp } from "../apps/book/pages/book-app.jsx";

export function AppBook() {
    return (
        <main className="app-book">
            <Switch>
                <Route path="/book/:bookId/review" component={ReviewAdd} />
                <Route path="/book/:bookId" component={BookDetails} />
                <Route path="/book/" component={BookApp} />
            </Switch>
        </main>
    )
}