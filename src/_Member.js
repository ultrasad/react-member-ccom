import React, { Component } from 'react';
//import $ from 'jquery';

import ReadMembersComponent from './Components/Members/read_members';
import ReadOneMemberComponent from './Components/Members/read_one_member';
import CreateMemberComponent from './Components/Members/create_member';
import UpdateMemberComponent from './Components/Members/update_member';
import DeleteMemberComponent from './Components/Members/delete_member';

class Members extends Component {
  
      // initial mode is 'read' mode
      constructor(props){
          super(props);
          this.state = {
              currentMode: 'read',
              memberId: null,
              url_all_member: 'http://172.22.228.225/membermanager/all_member',
              url_member_group: 'http://172.22.228.225/membermanager/member_group',
              url_create_member: 'http://172.22.228.225/membermanager/create_member'
          }

          this.changeAppMode = this.changeAppMode.bind(this);
      }
      
      // used when use clicks something that changes the current mode
      changeAppMode(newMode, memberId){
          console.log('Change mode => ' + newMode + ' => ' + memberId);

          this.setState({currentMode: newMode});
          if(memberId !== undefined){
              this.setState({memberId: memberId});
          }
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
          console.log('Render main page...');
          var modeComponent = <ReadMembersComponent source={this.state.url_all_member} changeAppMode={this.changeAppMode.bind(this)} />;
          switch(this.state.currentMode){
              case 'read':
                  break;
              case 'readOne':
                  modeComponent = <ReadOneMemberComponent memberId={this.state.id} changeAppMode={this.changeAppMode.bind(this)}/>;
                  break;
              case 'create':
                  console.log('Create member...');
                  modeComponent = <CreateMemberComponent source={this.state.url_create_member} source_group={this.state.url_member_group} changeAppMode={this.changeAppMode}/>;
                  break;
              case 'update':
                  modeComponent = <UpdateMemberComponent memberId={this.state.id} changeAppMode={this.changeAppMode.bind(this)}/>;
                  break;
              case 'delete':
                  modeComponent = <DeleteMemberComponent memberId={this.state.id} changeAppMode={this.changeAppMode.bind(this)}/>;
                  break;
              default:
                  break;
          }
          return modeComponent;
      }
  }

export default MainApp;