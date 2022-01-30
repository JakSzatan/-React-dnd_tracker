import React, { Component } from 'react';

class delete_modal extends Component {
    render() {
        return (
            <div>
            <button type="button" className=" btn btn-danger mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
            Delete Preset
            </button>

            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Delete Preset</h5>
                </div>
                <div className="modal-body">

                {this.props.PresetList.map((item,index)=><div key={index}>
                    {item}
                    <button onClick={()=>this.props.DeletePreset(item)} className='ms-2 bi bi-minus btn btn-danger'>-</button>
                </div>)}
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

export default delete_modal;