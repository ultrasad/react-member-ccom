import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Members from './Members';
import Routes from './routes';
import {Provider} from 'react-redux';

//import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from '../actions/types';

import {createStore, combineReducers, applyMiddleware} from 'redux';

//import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//this.state = { isAuthenticated: false, user: null, token: ''};

const authenticated = {
    isAuthenticated: false,
    userName: null,
    token: ''
}

const authReducer = (state=authenticated, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            state = { ...state, token: action.token, userName: action.userName, isAuthenticated: true }; //... is replace default value in state and edit some another value
        break;
        /*case UNAUTH_USER:
          return { ...state, authenticated: false, error: action.payload };
        case AUTH_ERROR:
          return { ...state, error: action.payload };
        case FORGOT_PASSWORD_REQUEST:
          return { ...state, message: action.payload.message };
        case RESET_PASSWORD_REQUEST:
          return { ...state, message: action.payload.message };
        case PROTECTED_TEST:
          return { ...state, content: action.payload.message };
          */
        default:
    }

    return state;
}

const initialStateEmployee = {
    fullname: 'Bundit Parameesee',
    salary: 20000,
    position: 'Programmer',
    value: []
}

const userReducer = (state={name:'Hanajung',age:20}, action) => {
    switch(action.type){
        case 'setName':
            state = {
                ...state,
                name: action.value
            }
        break;
        case 'setAge':
            state = {
                ...state,
                age: action.value
            }
        break;
        default:
    }

    return state;
}

const employeeReducer = (state=initialStateEmployee, action) => {
    switch(action.type){
        case 'ADD':
            //state+=action.payload;
            state = {
                //salary: state.salary += action.payload,
                //value: ...state.value
                //value: [...state.value, action.payload]
                
                //change option to Spread Operator
                ...state, //change every properties in state
                salary: state.salary += action.payload,
                value:[...state.value, action.payload]
            }
        break;
        case 'SUBTRACT':
                //state-=action.payload;
            state = {
                //change option to Spread Operator
                ...state, //change every properties in state
                salary: state.salary -= action.payload,
                value:[...state.value, -action.payload]
            }
        break;
        default:
    }
    return state;
}

const myLogger = (store) => (next) => (action) => {
    //console.log('Log Action: ', action);
    console.log('log action...');
    next(action);
}

//const store = createStore(reducer, 20000); //redux createStore
const employee = createStore(combineReducers({emp:employeeReducer, usr:userReducer, auth:authReducer}), {}, applyMiddleware(myLogger)); //redux createStore
employee.subscribe(() => {
    //console.log("Update Store: ", employee.getState());
    console.log('update store...');
});

//const sessionAuth = JSON.parse(sessionStorage.getItem('userData'));
//if((sessionAuth) && (sessionAuth.isAuthenticated === true)){
const sessionAuth = localStorage.getItem('userData');
if(sessionAuth){
    //console.log('session index page => ' + sessionAuth.isAuthenticated);
    employee.dispatch({ type: 'AUTH_USER' });
} else {
    console.log('login >>>>>');
}

/*
employee.dispatch({
    type: "ADD",
    payload: 1000
});

employee.dispatch({
    type: "ADD",
    payload: 2000
});

employee.dispatch({
    type: "ADD",
    payload: 10000
});

employee.dispatch({
    type: "SUBTRACT",
    payload: 8000
});

employee.dispatch({
    type: "SUBTRACT",
    payload: 5000
});

employee.dispatch({
    type: "setName",
    value: "Bundit"
});

employee.dispatch({
    type: "setAge",
    value: 31
});
*/

/*
const user = createStore(userReducer); //redux createStore

user.subscribe(() => {
    console.log("User: ", user.getState());
});

user.dispatch({
    type: "setName",
    value: "Hanajung"
});

user.dispatch({
    type: "setAge",
    value: 30
});
*/

//ReactDOM.render(<Members />, document.getElementById('content'));
ReactDOM.render(
    <Provider store={employee}>
        <Routes />
    </Provider>, document.getElementById('container'));
//registerServiceWorker();