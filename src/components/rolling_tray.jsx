import React from "react";
import { Modal } from "bootstrap";

export default class rolling_tray extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
      Dice:20,
      Modifier:0,
      Amount:1,
      ResultArray:JSON.parse(sessionStorage.getItem("RollHistory"))||[]
    }
      this.handleChange = this.handleChange.bind(this);
      this.roll = this.roll.bind(this);
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
      }

    roll(){
      let HistoryArray=JSON.parse(sessionStorage.getItem("RollHistory"))||[];
      let ThisRoll=[]
      for (let index = 0; index < this.state.Amount; index++) {
        let Result= Math.floor(Math.random() * (this.state.Dice - 1 + 1)) + 1;
        ThisRoll.push(Result+parseInt(this.state.Modifier))
      }
      HistoryArray.unshift(ThisRoll)
      sessionStorage.setItem("RollHistory", JSON.stringify(HistoryArray));
      this.setState({ResultArray:HistoryArray})
    }

    render() {

      function add(accumulator, a) {
        return accumulator + a;
    }
      return (
        <div>
            <button type="button" className="btn btn-success position-absolute bottom-0 end-50" data-bs-toggle="modal" data-bs-target="#staticBackdropRoll">
            Open Roll Tray
            </button>
            <div className="modal fade" id="staticBackdropRoll" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title" id="staticBackdropLabel">Rolling tray</h1>
                </div>

                <div className="modal-header">

                <div>
                  <select name="Dice" onChange={this.handleChange}>
                      <option value="20">D20</option>
                      <option value="12">D12</option>
                      <option value="10">D10</option>
                      <option value="8">D8</option>
                      <option value="6">D6</option>
                      <option value="4">D4</option>
                  </select>
                  X
                  <input type="number" name="Amount" min="0" size="10" onChange={this.handleChange} value={this.state.Amount}/>
                  +
                  <input type="number" name="Modifier" size="10" onChange={this.handleChange} value={this.state.Modifier} />
                  <button className="btn btn-primary ms-2" onClick={this.roll}>Roll</button>
                  </div>
                </div>

                <div className="modal-body">
                  <div>
                    {this.state.ResultArray.map((item,index)=><div key={"tt"+index} className="d-flex flex-row">
                      <h2 className="pt-1">✦</h2>
                      {item.map((item,index)=><div key={"t"+index} className="TrayRollResult">{item}</div>)}
                      {item.length>1?<div className="TraySumResult">{item.reduce(add,0)}</div>:""}
                    </div>)}
                  </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }