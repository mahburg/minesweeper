import React, { Component } from 'react';

import Cell from '../Cell/Cell';

import { genBoard, chainReact } from '../../utils';

import './Board.css';

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameStarted: false,
            selected: [],
            flagged: [],
            game: [],
            mines: []
        }
        this.selectCell = this.selectCell.bind(this);
        this.flagCell = this.flagCell.bind(this);
    }

    startGame(cb) {
        let board = genBoard(9,9,10);
        let mines = board.filter((c)=>c===9);
        this.setState({ game: board, gameStarted: true, mines }, ()=>cb());
    }

    selectCell(i){
        // TODO: ignore if flagged
        // if 0 chain react
        let {gameStarted} = this.state;
        if (!gameStarted){
            this.startGame(()=>this.processSelected(i))
        } else {
            this.processSelected(i)
        }
    }

    processSelected(i){
        let {flagged, game, selected} = this.state;
        if (!flagged.includes(i)){
            if (game[i] === 9){
                alert('you lose')
            } else if (game[i] === 0 ){
                this.processZero(i);
            } else {
                let temp = selected.slice();
                if (!temp.includes(i)){
                    temp.push(i)
                }
                this.setState({ selected: temp }, ()=>{
                    this.checkGameStatus()
                });
            }
        }
    }

    processZero(i){
        let { game, selected } = this.state;
        let x = chainReact(i, game);
        let out = x.concat(selected).filter((c,i,a)=>!a.slice(i+1).includes(c))
        this.setState({ selected: out });
    }

    flagCell(e,i){
        e.preventDefault();
        let { flagged, selected } = this.state;
        let temp = []
        if(!selected.includes(i)){
            if (flagged.includes(i)){
                temp = flagged.filter(c=>c!==i)
            } else {
                temp = flagged.slice()
                temp.push(i);
            }
            this.setState({ flagged: temp  });
        }
    }

    checkGameStatus(){
        console.log('checking for win')
        let { game, mines, selected} = this.state;
        let b = game.length;
        let m = mines.length;
        let s = selected.length;
        if ( b === (m + s) ){
            alert('you win')
        }
    }

    render(){
        let {selected, flagged, game} = this.state;
        let boardCells = new Array(81).fill(0).map((c,i)=>
        <Cell
            key={i}
            index={i}
            value={game[i]}
            select={this.selectCell}
            flagCell={this.flagCell}
            sel={selected.includes(i)}
            // sel={true}
            flagged={flagged.includes(i)}
        />)
        return(
            <div className="board" >
                {boardCells}
            </div>
        )
    }
}

export default Board;