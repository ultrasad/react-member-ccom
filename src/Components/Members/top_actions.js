import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// component that contains the functionalities that appear on top of
// the products table: create product
class TopActionsComponent extends Component {
    /*constructor(props){
        super(props);
        this.state = {
            searchInput: this.props.searchInput
        }

        console.log('search input => ' + this.state.searchInput);
    }*/

    render(){

        //if(this.props.searchInput !== null){
            //console.log('search not null => ', this.props.searchInput);
        //}

        var searchInput = this.props.searchInput;

        return (
                <div className="container wrapper header">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="pull-left">
                                <h2>
                                {
                                    searchInput !== '' ?
                                        'Search results for "'  + searchInput + '":'
                                    :
                                        "Top members by Date"
                                }</h2>
                            </div>
                            <div className="pull-right">
                                <p>
                                    <Link to={'/members/create'} onClick={() => this.props.changeAppMode('create')} className='btn btn-primary btn-sm'>
                                        Create Member
                                    </Link>&nbsp;&nbsp;
                                    <Link to={'/members/import'} onClick={() => this.props.changeAppMode('import')} className="btn btn-sm btn-success">
                                        Import member
                                    </Link>
                                    
                                </p>
                            </div>
                            {/*
                            <div className="pull-right col-md-4">
                                <div className="input-group">
                                    <input type='text' ref='userName' className="form-control input-sm" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-info btn-sm" onClick={() => this.props.onSearchMember(this.refs.userName.value)}>Search</button>
                                    </span>
                                </div>
                            </div>
                            */}
                        </div>
                    </div>
                </div>
        );
    }
}

export default TopActionsComponent;