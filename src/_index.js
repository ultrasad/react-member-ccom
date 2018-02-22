import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import Members from './Members';
import Routes from './routes';

import {createStore, combineReducers, applyMiddleware} from 'redux';

import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
    console.log('Log Action: ', action);
    next(action);
}

//const store = createStore(reducer, 20000); //redux createStore
const employee = createStore(combineReducers({employeeReducer, userReducer}), {}, applyMiddleware(myLogger)); //redux createStore
employee.subscribe(() => {
    console.log("Update Store: ", employee.getState());
});

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
ReactDOM.render(<Routes />, document.getElementById('content'));
registerServiceWorker();