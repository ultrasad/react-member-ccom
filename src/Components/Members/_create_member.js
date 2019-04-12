import React, { Component } from 'react';
import $ from 'jquery';

// component that create member
class CreateMemberComponent extends React.Component {
    // initial component states will be here
    // initialize values
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phone: '02 511 0555',
            first_name: '',
            last_name: '',
            company: 'RS',
            active: 1,
            selectedGroupId: -1,
            groups: []
        }

        console.log('create member url => ' + this.props.source);

        // This line is important!
        this.onSave = this.onSave.bind(this);
        //this.onUserNameChange = this.onUserNameChange.bind(this);
        //this.onGroupChange = this.onGroupChange.bind(this);
    }

    // on mount, get all categories and store them in this component's state
    componentDidMount() {
        console.log('groups url => ' + this.props.source_group);
        this.serverRequest = $.get(this.props.source_group, function (data) {
            //console.log('groups => ' + JSON.parse(data.groups));
            //var data = JSON.parse(data);
            this.setState({
                groups: JSON.parse(data).groups
            });
        }.bind(this));
    
        $('.page-header h1').text('Create product');
    }
    
    // on unmount, stop getting categories in case the request is still loading
    /*
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    // handle form field changes here

    // handle username change
    onUserNameChange(e) {
        this.setState({username: e.target.value});
    }

    // handle email change
    onEmailChange(e) {
        this.setState({email: e.target.value});
    }

    // handle firstname change
    onFirstnameChange(e) {
        this.setState({first_name: e.target.value});
    }

    // handle lastname change
    onLastnameChange(e) {
        this.setState({last_name: e.target.value});
    }

    // handle group change
    onGroupChange(e) {
        this.setState({selectedCategoryId: e.target.value});
    }
    */

    // handle form field changes here

    // handle username change
    onUserNameChange = (e) => {
        console.log('username => ' + e.target.value);
        this.setState({username: e.target.value});
    }

    // handle group change
    onGroupChange = (e) => {
        console.log('group => ' + e.target.value);
        this.setState({selectedGroupId: e.target.value});
    }
    
    /*
    // handle description change
    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }
    
    // handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
    }
    */
    
    // handle save button here

    // handle save button clicked
    onSave(e){
        
        // data in the form
        var form_data = {
            username: this.state.username,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            selectedGroupId: this.state.selectedGroupId
        };

        console.log('form data =>' + JSON.stringify(form_data));
        
        // submit form data to api
        $.ajax({
            url: this.props.source,
            type : "POST",
            //dataType: 'json',
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
                this.setState({successCreation: response['message']});
        
                // empty form
                this.setState({username: ""});
                this.setState({email: ""});
                this.setState({first_name: ""});
                this.setState({last_name: ""});
                this.setState({selectedGroupId: -1});
        
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
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
            {
    
                this.state.successCreation === "Member was created." ?
                    <div className='alert alert-success'>
                        Member was saved.
                    </div>
                : null
            }
    
            {
    
                this.state.successCreation === "Unable to create member." ?
                    <div className='alert alert-danger'>
                        Unable to save member. Please try again.
                    </div>
                : null
            }
            
            <p>
                <a
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'> Members List
                </a>
            </p>
    
    
            <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                <tbody>
                    <tr>
                        <td>UserName</td>
                        <td>
                            <input
                            type='text'
                            className='form-control'
                            value={this.state.username}
                            required='required'
                            onChange={this.onUserNameChange} />
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
                            className='form-control'
                            value={this.state.selectedGroupId}>
                            <option value="-1">Select group...</option>
                            {groupsOptions}
                            </select>
                        </td>
                    </tr>
    
                    <tr>
                        <td></td>
                        <td>
                            <button
                            className='btn btn-primary'
                            onClick={this.onSave}>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        );
    }
}

export default CreateMemberComponent;