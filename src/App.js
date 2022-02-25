import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import 'dotenv/config';
import './App.css';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Rules from './pages/rules/rules'
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import DATA from './pages/task/task'
import {Container} from 'react-bootstrap'

import LevelOne from './pages/task/LevelOne'
import LevelTwo from './pages/task/LevelTwo'
import LevelThree from './pages/task/LevelThree'
import LevelFour from './pages/task/LevelFour'
import LevelFive from './pages/task/LevelFive'
import LevelSix from './pages/task/LevelSix'


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null 
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const Ref = await createUserProfileDocument(userAuth);
        await Ref.userRef.onSnapshot(async snapShot => {
          // //console.log(snapShot.data());
          await this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          // ,()=>{//console.log(this.state.currentUser)}
        });
      }else{
        this.setState({ currentUser: userAuth });
      }

      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  // handleHint=async ()=>{
  //     const {currentUser}=this.state;
  //     let {hint,score}=currentUser;
  //     //console.log(currentUser.id);
  //     if(hint[4])
  //     {
  //       hint[4]=true;
  //       const userRef=firestore.doc(`users/${currentUser.id}`); 
  //       //console.log(await (await userRef.get()).data());  
  //       // userRef.update({score:score-5});
  //     }
      
  // }

  render() {
    let currentUser=this.state.currentUser;
    return (
      <Container fluid className='app-main-container'>
        <Header {...currentUser} />
        
        {/* <button onClick={this.handleHint}>Hint</button> */}
        {/* <LevelOne {...currentUser}></LevelOne> */}
        <Switch>
          <Route exact path='*' component={SignInAndSignUpPage} />
          {/* <Route exact path='/rule' component={Rules} /> */}
          {/* <Route exact path='/manyokshi' render={()=><LevelOne {...DATA[0]} {...currentUser}></LevelOne>} /> */}
          {/* <Route exact path='/sciyokshi' render={()=><LevelTwo {...DATA[1]} {...currentUser}></LevelTwo>} /> */}
          {/* <Route exact path='/kinyokshi' render={()=><LevelThree {...DATA[2]} {...currentUser}></LevelThree>} /> */}
          {/* <Route exact path='/endgame' render={()=><LevelSix {...DATA[3]} {...currentUser}></LevelSix>} /> */}
          {/* <Route exact path='/' render={()=>currentUser?(<Redirect to='/rule'/>):<SignInAndSignUpPage/>}/> */}
          
        </Switch>
      </Container>
    );
  }
}

export default App;
