import React, { useEffect, useState } from "react";
import Square from "./Square";
import Swal from "sweetalert2";

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setXTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const WinningPossibilities = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for(let result of WinningPossibilities) {
            const [a, b, c] = result;
            if (state[a] && state[a] === state[b] && state[a] === state[c]) {
                console.log("Winner detected:", state[a]);
                setWinner(state[a]);
                return;
            }
        }
        
        if (state.every(square => square !== null)) {
            console.log("It's a draw!");
            setWinner("draw");
        }
    }, [state]); 

    const handleClicks = (index) => {
        if (state[index] === null && !winner) {
            const newState = [...state];
            newState[index] = isXTurn ? 'X':'O';
            console.log("New state:", newState);
            setState(newState);
            setXTurn(!isXTurn);
        }
    }

    const handlePlayAgain = () => {
        setState(Array(9).fill(null));
        setWinner(null);
    }
    useEffect(() => {
        if (winner) {
            let message = "";
            if (winner === "draw") {
                message = "It's a draw!";
            } else {
                message = `Player ${winner} wins!`;
            }

            Swal.fire({
                title: message,
                showCancelButton: true,
                confirmButtonText: "Play Again",
                cancelButtonText: "Close",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePlayAgain();
                }
            });
        }
    }, [winner]);
    return (
        <div className="Board-container">
            <div className="board-row">
                <Square onClick={() => handleClicks(0)} value={state[0]} />
                <Square onClick={() => handleClicks(1)} value={state[1]} />
                <Square onClick={() => handleClicks(2)} value={state[2]} />
            </div>
            <div className="board-row">
                <Square onClick={() => handleClicks(3)} value={state[3]} />
                <Square onClick={() => handleClicks(4)} value={state[4]} />
                <Square onClick={() => handleClicks(5)} value={state[5]} />
            </div>
            <div className="board-row">
                <Square onClick={() => handleClicks(6)} value={state[6]} />
                <Square onClick={() => handleClicks(7)} value={state[7]} />
                <Square onClick={() => handleClicks(8)} value={state[8]} />
            </div>
        </div>
    )
}

export default Board;
