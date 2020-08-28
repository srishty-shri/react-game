import React from 'react';

export default function GameBoard({children}) {
    return <div style={{position : "absolute", width : '100%', height : '50%', backgroundColor: "blue"}}>{children}</div>;
}