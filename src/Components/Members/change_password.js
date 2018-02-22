import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../header';

import $ from 'jquery';

// component that contains the logic to update a member
class ChangePasswordComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.memberId,
            //username: this.props.memberName,
            username: this.props.memberName,
            password: '',
            successUpdate: '',
            errMessage: ''
        }

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitChange = this.onSubmitChange.bind(this);
    }

    componentWillMount(){
        if(this.state.username === null && this.state.id !== null){
            //console.log('user null => ' + this.props.url_one_member);

            this.serverRequestMember = $.ajax({
                url: this.props.url_one_member +'/'+ this.state.id,
                dataType: 'json',
                //crossDomain:true,
                success: function(data) {
                    //this.setState({members: data.members});
                    //console.log('data => ' + data);
                    this.setState({username: data.member.username});
                    /*
                    this.setState({id: data.member.id});
                    this.setState({username: data.member.username});
                    this.setState({email: data.member.email});
                    this.setState({phone: data.member.phone});
                    this.setState({first_name: data.member.first_name});
                    this.setState({last_name: data.member.last_name});
                    this.setState({company: data.member.company});
                    this.setState({group_name: data.group[0].description});
                    */
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url_one_member, status, err.toString());
                }.bind(this)
            });
        }

        //console.log('member name => ' + this.state.username);
    }

    componentDidMount(){
        $('.page-header h2').text('Change Password');
    }

    onChangePassword(e){
        //console.log('new pwd => ', e.target.value);
        this.setState({password: e.target.value});
    }

    onSubmitChange(e){
        // data in the form
        var form_data={
            id: this.state.id,
            username: this.state.username,
            password: this.state.password,
        };

        // submit form data to api
        if(this.refs.newpwd.value === this.refs.confpwd.value){
            $.ajax({
                url: this.props.url_change_password,
                type : "POST",
                //contentType : 'application/json',
                //data : JSON.stringify(form_data),
                dataType: 'json',
                data: form_data,
                success : function(response) {
                    //this.setState({successUpdate: response['message']});
                    if(response.status === 'success'){
                        this.setState({successUpdate: 'Password was changed.'});
                    } else {
                        this.setState({errMessage: response.msg});
                        this.setState({successUpdate: 'Password Error.'});
                    }
                }.bind(this),
                error: function(xhr, resp, text){
                    // show error to console
                    console.log(xhr, resp, text);
                }
            });
        } else {
            this.setState({'successUpdate':'Password not match.'});
            //console.log('new pwd not match >>>');
        }
     
        e.preventDefault();
    }

    render() {

        if(this.state.username === null){
            //console.log('wait load user....');
            return(
                <div>
                    {
                        <div className='alert alert-info'>
                            Waiting...
                        </div>
                    }
                </div>
            );
        } else {
            return (
                <div>
                    <Header searchBox={false} />
                        <div className="container wrapper main header">
                        {
                            this.state.successUpdate === "Password was changed." ?
                                <div className='alert alert-success'>
                                    Password was changed.
                                </div>
                            : null
                        }
            
                        {
                            this.state.successUpdate === "Unable to change password." ?
                                <div className='alert alert-danger'>
                                    Unable to change password. Please try again.
                                </div>
                            : null
                        }

                        {
                            this.state.successUpdate === "Password not match." ?
                                <div className='alert alert-danger'>
                                    Password not match.
                                </div>
                            : null
                        }

                        {
                            this.state.successUpdate === "Password Error." ?
                                <div className='alert alert-danger'>
                                    {this.state.errMessage}
                                </div>
                            : null
                        }
                        
                        <p>
                            <Link to={'/members'}
                                onClick={() => this.props.changeAppMode('read')}
                                className='btn btn-sm btn-primary margin-bottom-1em'>Members List
                            </Link>
                        </p>
            
                        <form onSubmit={this.onSubmitChange}>
                            <table className='table table-member'>
                                <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>
                                        <input
                                            type='text'
                                            className='form-control input-sm'
                                            readOnly
                                            value={(this.state.username == null ? '':this.state.username)} />
                                    </td>
                                </tr>
            
                                <tr>
                                    <td>New Password</td>
                                    <td>
                                        <input
                                            ref='newpwd'
                                            className='form-control input-sm'
                                            type="password"
                                            onChange={this.onChangePassword}
                                            minLength='4'
                                            maxLength='20'
                                            required />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Confirm Password</td>
                                    <td>
                                        <input
                                            ref='confpwd'
                                            className='form-control input-sm'
                                            type="password"
                                            minLength='4'
                                            maxLength='20'
                                            required />
                                    </td>
                                </tr>
            
                                <tr>
                                    <td></td>
                                    <td>
                                        <button
                                            className='btn btn-sm btn-info'
                                            type='Submit'
                                            onClick={() => this.onSubmitChange}>Save Changes</button>
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

}

export default ChangePasswordComponent;