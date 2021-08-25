export class LongTxt extends React.Component {
    state = {
        showAllText: null
    }

    componentWillMount() {
        this.setState({ showAllText: false })
    }

    toggleShowText = () => {
        this.setState((prevState) => ({ showAllText: !prevState.showAllText }))
    }

    textToShow = () => {
        const { text } = this.props
        return (this.state.showAllText) ? text : text.slice(0, 100)
    }

    render() {
        const { showAllText } = this.state
        const { text } = this.props

        return (
            <p>{this.textToShow()} {text.length > 100 && <a onClick={this.toggleShowText}>{(showAllText) ? 'Less' : 'More'}</a>} </p>
        )
    }
}