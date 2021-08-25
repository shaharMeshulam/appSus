export class NoteAction extends React.Component {
    state = {
        showPallete: null
    }

    colors = ['#DFFF00', '#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF']

    componentDidMount() {
        this.setState({ showPallete: false })
    }

    showColorPallete = () => {
        this.setState({ showPallete: true })
    }

    hideColorPallete = () => {
        this.setState({ showPallete: false })
    }

    onPinNote = () => {
        this.setState(prevState => ({ isPinned: !prevState.isPinned }))
    }

    render() {
        const { showPallete } = this.state
        return (
            <section className="note-action" onClick={(ev) => { ev.stopPropagation() }}>
                <span onClick={this.onPinNote} className="material-icons-outlined">
                    push_pin
                </span>
                {showPallete && <div onMouseLeave={this.hideColorPallete} className="color-pallete flex">{this.colors.map((color, idx) => <div key={idx} className="color" style={{ backgroundColor: color }}></div>)}</div>}
                <span span onMouseEnter={this.showColorPallete} className="material-icons-outlined" >
                    color_lens
                </span>
                <span className="material-icons-outlined">
                    delete
                </span>
            </section>
        )
    }
}
