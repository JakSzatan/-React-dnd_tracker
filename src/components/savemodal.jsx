import React from "react";
import { Modal } from "bootstrap";

export default class SaveModal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
      PresetName:"",
    }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({PresetName: event.target.value});
      }

    render() {
      return (
        <div>
            <button type="button" className=" btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Save Preset
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Save Preset</h5>
                </div>
                <div className="modal-body">
                <input type="text" placeholder="Preset Name" name="name" onChange={this.handleChange} className="input-group-text input-z-index d-inline col-12"/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-success text-center" onClick={()=>this.props.Save(this.state.PresetName)}>
                        Save
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }