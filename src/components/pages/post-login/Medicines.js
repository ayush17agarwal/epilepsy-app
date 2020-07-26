import React, { Component } from 'react';
import {getFromStorage} from './../../../utils/storage';
import axios from 'axios';
import './../css/Medicine.css';

const Medicine = props => (
    <tr className="text-center">
        <td>{props.med.name}</td>
        <td>{props.med.dosage} {props.med.dosageSuffix}</td>
        <td>{props.med.timesGiven}</td>
        <td>{(props.med.rescueMed) ? <input type="checkbox" className="disabled-check" checked/> : <input type="checkbox" className="disabled-check" disabled />}</td>
        <td>{props.med.notes}</td>
        <td>
            <button className="btn btn-outline-danger btn-sm" onClick={() => props.deleteMed(props.med.name)}>Delete</button> 
        </td>
    </tr>
)
class Medicines extends Component {

    constructor(props) {
        super(props);

        this.state = {
            medicines: [],
            newMedName: '',
            newMedDosage: '',
            newMedDoseSuffix: '',
            newMedTimesGiven: '',
            newMedNotes: '',
            newMedRescue: false,
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDosage = this.onChangeDosage.bind(this);
        this.onChangeSuffix = this.onChangeSuffix.bind(this);
        this.onChangeTimesGiven = this.onChangeTimesGiven.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onChangeRescue = this.onChangeRescue.bind(this);

        this.list = this.list.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.deleteMed = this.deleteMed.bind(this);
    }

    componentDidMount() {
        const obj = getFromStorage('epi_tracker_app');

        if(obj && obj.token) {
            const {token} = obj;
            axios.get('http://localhost:5000/medicine/return?token=' + token)
                .then(res => {
                    console.log(res.data);
                    if(res.data.success) {
                        this.setState({medicines: res.data.medicines});
                    }
                });
        }
    }

    deleteMed(name) {
        const obj = getFromStorage('epi_tracker_app');

        if(obj && obj.token) {
            const {token} = obj;
            axios.delete('http://localhost:5000/medicine/remove/' + name + '?token=' + token)
                .then(res => {
                    console.log(res.data);
                });
            window.location = '/medicines';
        }
        else {
            window.location = "/";
        }
    }

    deleteAll(e) {
        e.preventDefault();
        const obj = getFromStorage('epi_tracker_app');

        if(obj && obj.token) {
            const {token} = obj;
            axios.delete('http://localhost:5000/medicine/remove_all?token=' + token)
                .then(res => {
                    console.log(res.data);
                });
        
            window.location = '/medicines';
        }
        else {
            window.location = '/';
        }
    }

    list() {
        return this.state.medicines.map(currentmed => {
            return <Medicine med={currentmed} deleteMed={this.deleteMed}/>
        })
    }

    onChangeName(e) {
        this.setState({
            newMedName: e.target.value
        });
    }

    onChangeDosage(e) {
        this.setState({
            newMedDosage: e.target.value
        });
    }

    onChangeSuffix(e) {
        this.setState({
            newMedDoseSuffix: e.target.value
        });
    }

    onChangeTimesGiven(e) {
        this.setState({
            newMedTimesGiven: e.target.value
        });
    }

    onChangeNotes(e) {
        this.setState({
            newMedNotes: e.target.value
        });
    }

    onChangeRescue(e) {
        console.log(this.state.newMedRescue);
        this.setState({
            newMedRescue: (this.state.newMedRescue) ? false : true
        });
        console.log(this.state.newMedRescue);
    }

    onClose() {
        this.setState({
            newMedName: '',
            newMedDosage: '',
            newMedDoseSuffix: '',
            newMedTimesGiven: '',
            newMedNotes: '',
            newMedRescue: false,
        });
        document.getElementById("rescue-check").checked = false;
    }

    onAdd(e) {
        e.preventDefault();

        const obj = getFromStorage('epi_tracker_app');

        if(obj && obj.token) {
            const {token} = obj;
            const {
                newMedName,
                newMedDosage,
                newMedDoseSuffix,
                newMedTimesGiven,
                newMedNotes,
                newMedRescue
            } = this.state;

            if(newMedName !== '' && newMedDosage !== '' && newMedTimesGiven !== '') {
                const med = {
                    token: token,
                    name: newMedName,
                    dosage: newMedDosage,
                    dosageSuffix: newMedDoseSuffix,
                    timesGiven: newMedTimesGiven,
                    notes: newMedNotes,
                    rescueMed: newMedRescue
                };
    
                axios.post('http://localhost:5000/medicine/add', med)
                    .then(res => {
                        if(res.data.success) {
                            this.onClose();
                            window.location = '/medicines'
                        }
                    });
            }
            else {
                window.alert("Only name field may be left blank. Please fill in all other fields appropriately.");
            }
        }
    }
    render() {
        document.body.style.backgroundColor = "#ffe190";

        const {
        newMedName,
        newMedDosage,
        newMedDoseSuffix,
        newMedTimesGiven,
        newMedNotes,
        newMedRescue} = this.state;

        return (
            <div>
                <h3 className="my-5 text-center">Medicines</h3>
                <div className="justify-content-center">
                    <table className="mb-5 table-med table-hover text-center">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Dosage</th>
                            <th scope="col">Times</th>
                            <th scope="col">Rescue</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.list()}
                        </tbody>
                     </table>
                </div>
                <div className="mb-5 text-center">
                    <button type="button" className="btn btn-success mt-5" onClick={this.deleteAll}>Delete All</button>
                    <button type="button" className="btn btn-primary mt-5 ml-3" data-toggle="modal" data-target="#add-modal">Add New</button>

                    <div className="modal fade" id="add-modal" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">New Medicine</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="note">Note: Please enter multiple doses of same medicine separately.</p>
                                    <form>
                                        <div className="row justify-content-center">
                                            <div className="form-group">
                                                <label className="col-form-label">Name:</label>
                                                <input type="text" className="form-control" value={newMedName} onChange={this.onChangeName} id="type-name" required/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-md-4">
                                                <label className="col-form-label">Dose:</label>
                                                <input type="text" className="form-control" value={newMedDosage} onChange={this.onChangeDosage} id="med-dose" required/>
                                            </div>
                                            <div className="form-group col-sm-3">
                                                <label className="col-form-label">Suffix:</label>
                                                <select className="form-control" value={newMedDoseSuffix} onChange={this.onChangeSuffix} required>
                                                    <option>mg</option>
                                                    <option>mcg</option>
                                                    <option>g</option>
                                                    <option>mL</option>
                                                    <option>units</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-md-3">
                                                <label className="col-form-label">Times Given:</label>
                                                <input type="text" className="form-control" value={newMedTimesGiven} onChange={this.onChangeTimesGiven} required />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="col-form-label">Rescue:</label>
                                                <input type="checkbox" id="rescue-check" className="form-control" value={newMedRescue} onChange={this.onChangeRescue} />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-md-12">
                                                <label className="col-form-label">Notes:</label>
                                                <textarea className="form-control" value={newMedNotes} onChange={this.onChangeNotes} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={this.onClose} data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={this.onAdd}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Medicines;