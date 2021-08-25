const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';
export function App() {
  return (
    <Router>
      <header>
        <AppHeader/>
      </header>
      <main>
        <Switch>
        </Switch>
      </main>
      <UserMsg/>
    </Router>
  );
}
