import React, { Component } from 'react';
import $ from 'jquery';

import {connect} from 'react-redux';
import {withRouter, Redirect} from "react-router-dom";

import TopActionsComponent from './top_actions';
import MembersTable from './member_table';

import Header from '../../header';

// component that contains all the logic and other smaller components
// that form the Read Members view
class ReadMembersComponent extends Component {
    
    constructor(props){
        super(props);

        /*
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const pageId = params.get('p'); //page id
        const searchParams = params.get('s'); //page id

        let newCurrentPage = 1;
        let newNextPage = 2;
        let newPrevPage = 0;
        let newSearchParam = searchParams;

        console.log('page => ' + pageId + ', param => ' + searchParams);
        //console.log('pageId => ' + this.props.params.pageId);

        if(pageId !== undefined && pageId !== '' && pageId !== null){
             newCurrentPage = Number(pageId);
             newNextPage = Number(newCurrentPage + 1);
             newPrevPage = Number(newCurrentPage - 1);
        }
        
        if(searchParams !== undefined && searchParams !== '' && searchParams !== null){
            console.log('new search param => ' + searchParams);
            newSearchParam = searchParams;
        } else {
            newSearchParam = '';
        }
        

        this.initialState = {
            searchInput: newSearchParam,
            memberPerPage: 10,
            memberCurrentPage: newCurrentPage,
            showPrev: false,
            memberPrevPage: newPrevPage,
            memberNextPage: newNextPage,
            memberResults: 0,
            showNextpage: false
        }
        */

        this.initialState = {
            searchInput: '',
            memberPerPage: 10,
            memberCurrentPage: 1,
            showPrev: false,
            memberPrevPage: 0,
            memberNextPage: 2,
            memberResults: 0,
            showNextpage: false,
            checkAuth: false,
            Unauthorized: false
        }

        this.state = this.initialState;

        /*
        this.state = {
            //...defaultState
            //confirmDelete: false
            //members: [],
            //test: 100,
            
            searchInput: newSearchParam,
            memberPerPage: 10,
            memberCurrentPage: newCurrentPage,
            showPrev: false,
            memberPrevPage: newPrevPage,
            memberNextPage: newNextPage,
            memberResults: 0,
            showNextpage: false
            
            //memberPrevPage: '/members',
            //memberNextPage: '/members/page/2'
        }
        */

        //console.log('props page id => ' + this.props.params.pageId + ' url_search_member => ' + this.props.url_search_member);
        
        this.onDeleteMember = this.onDeleteMember.bind(this);
        this.onSearchMember = this.onSearchMember.bind(this);
        this.requestMember = this.requestMember.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.clearState = this.clearState.bind(this);
        this.getAuthenticationToken = this.getAuthenticationToken.bind(this);
        
        //this.currentNextPage = this.currentNextPage.bind(this);
        //this.currentPrevPage = this.currentPrevPage.bind(this);
        //console.log('Read member => ' + this.props.url_all_member);

        //console.log('member base_url => ' + this.props.base_url);
    }

    _onSearchMember(e){
        //console.log('member name => ' + e.target.value);
        let  memberSearch = e.target.value;
        if(memberSearch !== undefined && (e.key === 'Enter')){
            
            this.setState({
                searchInput: memberSearch
            }, function onStateChange(){
                console.log('member search => ', this.state.searchInput);
            });

            //this.props.history.push("/new/url");
            this.props.history.push("/members/?s=" + memberSearch);

            //console.log('member search => ', this.state.searchInput + ' => ' + this.props.url_search_member);

            $.ajax({
                url: this.props.url_search_member,
                type : "POST",
                dataType: 'json',
                data: {'username': memberSearch},
                success : function(response) {
                    //console.log('response => ' + response);
                    
                    //let members = this.state.members;
                    //let index = members.findIndex(x => x.id === memberId);
                    //members.splice(index, 1);
                    //this.setState({members});//like members:members

                    console.log('showNextpage => ', this.state.showNextpage);
                    if(response.results > this.state.memberPerPage){
                        this.setState({
                            showNextpage: true
                        });
                    } else {
                        this.setState({
                            showNextpage: false
                        });
                    }
                    
                    this.setState({
                        members: response.members,
                        memberResults: response.results
                    });

                    console.log('memberResults => '  + response.results);
                    
                }.bind(this), //use for bind props changeAppMode
                error: function(xhr, resp, text){
                    // show error in console
                    console.log(xhr, resp, text);
                }
            });
        }
    }

    onDeleteMember(memberId){
        
        // member to delete
        //var memberId = this.props.memberId;

        //console.log('delete member => ' + memberId + ', url => ' + this.props.url_delete_member);
        
        // submit form data to api
        if(memberId !== undefined){

            //console.log('delete => ' + memberId);

            $.ajax({
                url: this.props.url_delete_member,
                type : "POST",
                //contentType : 'application/json',
                //data : JSON.stringify({'id' : productId}),
                data: {'id': memberId},
                success : function(response) {
                    //console.log('delete => ' + response);
                    
                    //var array = this.state.members;
                    //var index = array.indexOf(memberId)
                    //array.splice(index, 1);
                    //this.setState({members: array });
                    
                    let members = this.state.members;
                    let index = members.findIndex(x => x.id === memberId);
                    members.splice(index, 1);
                    this.setState({members});//like members:members

                    //this.forceUpdate();
                    //this.props.changeAppMode('read');
                }.bind(this), //use for bind props changeAppMode
                error: function(xhr, resp, text){
                    // show error in console
                    console.log(xhr, resp, text);
                }
            });
            
        }
    }

    //nextpage
    nextPage(){

        //console.log(this.state);

        //this.setState({
            //test: 200
        //});

        //console.log('old currentPage => ' + this.state.memberCurrentPage);
        let newCurrentPage = Number(this.state.memberCurrentPage + 1);
        let newNextPage = Number(newCurrentPage + 1);
        let prevPage = Number(newCurrentPage - 1);
        //console.log('old currentPage => ' + this.state.memberCurrentPage);
        //console.log('nextPage => ' + newNextPage);

        //this.setState({
            //memberCurrentPage: newCurrentPage
        //});
        
        console.clear();
        //console.log('check in toggle before set state', this.state);
        this.setState({
            memberCurrentPage: newCurrentPage,
            memberNextPage: newNextPage,
            memberPrevPage: prevPage
            //memberNextPage: '/members/page/'+ newNextPage,
            //memberPrevPage: '/members/page/'+ prevPage
        },function afterStateChange () {
            this.requestMember();
        });
        //console.log('check in toggle after set state', this.state);

       /* this.setState({
            memberCurrentPage: newCurrentPage,
            memberNextPage: '/members?p='+ newNextPage,
            memberPrevPage: '/members?p='+this.state.memberCurrentPage
        }, () => {
            console.log(this.state);
        });*/

        //console.log(this.state);
        
        //console.log('new currentPage => ' + this.state.memberCurrentPage);
        //this.requestMember();
    }

    prevPage(){
        //console.log('old currentPage => ' + this.state.memberCurrentPage);
        //console.log(this.state);

        let newCurrentPage = Number(this.state.memberCurrentPage - 1);
        let newNextPage = Number(newCurrentPage + 1);
        let prevPage = Number(newCurrentPage - 1);

        console.clear();
        //console.log('check in toggle before set state', this.state);
        this.setState({
            memberCurrentPage: newCurrentPage,
            memberNextPage: newNextPage,
            memberPrevPage: prevPage
            //memberNextPage: '/members/page/'+ newNextPage,
            //memberPrevPage: '/members/page/'+ prevPage
        },function afterStateChange() {

            if(this.state.memberCurrentPage === 1){
                console.log('hide prev >>');
                this.setState({
                    showPrev: false
                });
            }

            this.requestMember();
        });
        //console.log('check in toggle after set state', this.state);
        
        /*console.log('currentPage => ' + currentPage);
        console.log('prevPage => ' + prevPage);
        this.setState({
            memberCurrentPage: currentPage,
            memberNextPage: '/members?p='+this.state.memberCurrentPage,
            memberPrevPage: '/members?p='+prevPage
        });

        console.log('new currentPage => ' + this.state.memberCurrentPage);
        this.requestMember();
        */
    }

    onSearchMember(memberSearch){

        //const { match: { params }, history } = this.props;
        //console.log('props match => ' + params.toSource() + ', history => ' + history.toSource());

        //console.log('member name => ' + memberSearch);
        //let  memberSearch = e.target.value;
        if(memberSearch !== undefined){
            
            this.setState({
                searchInput: memberSearch,
                memberCurrentPage: 1,
                memberNextPage: 2,
                memberPrevPage: 0
            }, function onStateChange(){
                this.requestMember();
                //console.log('member search => ', this.state.searchInput);
            });

            //this.props.history.push("/new/url");
            this.props.history.push("/members/?s=" + memberSearch);
            //console.log('member search => ', this.state.searchInput + ' => ' + this.props.url_search_member);
            //this.requestMember();

            /*
            $.ajax({
                url: this.props.url_search_member,
                type : "POST",
                dataType: 'json',
                data: {'username': memberSearch},
                success : function(response) {
                    //console.log('response => ' + response);
                    
                    //let members = this.state.members;
                    //let index = members.findIndex(x => x.id === memberId);
                    //members.splice(index, 1);
                    //this.setState({members});//like members:members

                    console.log('showNextpage => ', this.state.showNextpage);
                    if(response.results > this.state.memberPerPage){
                        this.setState({
                            showNextpage: true
                        });
                    } else {
                        this.setState({
                            showNextpage: false
                        });
                    }
                    
                    this.setState({
                        members: response.members,
                        memberResults: response.results
                    });

                    console.log('memberResults => '  + response.results);
                    
                }.bind(this), //use for bind props changeAppMode
                error: function(xhr, resp, text){
                    // show error in console
                    console.log(xhr, resp, text);
                }
            });
            */
        }
    }

    getAuthenticationToken(){
        //console.log('=> ' + localStorage.getItem('userData'));
        if(localStorage.getItem('userData') === null){
            //console.log('log check login >>>');
            //return (<Redirect to={'/login'} />);
            //this.setState({Unauthorized: true});
            //this.props.history.push('/login');
            return false;
        } else {
            return JSON.parse(localStorage.getItem('userData')).token;
        }

        //return JSON.parse(localStorage.getItem('userData')).token;
    }

    requestMember(e){
        //this.props.auth
        let token = '';
        if(this.state.checkAuth === true){
            token = this.getAuthenticationToken();
            this.setState({checkAuth: false});
        }
        
        //console.log('this memberCurrentPage => ' + this.state.memberCurrentPage + ' token ==> ' + this.getAuthenticationToken());
        this.serverRequestMember = $.ajax({
            data: {page_length:this.state.memberPerPage, page_start:this.state.memberCurrentPage, username: this.state.searchInput, token: token},
            url: this.props.url_all_member,
            dataType: 'json',
            //crossDomain:true,
            success: function(response) {
                //console.log('member data => ' + data.members);

                if(response.code === '401'){
                    this.setState({Unauthorized: true});
                }

                //console.log('showNextpage => ', this.state.showNextpage);
                //console.log('member page count  => ', (this.state.memberPerPage * this.state.memberCurrentPage));
                if((response.results) > (this.state.memberPerPage * this.state.memberCurrentPage)){
                    console.log('member more one page >> ');
                    this.setState({
                        showNextpage: true
                    });
                } else {
                    //console.log('member only one page >> ');
                    this.setState({
                        showNextpage: false
                    });
                }

                this.setState({
                    members: response.members,
                    memberResults: response.results
                });

                //console.log('memberResults => ', response.results);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url_all_member, status, err.toString());
            }.bind(this)
        });
    }
    
    // on mount, fetch all members and stored them as this component's state
    componentDidMount() {

        //const { match: { params } } = this.props;
        //console.log('match params => ' + params);
        /*this.setState({ params }, function afterStateChange(){
            console.log('match => ' + this.state);
        });*/

        //if(this.props.params.searchParam !== undefined){
            //console.log('searech param => ' + this.props.params.searchParam + ', => '+ this.props.location.search);
        //}

        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const pageId = params.get('p'); //page id
        const searchParams = params.get('s'); //page id

        let newCurrentPage = 1;
        let newNextPage = 2;
        let newPrevPage = 0;
        let newSearchParam = searchParams;

        //console.log('page => ' + pageId + ', param => ' + searchParams);
        //console.log('pageId => ' + this.props.params.pageId);

        if(pageId !== undefined && pageId !== '' && pageId !== null){
             newCurrentPage = Number(pageId);
             newNextPage = Number(newCurrentPage + 1);
             newPrevPage = Number(newCurrentPage - 1);
        }
        
        if(searchParams !== undefined && searchParams !== '' && searchParams !== null){
            console.log('new search param => ' + searchParams);
            newSearchParam = searchParams;
        } else {
            newSearchParam = '';
        }

        this.setState({
            searchInput: newSearchParam,
            memberCurrentPage: newCurrentPage,
            memberPrevPage: newPrevPage,
            memberNextPage: newNextPage,
            checkAuth: true
        }, function onStateChange(){
            console.log('request member >>>');
            this.requestMember();
        });

        /* master use
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const pageId = params.get('p'); //page id
        const searchParams = params.get('s'); //page id

        let newCurrentPage = this.state.memberCurrentPage;
        let newNextPage = this.state.memberNextPage;
        let prevPage = this.state.memberPrevPage;
        let newSearchParam = this.state.searchInput;

        console.log('page => ' + pageId + ', param => ' + searchParams);
        //console.log('pageId => ' + this.props.params.pageId);

        if(pageId !== undefined && pageId !== '' && pageId !== null){
             newCurrentPage = Number(pageId);
             newNextPage = Number(newCurrentPage + 1);
             prevPage = Number(newCurrentPage - 1);
        }
        
        if(searchParams !== undefined && searchParams !== '' && searchParams !== null){
            console.log('new search param => ' + searchParams);
            newSearchParam = searchParams;
        }

        this.setState({
            memberCurrentPage: newCurrentPage,
            memberNextPage: newNextPage,
            memberPrevPage: prevPage,
            searchInput: newSearchParam
            //memberNextPage: '/members/page/'+ newNextPage,
            //memberPrevPage: '/members/page/'+ prevPage
        }, function afterStateChange () {
            console.log('did mount search input => ' + this.state.toSource());
            this.requestMember();
        });
        */

        /*
        if(this.props.params.pageId !== undefined){   
            //this.requestMember();
            let newCurrentPage = Number(this.props.params.pageId);
            let newNextPage = Number(newCurrentPage + 1);
            let prevPage = Number(newCurrentPage - 1);
            //console.log('old currentPage => ' + this.state.memberCurrentPage);
            //console.log('nextPage => ' + newNextPage);
    
            //this.setState({
                //memberCurrentPage: newCurrentPage
            //});
            
            //console.clear();
            //console.log('check in toggle before set state', this.state);
            this.setState({
                memberCurrentPage: newCurrentPage,
                memberNextPage: newNextPage,
                memberPrevPage: prevPage
                //memberNextPage: '/members/page/'+ newNextPage,
                //memberPrevPage: '/members/page/'+ prevPage
            },function afterStateChange () {
                this.requestMember();
            });
            //console.log('check in toggle after set state', this.state);

        } else {
            this.requestMember();
        }
        */
        //this.serverRequestBlaBlaBla
    }
    
    // on unmount, kill member fetching in case the request is still pending
    componentWillUnmount() {
        //console.log('kill process request member >>>');
        this.serverRequestMember.abort();
    }

    componentDidUpdate(){
        //var filteredMembers = this.state.members;
    }
    
    clearState(){

        console.log('defaultState => ' + this.initialState.toSource());

        this.setState(this.initialState, function afterStateChange(){
            this.requestMember();
        });
        console.log('clear state...');
    }
    
    // render component on the page
    render() {

        //Unauthorized
        if(this.state.Unauthorized === true){
            //sessionStorage.removeItem('userData');

            console.log('redirect to login >>>');
            if(localStorage.removeItem('userData') || (localStorage.getItem('userData') === null)){
                console.log('Unauthorized, remove userData');
                return (<Redirect to='/login' />);
            }
        }

        // list of members
        var filteredMembers = this.state.members;
        var searchInput = this.state.searchInput;
        var memberResults = this.state.memberResults;
        var showNextpage = this.state.showNextpage;
        var memberCurrentPage = this.state.memberCurrentPage;

        var memberNextPage = '/members/?p=' + this.state.memberNextPage;
        var memberPrevPage = '/members/?p=' + this.state.memberPrevPage;
        if(memberCurrentPage === 2){
            memberPrevPage = '/members';
        }

        //if(searchInput !== '' && searchInput !== null && searchInput !== undefined){
        if(searchInput !== ''){
            console.log('search input render  =>' + searchInput + '<===');
            memberNextPage = '/members/?s='+searchInput+'&p=' + this.state.memberNextPage;
            memberPrevPage = '/members/?s='+searchInput+'&p=' + this.state.memberPrevPage;
            memberPrevPage = '/members/?s='+searchInput;
        }

        //console.log('showNextpage => ', showNextpage);

        //$('.page-header h1').text('Members List, User: ' + this.props.usrMember);
        $('.page-header h2').text('Members List');

        //console.log('searchInput render <==> ' + searchInput);
        //console.log('filteredMembers ==> ' + filteredMembers);

        return (
            <main role="main" className="wrapper">
                <div className='overflow-hidden'>
                    <Header searchInput={searchInput} clearState={this.clearState} searchBox={true} onSearchMember={this.onSearchMember} requestMember={this.state.requestMember} />
                    <TopActionsComponent searchInput={searchInput} changeName={this.props.changeName} changeAppMode={this.props.changeAppMode} />
                    <div className="container wrapper main">
                    <MembersTable
                        url_delete_member={this.props.url_delete_member}
                        members={filteredMembers}
                        memberResults={memberResults}
                        showNextpage={showNextpage}
                        changeAppMode={this.props.changeAppMode}
                        onDeleteMember={this.onDeleteMember}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}
                        memberNextPage={memberNextPage}
                        memberPrevPage={memberPrevPage}
                        memberCurrentPage={memberCurrentPage} />
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth, //authUser
    }
}

export default connect(mapStateToProps)(withRouter(ReadMembersComponent));