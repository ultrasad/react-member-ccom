import React, { Component } from 'react';
//import MemberRowAction from './member_row_action';

// component that renders a single product
class MemberRow extends Component {
    constructor(props){
        super(props);
        
        //this.onDeleteMember = this.onDeleteMember.bind(this);
        this.state = {
            confirmDelete: false
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.oncancel = this.oncancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onConfirm(){
        console.log('confirm delete...');
        this.setState({ confirmDelete: true });
    }

    oncancel(){
        console.log('cancel delete...');
        this.setState({ confirmDelete: false });
    }

    onDelete(){
        this.props.onDeleteMember(this.props.member.id);
        this.setState({confirmDelete: false});
    }

    render() {
    return (
        <tr>
            <td>{this.props.member.id}</td>
            <td>{this.props.member.username}</td>
            <td>{this.props.member.first_name}</td>
            <td>{this.props.member.last_name}</td>
            {/*<td>${parseFloat(this.props.member.price).toFixed(2)}</td>*/}
            <td>{this.props.member.email}</td>
            <td>{this.props.member.group_name}</td>
            <td>
                {/*
                <a
                    onClick={() => this.props.changeAppMode('readOne', this.props.member.id)}
                    className='btn btn-info btn-sm m-r-1em'> Read One
                </a>
                <a
                    onClick={() => this.props.changeAppMode('update', this.props.member.id)}
                    className='btn btn-primary btn-sm m-r-1em'> Edit
                </a>
                */}
                <MemberRowAction onDeleteMember={this.props.onDeleteMember} url_delete_member={this.props.url_delete_member} memberId={this.props.member.id} changeAppMode={this.props.changeAppMode} />
                {/*
                <span className="delete_member_confirm">
                    <div className='panel-footer clearfix'>
                        <div className='text-align-center'>
                            <button onClick={this.onDeleteMember}
                                className='btn btn-sm btn-danger m-r-1em'>Yes</button>
                            <button onClick={() => this.props.changeAppMode('read')}
                                className='btn btn-sm btn-primary'>No</button>
                        </div>
                    </div>
                </span>
                <span className="delete_member">
                    <a
                        onClick={() => this.props.changeAppMode('delete', this.props.member.id)}
                        className='btn btn-danger btn-sm'> Delete
                    </a>
                </span>
                */}
                
            </td>
            <td>
            {/*
            <a onClick={() => this.props.onDeleteMember(this.props.member.id)}
            className='btn btn-sm btn-danger m-r-1em'>Yes {this.props.member.id}</a>
            */}

            {
                this.state.confirmDelete ?
                <span>
                    <a onClick={this.onDelete}
                        className='btn btn-sm btn-danger m-r-1em'>Confirm</a>
                    <a onClick={this.oncancel}
                        className='btn btn-sm btn-primary'>Cancel</a>
                </span>
                :
                <span>
                    <a
                        onClick={() => this.props.changeAppMode('readOne', this.props.member.id)}
                        className='btn btn-info btn-sm m-r-1em'> Read One
                    </a>
                    <a
                        onClick={() => this.props.changeAppMode('update', this.props.member.id)}
                        className='btn btn-primary btn-sm m-r-1em'> Edit
                    </a>
                    <a
                        onClick={this.onConfirm}
                        className='btn btn-danger btn-sm'> Delete {this.props.member.id}
                    </a>
                </span>
            }
            
            </td>
        </tr>
        );
    }
}

export default MemberRow;