import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployee extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee: ' + JSON.stringify(employee));
        
        EmployeeService.createEmployee(employee).then(res =>{
            this.props.history.push('/employees');
        })
    }
    cancel(){
        this.props.history.push('/employees')
    }
    changeFirstNameHandler=(event) => {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler=(event) => {
        this.setState({lastName: event.target.value});
    }
    changeEmailHandler=(event) => {
        this.setState({emailId: event.target.value});
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Add Employee</h3>
                            <div className='card-body'>
                                <form action="">
                                    <div className='form-group'>
                                        <label>First Name:</label>
                                        <input name="firstName" placeholder='First Name' className='form-control' 
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Last Name:</label>
                                        <input name="lastName" placeholder='Last Name' className='form-control' 
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Email Adress:</label>
                                        <input name="emailId" placeholder='Email Adress' className='form-control' 
                                        value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    
                                    <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployee