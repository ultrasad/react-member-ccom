import React, { Component } from 'react';
import $ from 'jquery';

// component that contains the logic to delete a member
class DeleteMemberComponent extends Component{
    // componentDidMount will be here
    constructor(props){
        super(props);
        this.onDeleteMember = this.onDeleteMember.bind(this);
    }

    // on mount, change header text
    componentDidMount(){
        $('.page-header h1').text('Delete Member');
    }

    // handle single row deletion
    onDeleteMember(e){
        
        // member to delete
        var memberId = this.props.memberId;
        //console.log('delete member => ' + memberId);
        
        // submit form data to api
        $.ajax({
            url: this.props.url_delete_member,
            type : "POST",
            //contentType : 'application/json',
            //data : JSON.stringify({'id' : productId}),
            data: {'id' : memberId},
            success : function(response) {
                this.props.changeAppMode('read');
            }.bind(this),
            error: function(xhr, resp, text){
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }

    render(){
        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={() => this.onDeleteMember}
                                    className='btn btn-sm btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                    className='btn btn-sm btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
    
    // onDelete will be here
}

export default DeleteMemberComponent;