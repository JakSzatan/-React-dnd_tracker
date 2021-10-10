import React from "react";
import CombatTracker from "./combat_tracker";
import "../customs/custom.css"



export default class Main extends React.Component {

  
    render() {
      return (
        <div className="container-fluid">
          <div className="display-1 text-center">Encounter Tracker</div>
          
          <CombatTracker/>
        </div>
      );
    }
  }