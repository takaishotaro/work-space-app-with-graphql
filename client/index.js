import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'

import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashbord from './components/Dashbord'
import ReservationsList from './components/ReservationsList'
import ReservationDetail from './components/ReservationDetail'
import Booking from './components/Booking'

import requireAuth from './components/RequireAuth'
import BookingConfirm from './components/BookingConfirm';
import PlansList from './components/PlansList';
import PlanEdit from './components/PlanEdit';
import AddPlan from './components/AddPlan';

const networkInterface = createNetworkInterface({
  uri:  '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm}></Route>
          <Route path="signup" component={SignupForm}></Route>
          <Route path="booking" component={Booking}></Route>
          <Route path="booking/confirm" component={BookingConfirm}></Route>
          <Route path="dashbord" component={requireAuth(Dashbord)}></Route>
          <Route path="reservations" component={requireAuth(ReservationsList)}></Route>
          <Route path="reservation/:id" component={requireAuth(ReservationDetail)}></Route>
          <Route path="plans" component={requireAuth(PlansList)}></Route>
          <Route path="plan/:id" component={requireAuth(PlanEdit)}></Route>
          <Route path="addPlan" component={requireAuth(AddPlan)}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
