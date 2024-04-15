import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployee extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        } else{
            EmployeeService.getEmployeeById(this.state.id).then((response) => {
                let employee = response.data;
                this.setState ({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
        }
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee: ' + JSON.stringify(employee));
        
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        } else{
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
        
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className='text-center'>Add Employee</h3>
        } else {
            return <h3 className='text-center'>Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                this.getTitle()
                            }
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
                                    
                                    <button className='btn btn-success' onClick={this.saveOrUpdateEmployee}>Save</button>
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