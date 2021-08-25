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

    render() {
        const { showPallete } = this.state
        return (
            <section>
                {showPallete && <div className="color-pallete"></div>}
                <span span onMouseEnter={this.toggleColorPallete} onMouseLeave={this.toggleColorPallete} className="material-icons-outlined" >
                    color_lens
                </span>
            </section>
        )
    }
}
