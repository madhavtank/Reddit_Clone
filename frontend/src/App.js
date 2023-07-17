import Login from './components/signin'
import SignUp from './components/signup'
import Home from './components/Home';
import MySubg from './components/mysubg';
import Followers from './components/followers';
import Following from './components/following';
import Showstats from './components/stats';
import './App.css';
import './index.css';
import { useState } from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom'
import Header2 from './components/Header2'
import Header3 from './components/Header3'
import Profile from './components/profile';
// import { Dashboard } from '@mui/icons-material';
import Dashboard from './components/Dashboard';
import Protect from './components/protect';
import Protect_login from './protect_login';
import OpenSubg from './components/opensubg';
import Showusers from './components/users';
import AllSubgs from './components/allsubgs';
import Join_Req from './components/joinreq';
import Openthatsubg from './components/openthatsubg';
import Showsaved from './components/saved_posts';
import ShowReports from './components/reported';

function App() {

  const [curr, setCurr] = useState('login');

  const toggle = (fromname) => {
    setCurr(fromname);
  }

  var prev_info = window.localStorage.getItem("ok");

  const onlogout = () => {
    window.localStorage.setItem("ok", "0");
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={
          <div>
            <Header />
            <Home />
          </div>
        } />
        <Route exact path="/login-reg" element={
          <Protect_login>
          <div>
            <Header />
            {curr === "login" ? <Login onSwitch={toggle} /> : <SignUp onSwitch={toggle} />}
          </div>
          </Protect_login> 
        } />
        <Route exact path="/Dashboard" element={
          <Protect>
            <div>
              <Header2 onlogout={onlogout} />
              <Dashboard />
            </div>
          </Protect>
        } />
        <Route exact path="/Dashboard/profile" element={
          <Protect>
            <div>
              <Header2 onlogout={onlogout} />
              <Profile />
            </div>
          </Protect>
        } />
        <Route exact path="/mysubgs" element={
          <Protect>
            <div>
              <Header2/>
              <MySubg/>
            </div>
          </Protect>
        }/>
        <Route exact path='/opensubg' element={
          <Protect>
            <Header3/>
            <OpenSubg/>
          </Protect>
        }/>
        <Route exact path='/opensubg_users' element={
          <Protect>
            <Header3/>
            <Showusers/>
          </Protect>
        }/>
        <Route exact path='/opensubg_joinreq' element={
          <Protect>
            <Header3/>
            <Join_Req/>
          </Protect>
        }/>
        <Route exact path='/opensubg_stats' element={
          <Protect>
            <Header3/>
            <Showstats/>
          </Protect>
        }/>
        <Route exact path='/opensubg_reported' element={
          <Protect>
            <Header3/>
            <ShowReports/>
          </Protect>
        }/>
        <Route exact path='/allsubgs' element={
          <Protect>
            <AllSubgs/>
          </Protect>
        }/>
        <Route exact path='/openthatsubg' element={
          <Protect>
            <Openthatsubg/>
          </Protect>
        }/>
        <Route exact path='/saved_posts' element={
          <Protect>
            <Header2 onlogout={onlogout}/>
            <Showsaved/>
          </Protect>
        }/>
        <Route exact path='/followers' element={
          <Protect>
            <Header2 onlogout={onlogout}/>
            <Followers/>
          </Protect>
        }/>
        <Route exact path='/following' element={
          <Protect>
            <Header2 onlogout={onlogout}/>
            <Following/>
          </Protect>
        }/>
      </Routes>
    </div>
  );
}

export default App;