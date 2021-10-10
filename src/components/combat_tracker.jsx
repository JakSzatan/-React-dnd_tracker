import React from "react";
import MonsterEntry from "./monster_entry";
import Multiselect from 'multiselect-react-dropdown';
import RollEntry from './roll_entry'
import SaveModal  from "./savemodal";
import Rolling_tray from "./rolling_tray";

export default class CombatTracker extends React.Component {


    constructor(props) {
      super(props);
        this.state = {name: '',
        ac:'',hp:'',
        EnemyList:[],
        modifier:0,
        presetList:[],
        Advatage:false,
        Disadvantage:false,
        MonserList:[]
    };
      this.handleChange = this.handleChange.bind(this);
      this.Save =this.Save.bind(this)
      this.roll =this.roll.bind(this)
      this.onChangeValue = this.onChangeValue.bind(this);
      this.multiselectRef = React.createRef();
      this.state.presetList=JSON.parse(localStorage.getItem('presetList'))||[];
    }

    componentDidMount(){
      fetch("https://www.dnd5eapi.co/api/monsters/")
          .then(res => res.json())
          .then((result) => {
            this.setState({MonserList:result.results})
              })

    }


    Save(name){
      ///Save to local sorage a state of encounter as a preset
      var presetlist=JSON.parse(localStorage.getItem('presetList'))||[];
      if (!presetlist.includes(name)) {
        if (!this.state.EnemyList) {
          console.log(this.state.EnemyList)
        }
        else{
        localStorage.setItem(name,JSON.stringify(this.state.EnemyList));
        presetlist.push(name);
        localStorage.setItem("presetList",JSON.stringify(presetlist));
        this.setState({presetList:presetlist})}
      }
      else{
        if (window.confirm("Preset with this name already exist, do you want to override it?")) {
          localStorage.setItem(name,JSON.stringify(this.state.EnemyList))
        }
      }
    }

    Load(name){
      //loads preset from local storage
      this.setState({EnemyList:JSON.parse(localStorage.getItem(name))})
      this.multiselectRef.current.resetSelectedValues();
    }

    multiRoll(dice){
      ///Rolls a random value for selected items
      let arraySel = this.multiselectRef.current.getSelectedItems();
      let resultarray = arraySel.map(a => a.value.item);
      var array = [...this.state.EnemyList];
      if (this.state.Advatage) {
        resultarray.map(a=>a.rolledVal=(Math.max(Math.floor(Math.random() * (dice - 1 + 1)) + 1,Math.floor(Math.random() * (dice - 1 + 1)) + 1)+parseFloat(this.state.modifier)));
      }
      else if (this.state.Disadvantage) {
        resultarray.map(a=>a.rolledVal=(Math.min(Math.floor(Math.random() * (dice - 1 + 1)) + 1,Math.floor(Math.random() * (dice - 1 + 1)) + 1)+parseFloat(this.state.modifier)));
      }
      else{
        resultarray.map(a=>a.rolledVal=(Math.floor(Math.random() * (dice - 1 + 1)) + 1)+parseFloat(this.state.modifier));
      }
      this.setState({EnemyList:array})
    }

    roll(item,dice){
      let Result= Math.floor(Math.random() * (dice - 1 + 1)) + 1;
      let Result2= Math.floor(Math.random() * (dice - 1 + 1)) + 1;

      let tmpArray=[...this.state.EnemyList]
      let RollingMonster=tmpArray.find(x => x.id === item.props.data.id)
      if (this.state.Advatage) {
        RollingMonster.rolledVal=Math.max(Result,Result2);
      }
      else if (this.state.Disadvantage) {
        RollingMonster.rolledVal=Math.min(Result,Result2);
      }
      else{
        RollingMonster.rolledVal=Result
      }
      this.setState({EnemyList:tmpArray})
   }
    delete(index){
      var array = [...this.state.EnemyList];
      array.splice(index, 1);
      this.setState({EnemyList: array});
      this.multiselectRef.current.resetSelectedValues();
    }

