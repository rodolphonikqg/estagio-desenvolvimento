const Greetings = (props) => {
    const { greetings } = props;
    return (
        <ul>
            {greetings.map((greeting, idx) => <span key={idx}>{greeting}</span>)}
        </ul>
    )
}

export default Greetings;