import React from "react";

const Square = (props) => {
    const { value, onClick } = props;


    const squareStyle = {
        backgroundColor: "lightgray",
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid white",
        fontSize: "48px",
        color: value === 'X' ? "aqua" : "white",
        textShadow: value === 'X' || value === 'O' ? "0 0 5px rgba(0, 0, 255, 0.7), 0 0 10px rgba(0, 0, 255, 0.7)" : "none",
    };

    return (
        <div
            onClick={onClick}
            className="square"
            style={squareStyle}
        >
            {value}
        </div>
    )
}

export default Square;
