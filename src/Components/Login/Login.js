import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
//import {PostData} from '../../Services/PostData';
import Header from '../../header';

import $ from 'jquery';
//import './Login.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false,
            loginStatus: null
        };
        this.onLogin = this.onLogin.bind(this);
        this.onChange = this.onChange.bind(this);

        //console.log('login base_url => ' + this.props.base_url);
    }

    onLogin(e){
        e.preventDefault();

        console.log('submit login >>');

        if(this.state.username && this.state.password){
            //console.log('state login => ' + this.state);

            var form_data = {
                username: this.state.username,
                password: this.state.password,
            };
    
            //console.log('form data =>' + JSON.stringify(form_data));
            
            // submit form data to api
            $.ajax({
                //url: this.props.url_login_member,
                //url: 'http://172.22.228.225/membermanager/login_member',
                url: this.props.base_url + '/membermanagement/login_member',
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

                    //console.log('response => ' + response);
                    if(response.status === 'success'){
                        
                        //redux
                        this.props.setAuth(this.state.username, response.token);

                        //sessionStorage.setItem('userData',JSON.stringify(response));
                        this.setState({redirectToReferrer: true}, function afterStateChange(){
                            //var finalObj = response.concat(this.state);
                            localStorage.setItem('userData',JSON.stringify(this.props.auth));
                            //console.log('new state login => ' + this.state);
                        });
                        
                    } else {
                        this.setState({loginStatus: 'Unable to login.'}); 
                    }
            
                    // api message
                    //this.setState({successCreation: response['message']});
            
                    // empty form
                    /*
                    this.setState({username: ""});
                    this.setState({email: ""});
                    this.setState({first_name: ""});
                    this.setState({last_name: ""});
                    this.setState({selectedGroupId: ""});
                    */
                    
                    //load list page
                    //this.props.changeAppMode('read');
            
                }.bind(this),
                error: function(xhr, resp, text){
                    // show error to console
                    console.log(xhr, resp, text);
                     
                    // api message
                    this.setState({loginStatus: 'Unable to login.'});             
                }
            });

            /*
            PostData('login',this.state).then((result) => {
                let responseJson = result;
                if(responseJson.userData){
                    sessionStorage.setItem('userData',JSON.stringify(responseJson));
                    this.setState({redirectToReferrer: true});
                }
            });
            */
        }
    }
        
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
        this.setState({loginStatus: null});
    }

    render() {
        if (this.state.redirectToReferrer || localStorage.getItem('userData')){
            console.log('login session and redirect to members....');
            return (<Redirect to={'/members'} />);
        }
        
        $('.page-header h1').text('Login');

        return (
        <div>

            <Header searchBox={false} />
            <div className="container wrapper main header">
                {/*<span>Username: {this.props.auth.userName}</span>*/}
                <div className="col-sm-6 col-xs-12 form-login">
                    {
                    
                        this.state.loginStatus === "Unable to login." ?
                            <div className='alert alert-danger'>
                                Unable to Login, Please try again.
                            </div>
                        : null
                    }
                    <form onSubmit={this.onLogin}>
                        <table className='table table-member'>
                            <tbody>
                                <tr>
                                    <td>UserName</td>
                                    <td>
                                        <input
                                        type='text'
                                        name="username"
                                        className='form-control input-sm'
                                        required
                                        onChange={this.onChange} />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Password</td>
                                    <td>
                                        <input
                                        type='password'
                                        name="password"
                                        className='form-control input-sm'
                                        required
                                        onChange={this.onChange} />
                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                        <button
                                        className='btn btn-info btn-sm'
                                        type='Submit'
                                        onClick={() => this.onLogin}>Login</button>
                                    </td>
                                    </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                {/*
                <div className="row" id="Body">
                    <div className="col-md-5 pull-left">
                        <label>Username</label>
                        <input type="text" name="username" className="form-control input-sm" onChange={this.onChange}/>
                        <label>Password</label>
                        <input type="password" name="password" className="form-control input-sm" onChange={this.onChange}/>
                        <br />
                        <input type="submit" value="Login" className="btn btn-sm btn-success" onClick={this.login}/>
                        &nbsp;&nbsp;<a className="" href="/signup">Registration</a>
                    </div>
                </div>
                */}
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth, //authUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuth:(userName, token) => {
            dispatch({
                type:"AUTH_USER",
                userName: userName,
                token: token
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);