import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Translate from './components/translate';
import ChatHistoryNestedList from './components/chat'
import Header from './components/header'
import Message from './components/Messages'
import Consent from './components/consent'
import Tutorial from './components/tutorial'
import Home from './components/Home'
import CoverPage from './components/CoverPage'
import Ask from './components/ask';



function App() {
  return (
    <div className="App">
      <Header/>
      
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Redirect to="/home"/>
          </Route>
          <Route path='/messages/:index/:conv_id' component={Message} />
          <Route path = '/cover-page' component={CoverPage}/>
          {/* <Route path='/' component={Home} /> */}
          <Route path='/home' component={Home} />
          <Route path = '/consent' component={Consent}/>
          <Route path = '/tutorial' component={Tutorial}/>
          <Route path = '/translate' component={Translate}/>
          <Route path = '/chat-history' component={ChatHistoryNestedList}/>
          <Route path = '/ask' component={Ask}/>

        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
