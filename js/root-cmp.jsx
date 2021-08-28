const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { AppHeader } from './cmps/app-header.jsx';
import { UserMsg } from './cmps/user-msg.jsx';
import { AppAbout } from './pages/app-about.jsx';
import { AppBook } from './pages/app-book.jsx';
import { AppHome } from './pages/app-home.jsx';
import { AppKeep } from './pages/app-keep.jsx';
import { AppMail } from './pages/app-mail.jsx';

export function App() {
    return (
        <Router>
            <AppHeader />
            <main>
                <Switch>
                    <Route path="/keep" component={AppKeep} />
                    <Route path="/mail" component={AppMail} />
                    <Route path="/about" component={AppAbout} />
                    <Route path="/book" component={AppBook} />
                    <Route path="/" component={AppHome} />
                </Switch>
            </main>
            <UserMsg />
        </Router>
    );
}
