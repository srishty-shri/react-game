import React from 'react';
import {GameContext} from '../App';
import styled from 'styled-components';

const Input = styled.input`
    margin : 10px;
`;
export default function ActionBoard() {
    const {setPlayerPos, prevState, setPrevState} = React.useContext(GameContext);
    /**
     * When a user does undo, we need to change the player position to the last position value
     * stored in our prevState array
     * 
     * Also, we need to pop the last element in prevState and setPrevState with the modified 
     * previous states array
     * 
     */
    const handleUndo = () => {
        let newStateArr = [...prevState];
        newStateArr.pop();
        setPlayerPos({
            x : newStateArr[newStateArr.length-1].x,
            y : newStateArr[newStateArr.length-1].y
        });
        setPrevState(newStateArr);
    }
    return <><Input type="button" onClick={handleUndo} value="Undo" disabled={prevState.length < 2}></Input></>;
}