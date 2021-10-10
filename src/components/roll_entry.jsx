import React from "react";

export default class roll_entry extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
      modify: 0
    }
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let val = parseFloat(event.target.value)
        this.setState({modify: val});
      }
 

    render() {
      
      return (
        <div className="row">
                <div className="col-1 text-center border pt-1">{this.props.data.rolledVal+(this.state.modify||0)}</div>
                    <div className="col-3 border border-end-0 text-center pt-1">
                        {this.props.data.name}
                    </div>
                <input type="text" name="mod" placeholder="Modfier" onChange={this.handleChange} className="input-group-text input-z-index d-inline col-2"/>
                <button type="button" onClick={()=>this.props.roll(this,20)} className="btn btn-success align-baseline col-1" >d20</button>
                <button type="button" onClick={()=>this.props.roll(this,12)} className="btn btn-success align-baseline col-1" >d12</button>
                <button type="button" onClick={()=>this.props.roll(this,10)} className="btn btn-success align-baseline col-1" >d10</button>
                <button type="button" onClick={()=>this.props.roll(this,8)} className="btn btn-success align-baseline col-1" >d8</button>
                <button type="button" onClick={()=>this.props.roll(this,6)} className="btn btn-success align-baseline col-1" >d6</button>
                <button type="button" onClick={()=>this.props.roll(this,4)} className="btn btn-success align-baseline col-1" >d4</button>
                
                </div>
      );
    }
  }