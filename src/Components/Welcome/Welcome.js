import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
//import './Welcome.css';

class Welcome extends Component {
    render() {

        $('.page-header h1').text('');

        return (
            <div className="row">
                <div className="medium-12 columns">
                    <h2 id="welcomeText">CCOM Dashboard</h2>
                    <Link to='/login'>
                        <button className="btn btn-info">Login</button>
                    </Link>&nbsp;
                    <Link to='/signup'>
                        <button className="btn btn-success">Signup</button>
                    </Link>&nbsp;
                    <Link to='/members'>
                        <button className="btn btn-primary">Members</button>
                    </Link>
                    {/*
                    <a href="/login" className="btn btn-info">Login</a>&nbsp;
                    <a href="/signup" className="btn btn-success">Signup</a>&nbsp;
                    <a href="/members" className="btn btn-primary">Members</a>
                    */}
                </div>
            </div>
        );
    }
}
export default Welcome;