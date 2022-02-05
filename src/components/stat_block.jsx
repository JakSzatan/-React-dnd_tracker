import React from 'react';

const stat_block = (props) => {

    var speed=[]
    var damage_vulnerabilities=[]
    var damage_resistances=[]
    var damage_immunities=[]
    var condition_immunities=[]
    var proficiencies=[]
    var senses=[]
	var special_abilities=[]
	var actions=[]
	var legendary_actions=[]

    for (const [index, value] of Object.entries(props.statData.speed)) {
        speed.push(<span key={index}> {index}: {value}</span>)
      }
    for (const [index, value] of Object.entries(props.statData.damage_vulnerabilities)) {//
        damage_vulnerabilities.push(<span key={index}>{value}</span>)
      }
    for (const [index, value] of Object.entries(props.statData.damage_resistances)) {//
        damage_resistances.push(<span key={index}>{value}</span>)
      }
    for (const [index, value] of Object.entries(props.statData.damage_immunities)) {//
        damage_immunities.push(<span key={index}>{value}</span>)
      }

    props.statData.condition_immunities.forEach(element => {
                condition_immunities.push(<span key={element.index}>{element.name}, </span>)
            });
      
    props.statData.proficiencies.forEach(element => {
        proficiencies.push(<span key={element.proficiency.index}>{element.proficiency.name}+{element.value} </span>)
    });

    props.statData.special_abilities.forEach(element => {
        special_abilities.push(<div className="property-block" key={element.name}>
			<h4>{element.name}: </h4>
			<p style={{whiteSpace:"pre-wrap"}}>{element.desc}</p>
		</div>)
    });
	props.statData.actions.forEach(element => {
        actions.push(<div className="property-block" key={element.name}>
			<h4>{element.name}: </h4>
			<p style={{whiteSpace:"pre-wrap"}}>{element.desc}</p>
		</div>)});

	props.statData.legendary_actions.forEach(element => {
		legendary_actions.push(<div className="property-block" key={element.name}>
			<h4>{element.name}: </h4>
			<p style={{whiteSpace:"pre-wrap"}}>{element.desc}</p>
		</div>)});

    for (const [index, value] of Object.entries(props.statData.senses)) {///
        senses.push(<span key={index}> {index}: {value}</span>)
      }

    return (
        <div>

<div className="stat-block wide">
	<hr className="orange-border" />
	<div className="section-left">
		<div className="creature-heading">
			<h1>{props.statData.name}</h1>
			<h2>{props.statData.size} {props.statData.type}({props.statData.subtype}),{props.statData.alignment} </h2>
		</div> 
		<svg height="5" width="100%" className="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>
		<div className="top-stats">
			<div className="property-line first">
				<h4>Armor Class </h4>
				<p>{props.statData.armor_class}</p>
			</div>
			<div className="property-line">
				<h4>Hit Points</h4>
				<p> {props.statData.hit_points} ({props.statData.hit_dice} + {Math.floor((props.statData.constitution-10)/2)})</p>
			</div>
			<div className="property-line last">
				<h4>Speed:</h4>
				<p>{speed}</p>
			</div>
			<svg height="5" width="100%" className="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>
			<div className="abilities">
				<div className="ability-strength">
					<h4>STR</h4>
					<p>{props.statData.strength}(+{Math.floor((props.statData.strength-10)/2)})</p>
				</div> 
				<div className="ability-dexterity">
					<h4>DEX</h4>
					<p>{props.statData.dexterity}(+{Math.floor((props.statData.dexterity-10)/2)})</p>
				</div> 
				<div className="ability-constitution">
					<h4>CON</h4>
					<p>{props.statData.constitution}(+{Math.floor((props.statData.constitution-10)/2)})</p>
				</div> 
				<div className="ability-intelligence">
					<h4>INT</h4>
					<p>{props.statData.intelligence}(+{Math.floor((props.statData.intelligence-10)/2)})</p>
				</div> 
				<div className="ability-wisdom">
					<h4>WIS</h4>
					<p>{props.statData.wisdom}(+{Math.floor((props.statData.wisdom-10)/2)})</p>
				</div> 
				<div className="ability-charisma">
					<h4>CHA</h4>
					<p>{props.statData.charisma}(+{Math.floor((props.statData.charisma-10)/2)})</p>
				</div>
			</div> 
			<svg height="5" width="100%" className="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>
      <div className="property-line first">
				<h4>Proficiencies: </h4>
				<p>{proficiencies}</p>
			</div> 
			<div className="property-line">
				<h4>Damage Immunities: </h4>
				<p>{damage_immunities}</p>
			</div> 
            <div className="property-line">
				<h4>Damage Resistances: </h4>
				<p>{damage_resistances}</p>
			</div>
            <div className="property-line">
				<h4>Damage Vulnerabilities: </h4>
				<p>{damage_vulnerabilities}</p>
			</div>  
			<div className="property-line">
				<h4>Condition Immunities: </h4>
				<p>{condition_immunities}</p>
			</div> 
			<div className="property-line">
				<h4>Senses: </h4>
				<p>{senses}</p>
			</div>
			<div className="property-line">
				<h4>Languages </h4>
				<p>{props.statData.languages}</p>
			</div>
			<div className="property-line last">
				<h4>Challenge: </h4>
				<p>{props.statData.challenge_rating} ({props.statData.xp} XP)</p>
			</div> 
		</div> 
		<svg height="5" width="100%" className="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>
		{special_abilities}
	</div>
	<div className="section-right">
		<div className="actions">
			<h3>Actions</h3>
			{actions}
		</div> 
		<div className="actions">
			<h3>Legendary Actions</h3>
			{legendary_actions}
		</div> 
	</div> 
	<hr className="orange-border bottom" />
</div>
            
        </div>
    );
};

export default stat_block;

