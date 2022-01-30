import React from "react";
import MonsterEntry from "./monster_entry";
import SaveModal  from "./savemodal";
import Rolling_tray from "./rolling_tray";
import Multi_roll from "./multi_roll";
import Delete_modal from"./delete_modal"
export default class CombatTracker extends React.Component {


    constructor(props) {
      super(props);
        this.state = {name: '',
        ac:'',hp:'',
        EnemyList:[],
        modifier:0,
        presetList:JSON.parse(localStorage.getItem('presetList'))||[],
        Advatage:false,
        Disadvantage:false,
        MonserList:[]
    };
      this.handler=this.handler.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.Save =this.Save.bind(this)
      this.roll =this.roll.bind(this)
      this.onChangeValue = this.onChangeValue.bind(this);
      this.multiselectRef = React.createRef();
      this.DeletePreset =this.DeletePreset.bind(this)
      this.addAPI=this.addAPI.bind(this)
    }

    componentDidMount(){
      fetch("https://www.dnd5eapi.co/api/monsters/")
          .then(res => res.json())
          .then((result) => {
            this.setState({MonserList:result.results})
              })
    }

    DeletePreset(name){
      //delete item from preset list
    let NewPresetList=JSON.parse(localStorage.getItem('presetList'))||[]
    NewPresetList.splice(NewPresetList.indexOf(name),1)///pop
    localStorage.setItem("presetList",JSON.stringify(NewPresetList))
    localStorage.removeItem(name)
    this.setState({presetList:NewPresetList})
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

    multiRoll(dice,state,handler){
      ///Rolls a random value for selected items
      let arraySel = this.multiselectRef.current.getSelectedItems();
      let resultarray = arraySel.map(a => a.value.item);
      var array = [...state.EnemyList];
      if (state.Advatage) {
        resultarray.map(a=>a.rolledVal=(Math.max(Math.floor(Math.random() * (dice - 1 + 1)) + 1,Math.floor(Math.random() * (dice - 1 + 1)) + 1)+parseFloat(this.state.modifier)));
      }
      else if (state.Disadvantage) {
        resultarray.map(a=>a.rolledVal=(Math.min(Math.floor(Math.random() * (dice - 1 + 1)) + 1,Math.floor(Math.random() * (dice - 1 + 1)) + 1)+parseFloat(this.state.modifier)));
      }
      else{
        resultarray.map(a=>a.rolledVal=(Math.floor(Math.random() * (dice - 1 + 1)) + 1)+parseFloat(this.state.modifier));
      }
      handler(array)
    }
    handler(array){
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
    addAPI(MonsterName){
      //Adds new item to a list from Api
     if (!MonsterName) return

      let target=this.state.MonserList.find(({ name }) => name === MonsterName );
      if(!target) return

      fetch("https://www.dnd5eapi.co"+target.url)
      .then(res => res.json())
      .then((result) => {

      var newelement={id:Date.now(),
        "name":MonsterName,
        "hp":result.hit_points,
        "ac":result.armor_class,
        rolledVal:null,
        data:result}
      this.setState({EnemyList: [...this.state.EnemyList, newelement]})
      this.multiselectRef.current.resetSelectedValues()
    
    })
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
            <button onClick={()=>this.add(this.state.name,this.state.hp,this.state.ac)} className="btn btn-success align-baseline col-1 bi bi-plus" ></button>
            <button onClick={(e)=>this.addAPI(this.state.name)} className="btn btn-primary align-baseline">Add from Book</button>
            <div className="mt-2">

            {this.state.EnemyList.map((item,index)=>
                <MonsterEntry key={item.id} data={item} delete={()=>this.delete(index)}/>
            )}
            </div>

          </div>

              <Multi_roll
              onChangeValue={this.onChangeValue}
              handleChange={this.handleChange}
              options={options}
              EnemyList={this.state.EnemyList}
              multiRoll={this.multiRoll}
              multiselectRef={this.multiselectRef}
              roll={this.roll}
              state={this.state}
              handler={this.handler}
                 />

                  <SaveModal Save={this.Save}/>
                  <Delete_modal PresetList={this.state.presetList} DeletePreset={this.DeletePreset}/>
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