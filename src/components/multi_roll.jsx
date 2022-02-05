import React, { Component } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import RollEntry from './roll_entry'

class multi_roll extends Component {
  constructor(props) {
    super(props);
      this.state = { 
      };
    }
    render() {
        return (
            <div className=" border-start border-dark ps-3 pe-3 col-md-6 col-sm-12" style={this.props.state.HideMultiRoll?{display:"none"}:{}}>
            
            <div className="col-12 fs-3">Multi Roll
             <button onClick={()=>this.props.hide(true)} className='ms-1 btn btn-outline-info fst-italic fs-6'>Hide&gt;</button>
             </div>
            
            <div className="col-12">
  
            <div onChange={this.props.onChangeValue}>
  
            <input type="radio" className="option-input radio" value="Advatage" name="Advatage" />Advatage
            <input type="radio" className="option-input radio" value="Disadvantage" name="Advatage" />Disadvantage
            <input type="radio" className="option-input radio" value="None" name="Advatage" />None
  
            </div>
              
            </div>
            <div className="col-12 flex-row d-flex">
            <input type="text" placeholder="modifier" name="modifier" onChange={this.props.handleChange} className="input-group-text input-z-index d-inline col-2"/>
                  <div className="col-4">
                      <Multiselect
                      ref={this.props.multiselectRef}
                      options={this.props.options}
                      displayValue="label"
                      closeOnSelect={false}
                      showCheckbox
                      style={{
                          chips: {
                            display:"none"
                          },
                          inputField: { 
                              width:"100%"
                          }
                        }}
                      showArrow
                      />
                  </div>
                  <button type="button" onClick={()=>{this.props.multiRoll(20,this.props.state,this.props.handler)}} className="btn btn-success align-baseline col-1" >d20</button>
                  <button type="button" onClick={()=>{this.props.multiRoll(12,this.props.state,this.props.handler)}} className="btn btn-success align-baseline col-1" >d12</button>
                  <button type="button" onClick={()=>{this.props.multiRoll(10,this.props.state,this.props.handler)}} className="btn btn-success align-baseline col-1" >d10</button>
                  <button type="button" onClick={()=>{this.props.multiRoll(8,this.props.state,this.props.handler)}} className="btn btn-success align-baseline col-1" >d8</button>
                  <button type="button" onClick={()=>{this.props.multiRoll(6,this.props.state,this.props.handler)}} className="btn btn-success align-baseline col-1" >d6</button>
                  <button type="button" onClick={()=>{this.props.multiRoll(4,this.props.state,this.props.handler)}} className="btn btn-success align-baseline col-1" >d4</button>
                  </div>
                  <div className="mt-3"></div>
                  {this.props.EnemyList.map((item,index)=>
                    <RollEntry key={item.id} data={item} roll={this.props.roll}/>
                  )}
            </div>
        );
    }
}

export default multi_roll;