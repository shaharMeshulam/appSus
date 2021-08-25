const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/app-header.jsx';
import { UserMsg } from './cmps/user-msg.jsx';
export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main>
                <Switch>
                </Switch>
            </main>
            <UserMsg />
        </Router>
    );
}
