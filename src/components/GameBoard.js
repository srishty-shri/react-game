import React from 'react';
import styled from 'styled-components';
import {BOARD_WIDTH, BOX_SIZE, BOARD_HEIGHT, STEP_SIZE, KEY_DOWN, KEY_LEFT, KEY_UP, KEY_RIGHT} from '../utils/constants';
import Box from './Box';
import {GameContext} from '../App';

const Board = styled.div`
    width : ${BOARD_WIDTH}px;
    height : ${BOARD_HEIGHT}px;
    background-color : #61dafb;
`;

export default function GameBoard() {
    const {setPlayerPos, setPrevState, playerPos, goalPos} = React.useContext(GameContext);
    /**
     * Based on users navigation key press, we change the player position
     * any other key press would not lead to any change. 
     */
    const handleUserKeyPress = React.useCallback((e) => {
        const {keyCode} = e;
        /**
         * keeping these checks to only do any postion change based on 
         * up,down,left,right nav
         */
        if([KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT].includes(keyCode)) {
            let change_x = 0;
            let change_y = 0;
            switch(keyCode) {
                case KEY_UP : {
                    change_y = -1 * STEP_SIZE;
                    break;
                }
                case KEY_DOWN : { 
                    change_y = STEP_SIZE;
                    break;
                }
                case KEY_LEFT : {
                    change_x = -1 * STEP_SIZE;
                    break;
                }
                case KEY_RIGHT : {
                    change_x = STEP_SIZE;
                    break;
                }
                default : break;
            }
            /**
             * inBoardRange decides to change state or keep the previous state if player tries
             * to move outside of board.
             */
            setPlayerPos(state => {
                let next_x = state.x + change_x;
                let next_y = state.y + change_y;
                return inBoardRange(next_x,next_y) ? {x : next_x, y: next_y} : {x : state.x, y : state.y};
            });
            setPrevState(state => {
                let newState = [...state];
                let next_x = newState[newState.length-1].x + change_x;
                let next_y = newState[newState.length-1].y + change_y;
                if(inBoardRange(next_x,next_y)) {
                    newState.length === 6 && newState.shift();
                    newState.push({x : newState[newState.length-1].x + change_x, y : newState[newState.length-1].y + change_y});
                }
                return newState;
            });
        }  
      },[setPlayerPos,setPrevState]);
      /**
       * Attaching an event listener to the window on the mounting of this compoenent
       */
    React.useEffect(() => {
        window.addEventListener('keyup', handleUserKeyPress);
        return () => {
            window.removeEventListener('keyup', handleUserKeyPress);
        };
    },[handleUserKeyPress]);


    return <Board id="game_board">
            <Box type="player" position={playerPos} />
            <Box type="goal" position={goalPos}/>
        </Board>;
}


function inBoardRange(x,y) {
    return x>=0 && x<=BOARD_WIDTH && y>=0 && y<=BOARD_HEIGHT-BOX_SIZE;
}