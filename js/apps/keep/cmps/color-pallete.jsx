export function ColorPallete({ hideColorPallete, onChangeColor }) {
    const colors = ['#FFF','#DFFF00', '#FFBF00', '#FF7F50', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF']
    return <div onMouseLeave={hideColorPallete} className="color-pallete flex">{colors.map((color, idx) => <div onClick={() => { onChangeColor(color) }} key={idx} className="color clickable" style={{ backgroundColor: color }}></div>)}</div>
}