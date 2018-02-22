import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchBox: this.props.searchBox,
            searchInput: this.props.searchInput
        }

        this.onSearchChange = this.onSearchChange.bind(this);
        console.log('header search props >>' + this.props.searchBox);
        console.log('this props searchInput => ' + this.props.searchInput);
    }

    //componentDidMount() {
        //console.log('search input ===>>> ' + this.props.searchInput);
        //this.setState({searchInput: this.props.searchInput});
    //}

    onSearchChange(e){
        console.log('do search', e.target.value);
        this.setState({
            searchInput: e.target.value
        });

        if (e.key === 'Enter') {
            console.log('do search enter: ', e.target.value);
            this.props.onSearchMember(e.target.value);
        }
    }
    
    componentDidMount () {
        console.log('header didmount..');
        //this.setState({name: this.props.data.name});
    }

    componentWillReceiveProps(nextProps){
        //console.log('next props searchInput => ' + nextProps.searchInput);
        this.setState({
            searchInput: nextProps.searchInput
        });
    }

    render(){

        //var searchInput = this.props.searchInput;
        //console.log('header => ' + searchInput);

        return (
            <header role="banner">
                <div className="container wrapper clearfix">
                    <Link to="/members" onClick={this.props.clearState} className="title" title="CCOM Member manager">
                        {/*<div className="header-account" style={{ height: '32px', width:'32px', float: 'left', 'font-size':'2rem'}}>*/}
                        <div className="header-account" style={{}}>
                            <svg className="account-circle" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </div>
                        <h1><i className="icon-member"></i>Members Management</h1>
                    </Link>
                        <div className="search" id="search">
                        {
                            this.state.searchBox === true ?
                                <input ref='userName' placeholder="Search..." onChange={this.onSearchChange} onKeyPress={this.onSearchChange} value={this.state.searchInput} name="search" type="search" />
                            : ''
                        }
                        </div>
                    <div className="menu-button" style={{ height: '57px'}}><svg className="heart" xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32">
                        <path strokeWidth="2" d="M9.3 1C4.8 1 1 5.2 1 9.3 1 18.5 10.4 21 16.6 30 22.4 21 32 18.4 32 9.4c0-4-3.8-8.3-8.3-8.3-3.2 0-6.3 2-7.3 5C15 3 12.2 1.2 9 1.2z"></path>
                        </svg>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;