import { MailSearch } from "../apps/mail/cmps/mail-search.jsx";

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
            this.checkIfRouteIncludes('mail') && <MailSearch />
        )
    }
}