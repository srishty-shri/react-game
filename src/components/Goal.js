import React from 'react';
import {GameContext} from '../App';
import {BOX_SIZE} from '../utils/constants';

export default function Goal() {
    const {goalPos,setGoalPos} = React.useContext(GameContext);
    return <div style={{position : 'absolute', border : '1px solid black', top : goalPos.y, left : goalPos.x, width : BOX_SIZE, height : BOX_SIZE}} >Goal</div>;
}