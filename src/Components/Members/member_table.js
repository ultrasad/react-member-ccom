import React, { Component } from 'react';
import MemberRow from './member_row';
import {Link} from 'react-router-dom';
//import $ from 'jquery';

// component for the whole members table
class MembersTable extends Component {
    /*constructor(props){
        super(props);

        console.log('members prop, member table => ' + this.props.members);

        //console.log('del member =>' + this.props.url_delete_member);

        //this.onConfirm = this.onConfirm.bind(this);
        //this.oncancel = this.oncancel.bind(this);
        //this.onDeleteMember = this.onDeleteMember.bind(this);

        //this.state = {
            //testx: 100
        //}

        //this.nextPage = this.nextPage.bind(this);
    }*/

    /*
    nextPage(){
        console.log(this.state);
        //this.setState({
            //testx: Number(200)
        //});
        this.setState({testx: Number(200)}, () => {
            console.log(this.state.testx);
        });
        //console.log(this.state);
    }*/

    /*
    onDeleteMember(memberId){
        
        // member to delete
        //var memberId = this.props.memberId;

        console.log('delete member => ' + memberId + ', url => ' + this.props.url_delete_member);
        
        // submit form data to api
        if(memberId !== undefined){
            $.ajax({
                url: this.props.url_delete_member,
                type : "POST",
                //contentType : 'application/json',
                //data : JSON.stringify({'id' : productId}),
                data: {'id': memberId},
                success : function(response) {
                    console.log('delete => ' + response);
                    
                    let members = this.props.members;
                    let index = members.findIndex(x => x.id === memberId);
                    members.splice(index, 1);
                    this.setState({members});
                    
                    //this.props.changeAppMode('read');
                }.bind(this), //use for bind props changeAppMode
                error: function(xhr, resp, text){
                    // show error in console
                    console.log(xhr, resp, text);
                }
            });
        }
    }
    */

    /*
    onConfirm() {
        console.log('confirm delete...');
        this.setState({ confirmDelete: true });
    }

    oncancel(){
        this.setState({ confirmDelete: false });
    }
    */

    /*
    // handle single row deletion
    onDeleteMember(memberId){
        
        // member to delete
        //var memberId = this.props.memberId;

        console.log('delete member => ' + memberId + ', url => ' + this.props.url_delete_member);
        
        // submit form data to api
        if(memberId !== undefined){
            $.ajax({
                url: this.props.url_delete_member,
                type : "POST",
                //contentType : 'application/json',
                //data : JSON.stringify({'id' : productId}),
                data: {'id': memberId},
                success : function(response) {
                    console.log('delete => ' + response);

                    
                    //var array = this.state.members;
                    //var index = array.indexOf(memberId)
                    //array.splice(index, 1);
                    //this.setState({members: array });
                    
                    let members = this.props.members;
                    let index = members.findIndex(x => x.id === memberId);
                    members.splice(index, 1);
                    
                    this.setState({members: members});
                    
                    //this.props.changeAppMode('read');
                }.bind(this), //use for bind props changeAppMode
                error: function(xhr, resp, text){
                    // show error in console
                    console.log(xhr, resp, text);
                }
            });
        }
    }
    */

    render() {
        //console.log('Member Table...');
        //console.log('members prop, member table => ' + this.props.members);
        if(this.props.members){
            var rows = this.props.members
            .map(function(member, i) {
                return (
                    <MemberRow
                        url_delete_member={this.props.url_delete_member}
                        key={i}
                        member={member}
                        changeAppMode={this.props.changeAppMode}
                        onDeleteMember={this.props.onDeleteMember} />
                );
            }.bind(this));
            
            return(
                !rows.length
                    ? <div className='alert alert-member-found'>No members found.</div>
                    :
                    <div className="member-list">
                        <table className='table table-member'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>UserName</th>
                                    <th>First name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        <div className="pagination pagination-member clearfix">
                          <Link style={{display: this.props.memberCurrentPage <= 1?'none':'block'}} className="prev" to={this.props.memberPrevPage} onClick={() => this.props.prevPage()}>‹ <span className="visually-hidden">Prev</span></Link>
                          <span className="hiddenx info">- {this.props.memberResults} -</span>
                          <Link style={{display: this.props.showNextpage !== true?'none':'block'}} className="next" to={this.props.memberNextPage} onClick={() => this.props.nextPage()}><span className="visually-hidden">Next</span> ›</Link>
                      </div>
                    </div>
        
            );
        } else {
            return <div className="col-md-12"><div className="row"><div className='alert alert-info'>Loading...</div></div></div>
        } 
    }
}

export default MembersTable;