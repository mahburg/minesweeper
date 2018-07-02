import React, { Component } from 'react';

import './Cell.css';

import flag from '../../imgs/flag.svg';
import mine from '../../imgs/mine.svg';

class Cell extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }

    flipSel(){
        this.setState({ selected: !this.state.selected });
    }

    render(){
        let { selected } = this.state;
        let { flagged, sel, value } = this.props;
        let dispImg;

        if (flagged){
            dispImg = flag;
        } else {
            dispImg = mine;
        }
        return(
            <div className={sel? 'clicked-cell cell' :selected ? "sel-cell blank-cell cell":'blank-cell cell'}
                onClick={()=>this.props.select(this.props.index)}
                onContextMenu={(e)=>this.props.flagCell(e, this.props.index)}
            >
                {
                    flagged || sel
                    ?
                    flagged?<img src={dispImg} alt=""/>: value ? <h1 className={`num_${value}`} >{value}</h1> : null
                    :
                    null
                }
            </div>
        )
    }
}

export default Cell;