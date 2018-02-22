import React, { Component } from 'react';
import {Link} from 'react-router-dom';

//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {blue500, red500, greenA200} from 'material-ui/styles/colors';
//import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
//import SvgIcon from 'material-ui/SvgIcon';

/*
const iconStyles = {
    marginRight: 24,
};
  
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
*/

// component that renders a single member row
class MemberRow extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            confirmDelete: false
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.oncancel = this.oncancel.bind(this);
        this.onDelete = this.onDelete.bind(this);

        //console.log('Member Row...');
    }

    onConfirm(){
        //console.log('confirm delete...');
        this.setState({confirmDelete: true});
    }

    oncancel(){
        //console.log('cancel delete...');
        this.setState({confirmDelete: false});
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
            <td>{this.props.member.email}</td>
            <td>{this.props.member.group_name}</td>
            <td>
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
                    {/*
                    <div>
                        <MuiThemeProvider>
                            <HomeIcon style={iconStyles} />
                            <ActionInfoOutline style={iconStyles} color={blue500} />
                        </MuiThemeProvider>
                    </div>
                    */}
                    <Link to={'/members/id/'+ this.props.member.id}
                        onClick={() => this.props.changeAppMode('readOne', this.props.member.id)}
                        className='btn btn-info btn-sm m-r-1em'>Info
                    </Link>
                    <Link to={'/members/id/'+this.props.member.id + '/password'}
                        onClick={() => this.props.changeAppMode('changePwd', this.props.member.id, this.props.member.username)}
                        className='btn btn-warning btn-sm m-r-1em'>PWD
                    </Link>
                    <Link to={'/members/id/' + this.props.member.id + '/edit'}
                        onClick={() => this.props.changeAppMode('update', this.props.member.id)}
                        className='btn btn-primary btn-sm m-r-1em'> Edit
                    </Link>
                    <a
                        onClick={this.onConfirm}
                        className='btn btn-danger btn-sm'> Del
                    </a>
                </span>
            }
            </td>
        </tr>
        );
    }
}

export default MemberRow;