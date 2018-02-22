import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../header';

import $ from 'jquery';

// component that create member
class ImportMemberComponent extends Component {
    // initial component states will be here
    // initialize values
    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            successCreation: ''
        }

        // This line is important!
        this.onImportMember = this.onImportMember.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onReset = this.onReset.bind(this);
        //this.onFirstNameChange = this.onFirstNameChange.bind(this);
        //this.onLastNameChange = this.onLastNameChange.bind(this);
        //this.onUserNameChange = this.onUserNameChange.bind(this);
        //this.onEmailChange = this.onEmailChange.bind(this);
        //this.onGroupChange = this.onGroupChange.bind(this);
    }

    componentDidMount() {
        $('.page-header h2').text('Import Member');
    }

    // on mount, get all categories and store them in this component's state
    //componentDidMount() {
        //console.log('componentDidMount...');
    //}

    onChangeFile(e){
        //console.log('change file >>>');
        this.setState({filename: e.target.value});
    }

    onReset(e){
        //console.log('reset file >>>');
        this.setState({successCreation: ''}); 
        this.setState({filename: ''});
        this.refs.fileMember.value = '';
    }

    // handle save button clicked
    onImportMember(e){

        //alert('A name was submitted: ' + this.state.username);
        //e.preventDefault();

        //var fd = new FormData();    
        //fd.append('file', this.refs.file.getDOMNode().files[0]);
        
        //console.log('form file =>' + this.refs.file + fd);

        var data = new FormData();
        var xlsx_file = document.querySelector('input[type="file"]').files[0];
        data.append("data", xlsx_file);
        
        // data in the form
        /*
        var form_data = {
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            company: this.state.company,
            active: this.state.active,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            selectedGroupId: this.state.selectedGroupId
        };

        console.log('form data =>' + JSON.stringify(form_data));
        */

        if(xlsx_file !== ''){
            // submit form data to api
            $.ajax({
                url: this.props.url_import_member,
                type : "POST",
                //dataType: 'json',
                //contentType : 'application/json',
                //crossDomain:true,
                //crossOrigin: false,
                //headers : {
                    //'Content-Type' : 'multipart/form-data; charset=UTF-8'
            // },
                //data : JSON.stringify(form_data),
                //data: form_data,
                data:data,
                dataType: 'json',
                processData: false,
                contentType: false,
                success : function(response){
                    
                    /*
                    // api message
                    this.setState({successCreation: response['message']});
            
                    // empty form
                    this.setState({username: ""});
                    this.setState({email: ""});
                    this.setState({first_name: ""});
                    this.setState({last_name: ""});
                    this.setState({selectedGroupId: ""});
                    
                    // api message
                    this.setState({successCreation: 'Member was created.'});
                    
                    //load list page
                    //this.props.changeAppMode('read');
                    */

                    //this.props.changeAppMode('read');

                    //this.props.history.push('/some/path')

                    this.setState({successCreation: 'Member was created.'});
                    if(response.status === 'success'){
                        console.log('success >>>');
                        window.location = response.file_path;

                    } else {
                        console.log('false >>');
                    }
            
                }.bind(this),
                error: function(xhr, resp, text){
                    // show error to console
                    console.log(xhr, resp, text);
                    
                    // api message
                    this.setState({successCreation: 'Unable to create member.'});             
                }.bind(this)
            });
        } else {
            this.setState({successCreation: ''}); 
        }
        
        e.preventDefault();
    }
        
    // render component here
    render() {
        return (
        <div>
            <Header searchBox={false} />
            <div className="container wrapper header">
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
                <Link to={'/members'}
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary btn-sm margin-bottom-1em'>Members List
                </Link>
            </p>
    
            <form onSubmit={this.onImportMember} encType="multipart/form-data">
                <table className='table table-member'>
                <tbody>
                    <tr>
                        <td width='20%'>File Excel(.xlsx only):</td>
                        <td>
                            {
                            /*
                            <input
                            type='text'
                            className='form-control input-sm'
                            value={this.state.username}
                            required
                            onChange={this.onUserNameChange} />
                            */
                            }
                            <div className="file_import_member">
                                <a className='btn btn-info btn-sm'>
                                    Choose File...
                                    <input type="file" ref="fileMember" className='input-file-member' onChange={this.onChangeFile} name="input-file-member" size="40" />
                                </a>&nbsp;<span className='label label-primary label-file-member' id="label-file-member">{this.state.filename}</span>
                            </div>
                        </td>
                    </tr>
    
                    <tr>
                        <td></td>
                        <td>
                            <button
                            className='btn btn-success btn-sm'
                            type='Submit'
                            onClick={() => this.onImportMember}
                            >Save</button>&nbsp;
                            <button
                            className='btn btn-warning btn-sm'
                            type='Reset'
                            onClick={this.onReset}
                            >Reset</button>
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

export default ImportMemberComponent;