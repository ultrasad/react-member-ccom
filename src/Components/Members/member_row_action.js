import React, { Component } from 'react';
//import $ from 'jquery';

// component that action member
class MemberRowAction extends Component {
    constructor(props){
        super(props);

        this.state = {
            confirmDelete: false
        }
        
        this.onConfirm = this.onConfirm.bind(this);
        this.oncancel = this.oncancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(){
        this.props.onDeleteMember(this.props.memberId);
        this.setState({confirmDelete: false});
    }

    onConfirm(){
        console.log('confirm delete...');
        this.setState({ confirmDelete: true });
    }
    
    oncancel(){
        console.log('cancel delete...');
        this.setState({ confirmDelete: false });
    }

    /*
    // handle single row deletion
    onDeleteMember(e){
        
        // member to delete
        var memberId = this.props.memberId;

        console.log('delete member => ' + memberId + ', url => ' + this.props.url_delete_member);
        
        // submit form data to api
        $.ajax({
            url: this.props.url_delete_member,
            type : "POST",
            //contentType : 'application/json',
            //data : JSON.stringify({'id' : productId}),
            data: {'id': memberId},
            success : function(response) {
                console.log('delete => ' + response);
                this.props.changeAppMode('read');
            }.bind(this),
            error: function(xhr, resp, text){
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }
    */

    componentWillMount() {
        let confirmDeleteSpan = 
            <span>
                <a
                    onClick={() => this.props.changeAppMode('readOne', this.props.memberId)}
                    className='btn btn-info btn-sm m-r-1em'> Read One
                </a>
                <a
                    onClick={() => this.props.changeAppMode('update', this.props.memberId)}
                    className='btn btn-primary btn-sm m-r-1em'> Edit
                </a>
                <a
                    onClick={() => this.onConfirm}
                    className='btn btn-danger btn-sm'> Delete {this.props.memberId}
                </a>
            </span>
        this.setState({ confirmDeleteSpan });
    }

    render() {
    return (
        <span>
            {
                this.state.confirmDelete ?
                <span>
                    <a onClick={() => this.onDelete}
                        className='btn btn-sm btn-danger m-r-1em'>Confirm</a>
                    <a onClick={() => this.oncancel}
                        className='btn btn-sm btn-primary'>Cancel</a>
                </span>
                :
                <span>
                    <a
                        onClick={() => this.props.changeAppMode('readOne', this.props.memberId)}
                        className='btn btn-info btn-sm m-r-1em'> Read One
                    </a>
                    <a
                        onClick={() => this.props.changeAppMode('update', this.props.memberId)}
                        className='btn btn-primary btn-sm m-r-1em'> Edit
                    </a>
                    <a
                        onClick={() => this.onConfirm}
                        className='btn btn-danger btn-sm'> Delete {this.props.memberId}
                    </a>
                </span>
            }
        </span>
        );
    }
}

export default MemberRowAction;