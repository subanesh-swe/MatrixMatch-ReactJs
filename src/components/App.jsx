import { useState } from 'react'

import '../../public/stylesheets/App.css'
import AppInfo from './AppInfo';
import Cell from './Cell';

export default function App() {
    const maxPlayer = 2;
    const [playerId, setPlayerId] = useState(1);
    const [result, setResult] = useState("Player 1");
    // Create a 10x10 matrix using nested arrays
    //const [matrix, setMatrix] = useState( Array.from({ length: 10 }, () => Array.from({ length: 10 }), () => Array.from({ length: 1 })) );
    const [matrix, setMatrix] = useState(() =>
        Array.from({ length: 10 }, () => Array.from({ length: 10 }).fill(0))
    );

    const checkWin = (matrix, row, col) => {
        const directions = [
            { dx: 1, dy: 0 },   // Right
            { dx: -1, dy: 0 },  // Left
            { dx: 0, dy: 1 },   // Down
            { dx: 0, dy: -1 },  // Up
            { dx: 1, dy: 1 },   // Diagonal (bottom-right)
            { dx: -1, dy: 1 },  // Diagonal (bottom-left)
            { dx: 1, dy: -1 },  // Diagonal (top-right)
            { dx: -1, dy: -1 }, // Diagonal (top-left)
        ];

        const value = matrix[row][col];

        for (const dir of directions) {
            let count = 1;
            let r = row + dir.dy;
            let c = col + dir.dx;

            // Check in both directions for each direction
            for (let i = 0; i < 2; i++) {
                while (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length && matrix[r][c] === value) {
                    count++;
                    r += dir.dy;
                    c += dir.dx;
                }

                // Reverse direction
                dir.dx *= -1;
                dir.dy *= -1;
                r = row + dir.dy;
                c = col + dir.dx;
            }

            if (count >= 4) {
                return true;
            }
        }

        return false;
    }

    const handleInput = (cellId) => {
        try {
            let currPlayerId = playerId;
            let nextPlayerId = playerId;
            setPlayerId((pre) => {
                if (pre == maxPlayer) {
                    nextPlayerId = 1;
                    return nextPlayerId;
                }
                nextPlayerId = pre + 1;
                return nextPlayerId;

            })
            const cellIdArr = cellId.split(",").map(number => parseInt(number));
            setMatrix((pre) => {
                let mat = pre;
                mat[cellIdArr[0]][cellIdArr[1]] = currPlayerId;
                return mat;
            });

            setResult((pre) => {
                let currRes = "";
                let currWinState = checkWin(matrix, cellIdArr[0], cellIdArr[1]);
                if (currWinState) {
                    currRes = `Player ${currPlayerId} Win!`;
                }
                else {
                    currRes = `Player ${nextPlayerId}`;
                }
                //if (e.target.name === '(') {
                //    if (pre === '' || pre.slice(-1) === '(') {
                //        currRes = pre + '(';
                //    } else if (!isNaN(pre.slice(-1)) || pre.slice(-1) === ')') {
                //        currRes = pre + '*' + '(';
                //    } else {
                //        currRes = pre + '(';
                //    }
                //} else {
                //    currRes = pre.concat(e.target.name);
                //}
                return currRes;
                //return pre.concat(e.target.name);
            });
        }
        catch (err) {
            console.log(`handleInput Error!, cellId: ${cellId}`);
        }
    }

    return (
        <div className='app'>
            <AppInfo />
            <div className='container'>
                <h1>Matrix Match: Connect Four Challenge</h1>
                {/*<form onSubmit={(e) => { e.preventDefault(); calcResult(); }}>*/}
                {/*    <input type='text' value={result} onChange={(e) => setResult(e.target.value)} />*/}
                {/*</form>*/}
                <div className="matrixStatus">{result}</div>
                <div className="matrix">
                    {/* Use nested map to render each row and cell */}
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, cellIndex) => (
                                <Cell
                                    key={cellIndex}
                                    cellId={`${rowIndex},${cellIndex}`}
                                    //cellId={rowIndex.toString() + "," + cellIndex.toString()}
                                    cellVal={matrix[rowIndex][cellIndex]}
                                    handleInput={handleInput}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
