import React from 'react';
import {BOX_SIZE} from '../utils/constants';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position : absolute;
    border : 1px solid black;
    top : ${props => props.y}px; 
    left : ${props => props.x}px;
    width : ${BOX_SIZE}px;
    height : ${BOX_SIZE}px;
    background-color : ${props => props.type === "player" ? '#fff' : 'green'};
`;

function Box({type, position}) {
    return <StyledDiv type={type} x={position.x} y={position.y} >{type}</StyledDiv>;
}
//Returning a memozied component back because we would not want too many re-render for Goal Box
export default React.memo(Box);