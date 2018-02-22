import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../header';

import $ from 'jquery';

// component that create member
class CreateMemberComponent extends Component {
    // initial component states will be here
    // initialize values
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            sales_employee: '',
            new_password: '',
            phone: '02 511 0555',
            first_name: '',
            last_name: '',
            company: 'RS',
            active: 1,
            groups: [],
            selectedGroupId: '',
            successCreation: null,
            fields: {},
            errors: 'Unable to save member. Please try again.'
        }

        //console.log('Create member url => ' + this.props.source);

        // This line is important!
        this.onCreateMember = this.onCreateMember.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSalesEmployeeChange = this.onSalesEmployeeChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
    }

    // on mount, get all categories and store them in this component's state
    componentDidMount() {
        //console.log('Groups url => ' + this.props.url_member_group);
        this.serverRequest = $.get(this.props.url_member_group, function (data) {
            //console.log('groups => ' + JSON.parse(data.groups));
            //var data = JSON.parse(data);
            this.setState({
                groups: JSON.parse(data).groups
            });
        }.bind(this));
    
        $('.page-header h2').text('Create Member');
    }

    toLower(str){
        str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        return str;
    }

    // handle form field changes here

    // handle username change
    onUserNameChange(e){
        //console.log('username => ' + e.target.value);
        //let username = e.target.value;
        var username = this.toLower(e.target.value);
        //console.log('user name =>' + username);

        this.setState({username: username});
        this.setState({email: username+'@rs.co.th'});
    }

    onFirstNameChange(e){
        //console.log('first name => ' + e.target.value);
        var first_name = this.toLower(e.target.value);
        this.setState({first_name: first_name});
    }

    onLastNameChange(e){
        //console.log('last name => ' + e.target.value);
        var last_name = this.toLower(e.target.value);
        this.setState({last_name: last_name});
    }
    
    onEmailChange(e){
        var email = e.target.value;
        if(email !== ''){
            this.setState({email: email});
        } else {
            this.setState({email: this.state.username+'@rs.co.th'});
        }
    }
    
    onSalesEmployeeChange(e){
        var sales_emplayee = e.target.value;
        this.setState({sales_employee: sales_emplayee});
    }
    
    // handle group change
    onGroupChange(e){
        //console.log('group => ' + e.target.value);
        this.setState({selectedGroupId: e.target.value});
    }
    
    // handle save button clicked
    onCreateMember(e){

        //alert('A name was submitted: ' + this.state.username);
        //e.preventDefault();
        
        
        // data in the form
        var form_data = {
            username: this.state.username,
            email: this.state.email,
            sales_employee: this.state.sales_employee,
            phone: this.state.phone,
            company: this.state.company,
            active: this.state.active,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            selectedGroupId: this.state.selectedGroupId
        };

        //console.log('form data =>' + JSON.stringify(form_data));
        
        // submit form data to api
        $.ajax({
            url: this.props.url_create_member,
            type : "POST",
            dataType: 'json',
            //contentType : 'application/json',
            //crossDomain:true,
            //crossOrigin: false,
            //headers : {
                //'Content-Type' : 'multipart/form-data; charset=UTF-8'
           // },
            //data : JSON.stringify(form_data),
            data: form_data,
            success : function(response){
        
                // api message
                console.log('response status', response['status']);

                if(response['status'] === 'error'){
                    this.setState({'errors': response['message']});
                    this.setState({successCreation: 'Error'});
                    return false;
                } else {
                    // empty form
                    this.setState({username: ""});
                    this.setState({email: ""});
                    this.setState({sales_employee: ""});
                    this.setState({new_password: response['password']});
                    this.setState({first_name: ""});
                    this.setState({last_name: ""});
                    this.setState({selectedGroupId: ""});
                    
                    // api message
                    this.setState({successCreation: 'Member was created.'});
                }
                
                //load list page
                //this.props.changeAppMode('read');
        
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
                
                // api message
                this.setState({successCreation: 'Unable to create member.'});
            }
        });
        
        e.preventDefault();
    }
        
    // render component here
    render() {
        
        // make groups as option for the select tag.
        var groupsOptions = this.state.groups.map(function(group){
            return (
                <option key={group.id} value={group.id}>{group.description}</option>
            );
        });
    
        /*
        - tell the user if a member was created
        - tell the user if unable to create member
        - button to go back to members list
        - form to create a member
        */
        return (
            <div>
                <Header searchBox={false} />
                <div className="container wrapper main header">
                    <div>
                        {
                
                            this.state.successCreation === "Member was created." ?
                                <div className='alert alert-success'>
                                    Member was saved.
                                    <p>Password: {this.state.new_password}</p>
                                </div>
                            : null
                        }
                
                        {
                
                            this.state.successCreation === "Error" ?
                                <div className='alert alert-danger'>
                                    {/*Unable to save member. Please try again.*/}
                                    {this.state.errors}
                                </div>
                            : null
                        }
                        
                        <p>
                            <Link to={'/members'}
                                onClick={() => this.props.changeAppMode('read')}
                                className='btn btn-primary btn-sm margin-bottom-1em'>Members List
                            </Link>
                        </p>
                
                        <form onSubmit={this.onCreateMember}>
                            <table className='table table-member'>
                            <tbody>
                                <tr>
                                    <td>UserName</td>
                                    <td>
                                        <input
                                        type='text'
                                        className='form-control input-sm'
                                        value={this.state.username}
                                        required
                                        onChange={this.onUserNameChange} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>FirstName</td>
                                    <td>
                                        <input
                                        type='text'
                                        className='form-control input-sm'
                                        value={this.state.first_name}
                                        required
                                        onChange={this.onFirstNameChange} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>LastName</td>
                                    <td>
                                        <input
                                        type='text'
                                        className='form-control input-sm'
                                        value={this.state.last_name}
                                        required
                                        onChange={this.onLastNameChange} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <input
                                        type='email'
                                        className='form-control input-sm'
                                        value={this.state.email}
                                        onChange={this.onEmailChange} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Sale Emplayee (SAP)</td>
                                    <td>
                                        <input
                                        type='text'
                                        className='form-control input-sm'
                                        value={this.state.sales_employee}
                                        onChange={this.onSalesEmployeeChange} />
                                    </td>
                                </tr>

                                {/*             
                                <tr>
                                    <td>Description</td>
                                    <td>
                                        <textarea
                                        type='text'
                                        className='form-control'
                                        required
                                        value={this.state.description}
                                        onChange={this.onDescriptionChange}>
                                        </textarea>
                                    </td>
                                </tr>
                                */}
                                
                                {/*
                                <tr>
                                    <td>Price ($)</td>
                                    <td>
                                        <input
                                        type='number'
                                        step="0.01"
                                        className='form-control'
                                        value={this.state.price}
                                        required
                                        onChange={this.onPriceChange}/>
                                    </td>
                                </tr>
                                */}
                
                                <tr>
                                    <td>Group</td>
                                    <td>
                                        <select
                                        onChange={this.onGroupChange}
                                        className='form-control input-sm'
                                        value={this.state.selectedGroupId}
                                        required>
                                        <option value="">Select group...</option>
                                        {groupsOptions}
                                        </select>
                                    </td>
                                </tr>
                
                                <tr>
                                    <td></td>
                                    <td>
                                        <button
                                        className='btn btn-info btn-sm'
                                        type='Submit'
                                        onClick={() => this.onCreateMember}>Save Changes</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMemberComponent;