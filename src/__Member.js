import React, { Component } from 'react';
import {connect} from 'react-redux';

//import { Switch, Route, Redirect } from 'react-router-dom';
//import $ from 'jquery';

import ReadMembersComponent from './Components/Members/read_members';
import ReadOneMemberComponent from './Components/Members/read_one_member';
import CreateMemberComponent from './Components/Members/create_member';
import ImportMemberComponent from './Components/Members/import_member'
import UpdateMemberComponent from './Components/Members/update_member';
import DeleteMemberComponent from './Components/Members/delete_member';
import ChangePasswordComponent from './Components/Members/change_password';

class Members extends Component {
  
      // initial mode is 'read' mode
      constructor(props){
          super(props);
          this.state = {
              //pageId: props.match.params.pageId,
              params: props.match.params,
              currentMode: 'read',
              memberId: null,
              memberName: null,
              url_all_member: 'http://172.22.228.225/membermanager/all_member/true',
              url_member_group: 'http://172.22.228.225/membermanager/member_group',
              url_create_member: 'http://172.22.228.225/membermanager/create_member',
              url_read_one_member: 'http://172.22.228.225/membermanager/read_member',
              url_update_member:'http://172.22.228.225/membermanager/update_member',
              url_delete_member: 'http://172.22.228.225/membermanager/delete_member',
              url_import_member: 'http://172.22.228.225/membermanager/import_member',
              url_change_password: 'http://172.22.228.225/membermanager/change_password',
              url_search_member: 'http://172.22.228.225/membermanager/search_password'
          }

          this.changeAppMode = this.changeAppMode.bind(this);
          this.onRender = this.onRender.bind(this);
      }

      componentWillMount() {
          if(this.state.params.userId !== undefined){
            console.log('user id ==> ' + this.state.params.userId);
            this.setState({memberId: this.state.params.userId, currentMode: 'readOne'},function afterStateChange(){
                console.log('state change => ', this.state);
            });
          }
      }
      
      //componentSidMount(){
        //console.log('did mounth');
      //}

      /*
      componentWillMount(){
        const PrimaryLayout = ({ match }) => (
            <div>
                <Switch>
                  {
                  <Route path={`${match.path}`} exact component={AppHomePage} />
                  <Route path={`${match.path}/users`} component={UserSubLayout} />
                  <Route path={`${match.path}/products`} component={ProductSubLayout} />
                  <Redirect to={`${match.url}`} />
                  }
                </Switch>
            </div>
        );
        console.log('will mounth');
      }
      */

      //componentDidMount(){
        //const { match: { params } } = this.props;
        //const { match: { params } } = props;
        //console.log('props match => ' + params);

        //this.setState({ params }, function afterStateChange(){
            //console.log('match => ' + this.state);
        //});
      //}
      
      // used when use clicks something that changes the current mode
      changeAppMode(newMode, memberId, memberName){
        //console.log('Change mode => ' + newMode + ' => ' + memberId + ' => ' + memberName);

        this.setState({currentMode: newMode});
        if(memberId !== undefined){
            this.setState({memberId: memberId});
        }

        if(memberName !== undefined){
        this.setState({memberName: memberName});
        }

        this.onRender();
      }

