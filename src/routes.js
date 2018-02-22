import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Members from './Members';
import Welcome from '././Components/Welcome/Welcome';
import Login from '././Components/Login/Login';
import Home from '././Components/Home/Home';
import NotFound from '././Components/NotFound/NotFound';
import requireAuthentication from '././Components/Auth/requireAuthentication';

//let base_url = window.location.host;

var getUrl = window.location;
//var base_url = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
var base_url = getUrl.protocol + "//" + getUrl.host;
//var base_url = 'http://172.22.228.225';

if(base_url === 'http://localhost:3000'){
    base_url = 'http://172.22.228.225';
}


//let path_name = window.location.pathname;
//let base_name = path_name.split("/");
//base_name = '/' + base_name[1];

//let base_url = "<?php echo base_url; ?>";
//console.log('base url => ' + base_url);

console.log('base url => ' + base_url);
////console.log('path name => ', path_name);
//console.log('base name => ', base_name);

const AuthMembers = requireAuthentication(Members);
const Routes = ({ match }) => (
    <BrowserRouter basename='/'>
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/login" component={() => (<Login base_url={base_url} {...this.props} />)} />
            {/*<Route path="/login" component={Login} {...this.props} />*/}
            
            {/*
            <Route path="/members/id/:userId" component={Members}/>

            <Route path="/members/page/:pageId" component={Members}/>
            <Route path="/members/page/:pageId/:pathParam1?/:pathParam2?" component={Members} />
            <Route path="/members/?p=:pageId" component={Members}/>
            <Route path="/members/?s=:searchParam&p=:pageId" component={Members}/>
            */}
            
            {/*
            <Route
                {...rest}
                render={(props) => {
                if (loggingIn) return <div />;
                return authenticatedAdmin ?
                (<Component 
                    loggingIn={loggingIn} 
                    authenticatedAdmin={authenticatedAdmin} 
                    {...rest} 
                    {...props}
                />) :
                (<Redirect to="/login" />);
                }}
            />
            */}
            
            <Route path="/members" render={(props) => <AuthMembers base_url={base_url} {...props} />} />
            {/*<Route path="/members" component={requireAuthentication(Members)} />*/}
            <Route path="*" component={NotFound}/>
            <Route render={() => {
                return <h1>Not Found!</h1>
            }} />
        </Switch>
    </BrowserRouter>
);

export default Routes;