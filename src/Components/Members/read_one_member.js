import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../../header';

import $ from 'jquery';

class ReadOneMemberComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: 0,
            username: '',
            email: '',
            phone: '02 511 0555',
            first_name: '',
            last_name: '',
            company: 'RS',
            group_name: '',
            active: 1,
        }
    }

    // on mount, read member data and them as this component's state
    componentDidMount(){
    
       var memberId = this.props.memberId;
    
       /*this.serverRequestMember = $.get(this.props.source +'/'+ memberId,
           function (data) {
               console.log('data => ' + data);
               this.setState({id: data.member.id});
               this.setState({username: data.member.username});
               this.setState({email: data.member.email});
               this.setState({phone: data.member.phone});
               this.setState({first_name: data.member.first_name});
               this.setState({last_name: data.member.last_name});
               this.setState({company: data.member.company});
               this.setState({group_name: data.member.group_name});
           }.bind(this));*/

        this.serverRequestMember = $.ajax({
            url: this.props.url_one_member +'/'+ memberId,
            dataType: 'json',
            //crossDomain:true,
            success: function(data) {
                //this.setState({members: data.members});
                //console.log('data => ' + data);
                this.setState({id: data.member.id});
                this.setState({username: data.member.username});
                this.setState({email: data.member.email});
                this.setState({phone: data.member.phone});
                this.setState({first_name: data.member.first_name});
                this.setState({last_name: data.member.last_name});
                this.setState({company: data.member.company});
                this.setState({group_name: data.group[0].description});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url_one_member, status, err.toString());
            }.bind(this)
        });
    
       $('.page-header h2').text('Read Member');
   }
    
   // on unmount, kill member fetching in case the request is still pending
   componentWillUnmount() {
       this.serverRequestMember.abort();
   }

   render() {
    
       return (
           <div>
               <Header searchBox={false} />
               <div className="container wrapper main header">
                    <p>
                        <Link to={'/members'}
                            onClick={() => this.props.changeAppMode('read')}
                            className='btn btn-sm btn-primary margin-bottom-1em'>Members List
                        </Link>
                    </p>
            
                    <form onSubmit={this.onSave}>
                        <table className='table table-member'>
                            <tbody>
                            <tr>
                                    <td>UserName</td>
                                    <td>{this.state.username}</td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>

                            <tr>
                                <td>Phone</td>
                                <td>{this.state.phone}</td>
                            </tr>
            
                            <tr>
                                <td>FirstName</td>
                                <td>{this.state.first_name}</td>
                            </tr>
            
                            <tr>
                                <td>LastName</td>
                                <td>{this.state.last_name}</td>
                            </tr>

                            <tr>
                                <td>Company</td>
                                <td>{this.state.company}</td>
                            </tr>
            
                            <tr>
                                <td>Group</td>
                                <td>{this.state.group_name}</td>
                            </tr>
            
                            </tbody>
                        </table>
                    </form>
               </div>
           </div>
       );
   }
}

export default ReadOneMemberComponent;