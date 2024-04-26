
export default function Cell({ cellId, cellVal, handleInput }) {
    const cellColourId = (cellVal === 1 ? "player1" : (cellVal === 2 ? "player2" : ""));
    return (
        <div className={"cell " + cellColourId } >
            {/*<button className='' name='=' onClick={calcResult}>=</button>*/}
            {/*<button className='superBtn' name='=' onClick={calcResult}>=</button>*/}
            {cellVal == 0 &&
                < button className='impBtn' name={cellId} onClick={(e) => { handleInput(e.target.name) }}></button>
            }
        </div>
    )
}