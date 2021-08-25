export class NoteAction extends React.Component {
    state = {
        showPallete: null
    }

    componentDidMount() {
        this.setState({ showPallete: false })
    }

    toggleColorPallete = () => {
        this.setState(prevState => ({ showPallete: !prevState.showPallete }))
    }

    onPinNote = () => {
        this.setState(prevState => ({ isPinned: !prevState.isPinned }))
    }

    render() {
        const { showPallete } = this.state
        return (
            <section>
                <span onClick={this.onPinNote} className="material-icons-outlined">
                    push_pin
                </span>
                {showPallete && <div className="color-pallete"></div>}
                <span span onMouseEnter={this.toggleColorPallete} onMouseLeave={this.toggleColorPallete} className="material-icons-outlined" >
                    color_lens
                </span>
            </section>
        )
    }
}
