import { NoteFilter } from "../apps/keep/cmps/note-filter.jsx";
import { MailSearch } from "../apps/mail/cmps/mail-search.jsx";
const { Switch, Route } = ReactRouterDOM

export class AppSearch extends React.Component {
    state = {
        route: this.props.route
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.route !== this.props.route) this.setState({ route: this.props.route });
    }

    checkIfRouteIncludes = (r) => {
        return this.state.route.includes(r)
    }

    render() {
        return (
            <Switch>
                <Route path="/keep" component={NoteFilter} />
                <MailSearch display={this.checkIfRouteIncludes('mail')} />
            </Switch>
        )
    }
}