    add(name,hp,ac){
      //Adds new item to a list
      var newelement={id:Date.now(),"name":name,"hp":hp,"ac":ac,rolledVal:null};
      this.setState({EnemyList: [...this.state.EnemyList, newelement]})
      this.multiselectRef.current.resetSelectedValues();
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    onChangeValue(event) {

      if (event.target.value==="Advatage") {
        this.setState({Advatage:true,Disadvantage:false})
      }
      else if(event.target.value==="Disadvantage"){
        this.setState({Advatage:false,Disadvantage:true})
      }
      else{
        this.setState({Advatage:false,Disadvantage:false})
      }
      
  
    }
  //  SelectAll(array){
  //   let old = localStorage.getItem('Selected');
  //   let intersection = array.filter(x => !old.includes(x));
  //   localStorage.setItem('Selected', array);
  //   console.log(intersection)
  //   }
  //   DeslectAll(array){
  //   let old = localStorage.getItem('Selected');
  //   let intersection = array.filter(x => !old.includes(x));
  //   localStorage.setItem('Selected', array);
  //   console.log(intersection)
  //   }
    

    render() {

        const options = [];

        this.state.EnemyList.map((item,index)=>
            options.push({ label: item.name, value:{item},key:Date.now()})
            )
      return (

        <div className="flex-row d-flex flex-wrap">

          <div className="flex-row col-6 ps-3 pe-3 mt-5">
            <input type="text" list="monstername" placeholder="name" name="name" onChange={this.handleChange} className="input-group-text input-z-index d-inline col-4"/>
            

            <datalist id="monstername">
              {this.state.MonserList.map(a=><option key={a.name} value={a.name}/>)}
            </datalist>


            <input type="text" placeholder="AC" name="ac"onChange={this.handleChange} className="input-group-text input-z-index d-inline col-1"/>
            <input type="text" placeholder="HP" name="hp" onChange={this.handleChange} className="input-group-text input-z-index d-inline col-1"/>
            <button type="button" onClick={()=>this.add(this.state.name,this.state.hp,this.state.ac)} className="btn btn-success align-baseline col-1 bi bi-plus" ></button>
            <div className="mt-2">
            {this.state.EnemyList.map((item,index)=>
                <MonsterEntry key={item.id} data={item} delete={()=>this.delete(index)}/>
            )}
            </div>
          </div>
          <div className="col-6 border-start border-dark ps-3 pe-3">
          <div className="col-12 fs-3">Multi Roll</div>
          <div className="col-12">

          <div onChange={this.onChangeValue}>

          <input type="radio" className="option-input radio" value="Advatage" name="Advatage" />Advatage

          <input type="radio" className="option-input radio" value="Disadvantage" name="Advatage" />Disadvantage

          <input type="radio" className="option-input radio" value="None" name="Advatage" />None

          </div>
            
          </div>
          <div className="col-12 flex-row d-flex">
          <input type="text" placeholder="modifier" name="modifier" onChange={this.handleChange} className="input-group-text input-z-index d-inline col-2"/>
                <div className="col-4">
                    <Multiselect
                    ref={this.multiselectRef}
                    options={options}
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
                <button type="button" onClick={()=>{this.multiRoll(20)}} className="btn btn-success align-baseline col-1" >d20</button>
                <button type="button" onClick={()=>{this.multiRoll(12)}} className="btn btn-success align-baseline col-1" >d12</button>
                <button type="button" onClick={()=>{this.multiRoll(10)}} className="btn btn-success align-baseline col-1" >d10</button>
                <button type="button" onClick={()=>{this.multiRoll(8)}} className="btn btn-success align-baseline col-1" >d8</button>
                <button type="button" onClick={()=>{this.multiRoll(6)}} className="btn btn-success align-baseline col-1" >d6</button>
                <button type="button" onClick={()=>{this.multiRoll(4)}} className="btn btn-success align-baseline col-1" >d4</button>
                </div>
                <div className="mt-3"></div>
                {this.state.EnemyList.map((item,index)=>
                  <RollEntry key={item.id} data={item} roll={this.roll}/>
                )}
          </div>
                  <SaveModal Save={this.Save}/>

        {this.state.presetList.map((item,index)=>
                  <button key={"a"+index} className="mt-5 btn btn-info text-center" onClick={()=>this.Load(item)}>
                          {item}
                   </button>
                )}
                <Rolling_tray/>
        </div>
      );
    }
  }