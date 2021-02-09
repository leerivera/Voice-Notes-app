import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'

// import App from './components/App'
// import Header from './components/stateless/Header'

import store from './redux/store'
import HomeContainer from './containers/HomeContainer'
import NoteDetailContainer from './containers/NoteDetailContainer'
import NoteEditContainer from './containers/NoteEditContainer'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/notes/:id" component={NoteDetailContainer} />
        <Route exact path="/notes/edit/:id" component={NoteEditContainer} />
      </Switch>
    </Router>
  </Provider>,

  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
