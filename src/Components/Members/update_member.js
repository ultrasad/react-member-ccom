import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../header';

import $ from 'jquery';

// component that contains the logic to update a member
class UpdateMemberComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: 0,
            //username: '',
            //email: '',
            phone: '02 511 0555',
            first_name: '',
            last_name: '',
            company: 'RS',
            active: 1,
            groups: [],
            selectedGroupId: '',
            successUpdate: null,
            //fields: {},
            //errors: {}
        }

        this.onGroupChange = this.onGroupChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onUpdateMember = this.onUpdateMember.bind(this);
    }

    // on mount, fetch all group and one member data to stored them as this component's state
    componentDidMount(){
    
       // read categories
       this.serverRequestGroup = $.get(this.props.url_member_group,
           function (data) {
                this.setState({
                    groups: JSON.parse(data).groups
                });
           }.bind(this));
           
       // read one product data
       var memberId = this.props.memberId;
       this.serverRequestMember = $.ajax({
        url: this.props.url_one_member +'/'+ memberId,
        dataType: 'json',
        //crossDomain:true,
        success: function(data) {
            //this.setState({members: data.members});
            //console.log('data => ' + data);
            this.setState({id: data.member.id});
            //this.setState({username: data.member.username});
            //this.setState({email: data.member.email});
            this.setState({phone: data.member.phone});
            this.setState({first_name: data.member.first_name});
            this.setState({last_name: data.member.last_name});
            this.setState({company: data.member.company});
            this.setState({selectedGroupId: data.group[0].id});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url_one_member, status, err.toString());
        }.bind(this)
    });
    
       $('.page-header h2').text('Edit member');
    }

    // on unmount, kill group fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequestGroup.abort();
        this.serverRequestMember.abort();
    }

    // handle form field changes here

    // handle grouap change
    onGroupChange(e){
        this.setState({selectedGroupId: e.target.value});
    }
    
    // handle firstname change
    onFirstNameChange(e){
        this.setState({first_name: e.target.value});
    }

    // handle lastname change
    onLastNameChange(e){
        this.setState({last_name: e.target.value});
    }
    
    // handle save changes button here

    // handle save changes button clicked
    onUpdateMember(e){
     
        // data in the form
        var form_data={
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            group_id: this.state.selectedGroupId
        };
     
        // submit form data to api
        $.ajax({
            url: this.props.url_update_member,
            type : "POST",
            //contentType : 'application/json',
            //data : JSON.stringify(form_data),
            data: form_data,
            success : function(response) {
                //this.setState({successUpdate: response['message']});
                this.setState({successUpdate: 'Member was updated.'});
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
            }
        });
     
        e.preventDefault();
    }

    render() {
        // make groups as option for the select tag.
        var groupsOptions = this.state.groups.map(function(group){
            return (
                <option key={group.id} value={group.id}>{group.description}</option>
            );
        });
     
        return (
            <div>
                <Header searchBox={false} />
                    <div className="container wrapper main header">
                    {
                        this.state.successUpdate === "Member was updated." ?
                            <div className='alert alert-success'>
                                Member was updated.
                            </div>
                        : null
                    }
        
                    {
                        this.state.successUpdate === "Unable to update member." ?
                            <div className='alert alert-danger'>
                                Unable to update member. Please try again.
                            </div>
                        : null
                    }
                    
                    <p>
                        <Link to={'/members'}
                            onClick={() => this.props.changeAppMode('read')}
                            className='btn btn-sm btn-primary margin-bottom-1em'>Members List
                        </Link>
                    </p>
        
                    <form onSubmit={this.onUpdateMember}>
                        <table className='table table-member'>
                            <tbody>
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
                                        className='btn btn-sm btn-info'
                                        type='Submit'
                                        onClick={() => this.onUpdateMember}>Save Changes</button>
                                </td>
                            </tr>
        
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }

}

export default UpdateMemberComponent;