      onRender(){
        var modeComponent = <ReadMembersComponent params={this.state.params} usrMember={this.props.usr.name} changeName={this.props.changeName} url_all_member={this.state.url_all_member} url_delete_member={this.state.url_delete_member} url_search_member={this.state.url_search_member} changeAppMode={this.changeAppMode} />;
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneMemberComponent url_one_member={this.state.url_read_one_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                //console.log('Create member...');
                modeComponent = <CreateMemberComponent url_create_member={this.state.url_create_member} url_member_group={this.state.url_member_group} changeAppMode={this.changeAppMode}/>;
                break;
            case 'import':
                //console.log('Import member...');
                modeComponent = <ImportMemberComponent url_import_member={this.state.url_import_member} changeAppMode={this.changeAppMode}/>;
                break;
          case 'changePwd':
                //console.log('Change password...');
                modeComponent = <ChangePasswordComponent url_change_password={this.state.url_change_password} memberName={this.state.memberName} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdateMemberComponent url_one_member={this.state.url_read_one_member} url_member_group={this.state.url_member_group} url_update_member={this.state.url_update_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeleteMemberComponent url_delete_member={this.state.url_delete_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }

        //return PrimaryLayout;
        return modeComponent;
      }
    
      /*componentWillMount () {
            const script = document.createElement("script");
            script.type = 'text/javascript';
            script.src = "assets/js/bootstrap/bootstrap.min.js";
            script.async = false;
            document.body.appendChild(script);
      }*/
  
      // render the component based on current or selected mode
      render(){
          //console.log('Render main page...');
          //var modeComponent = <ReadOneMemberComponent url_one_member={this.state.url_read_one_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
          
          /*
          var modeComponent = <ReadMembersComponent params={this.state.params} usrMember={this.props.usr.name} changeName={this.props.changeName} url_all_member={this.state.url_all_member} url_delete_member={this.state.url_delete_member} url_search_member={this.state.url_search_member} changeAppMode={this.changeAppMode} />;
          switch(this.state.currentMode){
              case 'read':
                  break;
              case 'readOne':
                  modeComponent = <ReadOneMemberComponent url_one_member={this.state.url_read_one_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                  break;
              case 'create':
                  //console.log('Create member...');
                  modeComponent = <CreateMemberComponent url_create_member={this.state.url_create_member} url_member_group={this.state.url_member_group} changeAppMode={this.changeAppMode}/>;
                  break;
              case 'import':
                  //console.log('Import member...');
                  modeComponent = <ImportMemberComponent url_import_member={this.state.url_import_member} changeAppMode={this.changeAppMode}/>;
                  break;
            case 'changePwd':
                  //console.log('Change password...');
                  modeComponent = <ChangePasswordComponent url_change_password={this.state.url_change_password} memberName={this.state.memberName} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                  break;
              case 'update':
                  modeComponent = <UpdateMemberComponent url_one_member={this.state.url_read_one_member} url_member_group={this.state.url_member_group} url_update_member={this.state.url_update_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                  break;
              case 'delete':
                  modeComponent = <DeleteMemberComponent url_delete_member={this.state.url_delete_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                  break;
              default:
                  break;
          }

          //return PrimaryLayout;
          return modeComponent;
        */
        
        /*
        const PrimaryLayout = ({ match }) => (
            <div className="primary-layout">
              <main>
                <Switch>
                  <Route path='/members/id/:memberId' render={({match}) => (
                        <ReadOneMemberComponent url_one_member={this.state.url_read_one_member} memberId={match.params.memberId} changeAppMode={this.changeAppMode}/>
                  )} />
                  <Redirect to={`${match.url}`} />
                </Switch>
              </main>
            </div>
          )
          */

        /*
        <Switch>
            
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/members/page/:pageId" component={Members}/>
            <Route path="/members" component={Members}/>
            <Route path="*" component={NotFound}/>
            <Route render={() => {
                return <h1>Not Found!</h1>
            }} />
        </Switch>
        */
        
        /*
        <div>
            <Route render={() => {
                return <h1>Not Found!</h1>
            }} />
        </div>
        */

        return this.onRender();
      }
}

//change state to properties
const mapStateToProps = (state) => {
    return {
        emp: state.emp, //employeeReducer
        usr: state.usr //userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeName:(name) => {
            dispatch({
                type:"setName",
                value: name
            });
        }
    }
}

// leanpub-start-insert
/*
const mapRouter = ({ path, component }) => {
    const pathname = window.location.pathname;
    console.log('route path name => ' + pathname);
    if (pathname.match(path)) {
        return (
            <div>xxx</div>
            //React.createElement(component)
            //<Route path='/members/id/:memberId' render={({match}) => (
                //<ReadOneMemberComponent url_one_member={this.state.url_read_one_member} memberId={match.params.memberId} changeAppMode={this.changeAppMode}/>
            //)} />
        );
    } else {
        return null;
    }
}
*/
// leanpub-end-insert

//export default Members;
export default connect(mapStateToProps, mapDispatchToProps)(Members);