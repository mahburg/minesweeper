import React, { Component } from 'react';

import Cell from '../Cell/Cell';

import './Board.css';

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: [],
            flagged: [],
            mines: []
        }
        this.selectCell = this.selectCell.bind(this);
    }

    componentDidMount() {
        let temp = []
        for (let i = 0; i < 10; i++){
            let x = (~~(Math.random() * 81) + 0)
            if (!temp.includes(x)){
                temp.push(x)
            }
        }
        this.setState({ mines: temp });
    }

    selectCell(i){
        let temp = this.state.selected.slice();
        if (!temp.includes(i)){
            temp.push(i)
        }
        this.setState({ selected: temp });
    }

    render(){
        let {selected, flagged, mines} = this.state;
        let boardCells = new Array(81).fill(0).map((c,i)=>
        <Cell
            index={i}
            value={i+1}
            select={this.selectCell}
            sel={selected.includes(i)}
            flagged={mines.includes(i)}
        />)
        return(
            <div className="board" >
                {boardCells}
            </div>
        )
    }
}

export default Board;