import React from "react";
import Stat_block from "./stat_block";


export default class Monster_Entry extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
      damage:'',
      heal:'',
      HpCurrent: props.data.hp,
      HpMax:props.data.hp,
      color:"#000"
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
      }
    checkColor(){
       let procent= parseFloat(this.state.HpCurrent)/parseFloat(this.state.HpMax)
       if(procent>0.80){
        this.setState({color:"#0E7395"})
       }
       if(procent<=0.80&procent>0.60){
        this.setState({color:"#06D6A0"})
       }
       if(procent<=0.60&procent>0.40){
        this.setState({color:"#FFD166"})
       }
       if(procent<=0.40&procent>0.2){
        this.setState({color:"#F0852D"})
       }
       if(procent<=0.2){
        this.setState({color:"#CE123E"})
       }
       if(procent<=0){
        this.setState({color:"#fff"})
       }
       if(procent>=1){
        this.setState({color:"#000"})
       }
    }

    async deal(damage){
        let HpCurrent=this.state.HpCurrent
        await this.setState({HpCurrent:HpCurrent-damage});
        this.checkColor()
        }

    async heal(ammount){
        let HpCurrent=this.state.HpCurrent
        await this.setState({HpCurrent:parseInt(HpCurrent, 10)+parseInt(ammount||0)});
        this.checkColor()
        }

    render() {
      
      return (
        <div className="d-flex flex-row" >
            <button type="submit" onClick={this.props.delete} className="col-1 btn btn-danger bi bi-x"></button>
           
            
           <div className="col-3 border border-end-0 text-center pt-1">
           {this.props.data.Statdata?
           <a role="button" className="link-primary" data-bs-toggle="modal" data-bs-target={"#b"+this.props.data.id.toString()}>{this.props.data.name}</a>
           :this.props.data.name}

           </div>

           <div className="col-1 border border-end-0 text-info">
           {this.props.data.ac}AC
          </div>
             <div className="col-2 border border-end-0 text-danger">
             {this.state.HpCurrent}HP/{this.state.HpMax}HP
          </div>
            <input type="text" onChange={this.handleChange} name="damage" placeholder="Dmg" className="col-1"/>
            <button type="submit" value="Deal" className="col-1 btn btn-warning bi bi-hammer" onClick={()=>{this.deal(this.state.damage)}} ></button>
            <input type="text" onChange={this.handleChange} name="heal" placeholder="Heal" className="col-1"/>
            <button type="submit" className="btn btn-success col-1 bi bi-plus-lg" onClick={()=>{this.heal(this.state.heal)}} ></button>
            <div className="col-1 rounded" style={{backgroundColor: this.state.color}}></div>
          
          
          
          
            <div className="modal fade" id={"b"+this.props.data.id.toString()}  tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <Stat_block statData={this.props.data.Statdata||null}/>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
          
          
          
          </div>
      );
    }
  }