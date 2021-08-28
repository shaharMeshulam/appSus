const { Route, withRouter } = ReactRouterDOM;
import { MailNav } from '../cmps/mail-nav.jsx';
import { Wall } from './wall.jsx';
import { MailDetails } from './mail-details.jsx';
import { FloatingMailEditor } from '../cmps/floating-mail-editor.jsx';
import { eventBusService } from '../../../services/event-bus-service.js';
import { mailService } from '../services/mail.service.js';

export class _DashBoard extends React.Component {
    state = {
        isEditNewMail: false,
        mail: null,
        mails: null,
        type: null,
        criteria: null,
        isShowTrash: false
    }

    removeEventBusMailEdit;
    removeEventBusMailChange;
    removeEventBusSearchChange;

    componentDidMount() {
        this.removeEventBusSearchChange = eventBusService.on('search-change', this.setType);
        this.removeEventBusMailChange = eventBusService.on('mail-change', () => {
            if (this.state.type === 'stared') {
                this.getMailsForDisplay({ isStared: true });
            } else {
                this.getMailsForDisplay({ status: this.state.type });
            }
        })
        this.removeEventBusMailEdit = eventBusService.on('mail-edit', this.onEdit);
        const type = this.props.location.hash.substring(1);
        if (type !== 'stared') eventBusService.emit('search', { status: type });
        else eventBusService.emit('search', { isStared: true });
    }

    componentWillUnmount() {
        this.removeEventBusSearchChange()
        this.removeEventBusMailChange();
        this.removeEventBusMailEdit();
    }

    setType = (criteria) => {
        const type = criteria.status ? criteria.status : 'stared';
        if (!type || !mailService.getTypes().some(t => t.includes(type))) {
            this.props.history.push('/');
            return;
        } else if (type === 'all') this.props.history.push('/mail#all');
        this.setState({criteria});
        this.setState({ type: type }, () => { this.getMailsForDisplay(criteria) });
    }

    getMailsForDisplay = (criteria) => {
        mailService.getMailsToDisplay(criteria)
            .then(mails => this.setState({
                mails: mails.map(mail => {
                    mail.isChecked = false
                    return mail;
                })
            }));
    }

    onToggleCheckAll = () => {
        this.setState(({ isAllChecked }) => ({ isAllChecked: !isAllChecked }), () => {
            let mails = this.state.mails;
            mails = mails.map(mail => {
                mail.isChecked = this.state.isAllChecked;
                return mail;
            })
            this.setState({ mails }, this.setIsShowTrash);
        });
    }

    onMailSetChecked = (mailId, isChecked) => {
        const newMails = this.state.mails;
        const idx = newMails.findIndex(mail=> mail.id===mailId);
        newMails[idx].isChecked = isChecked;
        this.setState({mails: newMails});
        this.setIsShowTrash()
    }

    setIsShowTrash = () => {
        const isShowTrash = this.state.mails.some(mail => mail.isChecked);
        this.setState({isShowTrash});
    }

    onRemove = () => {
        const toBeRemovedPrmsAll = this.state.mails.reduce((acc, currMail)=>{
            if(currMail.isChecked) acc.push(mailService.remove(currMail.id));
            return acc;
        }, []);
        Promise.all(toBeRemovedPrmsAll).then(() => {
            this.getMailsForDisplay(this.state.criteria);
        })
    }

    onEdit = (mailId) => {
        mailService.getMailById(mailId)
            .then(mail => this.setState({ isEditNewMail: true, mail }));
    }

    onEditNewMail = () => {
        this.setState({ isEditNewMail: true, mail: null });
    }

    onCloseEditor = () => {
        this.setState({ isEditNewMail: false })
    }

    onSort = (sortBy) => {
        const {criteria} = this.state;
        mailService.setSortBy(sortBy);
        this.getMailsForDisplay(criteria);
    }

    render() {
        const { isEditNewMail, mail, mails, type, isShowTrash } = this.state;
        return (
            <React.Fragment>
                <div className="main-container flex">
                    <MailNav onEditNewMail={this.onEditNewMail} />
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <Route
                        exact path='/mail'
                        render={(props) => (
                            <Wall {...props} 
                                mails={mails} 
                                type={type} 
                                onToggleCheckAll={this.onToggleCheckAll} 
                                onSort={this.onSort}
                                onMailSetChecked={this.onMailSetChecked}
                                isShowTrash={isShowTrash}
                                onRemove={this.onRemove}/>
                        )} />
                    {isEditNewMail && (
                        <FloatingMailEditor onCloseEditor={this.onCloseEditor} mail={mail} />
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export const DashBoard = withRouter(_DashBoard)