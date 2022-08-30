export default function Selector(props) {
    const buttonElements = props.characters.map(char => (
        <button key={char} onClick={() => props.handleInput(char)}>{char}</button>
    ))
    return (
        <div style={props.style} className="selector">
            <div className="selector--container">
            {buttonElements}
            </div>
        </div>
    )
}