export default function Selector(props) {
    return (
        <div style={props.style} className="selector">
            <div className="selector--container">
                <button>Mario</button>
                <button>Boo</button>
                <button>Toad</button>
            </div>
        </div>
    )
}