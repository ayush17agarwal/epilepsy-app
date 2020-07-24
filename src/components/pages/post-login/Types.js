import React, { Component } from 'react';
import { getFromStorage } from '../../../utils/storage';
//import { capitalize } from '../../../utils/util';
import axios from 'axios';
import '../css/Type.css';

const Type = props => (
    <tr>
        <td>{props.type.name}</td>
        <td>{props.type.description}</td>
        <td>
            <button className="btn btn-outline-danger btn-sm" onClick={() => props.deleteType(props.type.name)}>Delete</button> 
        </td>
    </tr>
)

class Types extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            types: [],
            newTypeName: '',
            newTypeDescription: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onClose = this.onClose.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.deleteType = this.deleteType.bind(this);
    }

    componentDidMount() {
        const obj = getFromStorage('epi_tracker_app');
        if(obj && obj.token) {
            const {token} = obj;
            axios.get('http://localhost:5000/type/return?token=' + token)
            .then(res => {
                console.log(res.data);
                if(res.data.success) {
                    console.log(res.data.types);
                    this.setState({types: res.data.types})
                }
                else {
                    this.setState({typeError: res.data.message})
                }
            });
        }
    }

    deleteType(name) {
        const obj = getFromStorage('epi_tracker_app');

        if(obj && obj.token) {
            const {token} = obj;
            axios.delete('http://localhost:5000/type/remove/' + name + '?token=' + token)
                .then(res => {
                    console.log(res.data);
                });
            window.location = '/types';
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
            axios.delete('http://localhost:5000/type/remove_all?token=' + token)
                .then(res => {
                    console.log(res.data);
                });
        
            window.location = '/types';
        }
        else {
            window.location = '/';
        }
    }

    list() {
        return this.state.types.map(currenttype => {
            return <Type type={currenttype} deleteType={this.deleteType}/>
        });
    }

    onAdd(e) {
        e.preventDefault();
        const obj = getFromStorage('epi_tracker_app');

        if(obj && obj.token) {
            const {token} = obj;

            if(this.state.newTypeName !== '') {
                const type = {
                    token: token, 
                    name: this.state.newTypeName, 
                    description: this.state.newTypeDescription
                };
    
                axios.post('http://localhost:5000/type/add', type)
                    .then(res => {
                        if(res.data.success) {
                            this.setState({newTypeName: '', newTypeDescription: ''});
                            window.location = '/types';
                        }
                    });
            }
            else {
                window.alert("Name field cannot be empty");
                window.location = '/types';
            }
        }
    }

    onChangeDescription(event) {
        this.setState({
            newTypeDescription: event.target.value,
        });
    }

    onChangeName(event) {
        this.setState({
            newTypeName: event.target.value,
        });
    }

    onClose(event) {
        event.preventDefault();
        this.setState({newTypeName: '', newTypeDescription: ''});
    }

    render() {
        document.body.style.backgroundColor = "#ffd1c3";

        const {newTypeName, newTypeDescription} = this.state;

        return (
            <div>
                <h3 className="my-5 text-center">Types</h3>
                <div className="justify-content-center">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
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
                                    <h5 className="modal-title">New Type</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label className="col-form-label">Name:</label>
                                            <input type="text" className="form-control" value={newTypeName} onChange={this.onChangeName} id="type-name"/>
                                            <label className="col-form-label">Description:</label>
                                            <textarea className="form-control" value={newTypeDescription} onChange={this.onChangeDescription} id="type-description"></textarea>
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

export default Types;