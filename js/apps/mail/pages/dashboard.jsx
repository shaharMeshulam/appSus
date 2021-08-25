const { Route } = ReactRouterDOM;
import { MailNav } from '../cmps/mail-nav.jsx';
import { Wall } from './wall.jsx';
import { MailDetails } from './mail-details.jsx';

const { withRouter } = ReactRouterDOM
class _DashBoard extends React.Component {
   render() {
        console.log("render");
        // const { mails } = this.state;
        return (
            <React.Fragment>
                <div className="main-container flex">
                    <MailNav />
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <Route exact path="/mail" component={Wall} />
                    {/* <Route exact path="/mail"
                        render={(props) => (
                            <Wall {...props} mails={mails} />
                        )} /> */}
                </div>
            </React.Fragment>
        )
    }
}

export const DashBoard = withRouter(_DashBoard)