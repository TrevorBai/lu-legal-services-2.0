import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './hoc/Layout/Layout';
import * as lazyLoader from './lazyLoader';

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route
        path="/appointments"
        render={props => <lazyLoader.NewAppointment {...props} />}
      />
      <Route
        path="/contact"
        render={props => <lazyLoader.ContactUs {...props} />}
      />
      <Route
        path="/signIn"
        render={props => <lazyLoader.SignInPage {...props} />}
      />
      <Route
        path="/passwordReset"
        render={props => <lazyLoader.PasswordReset {...props} />}
      />
      <Route
        path="/register"
        render={props => <lazyLoader.RegisterPage {...props} />}
      />
      <Route
        path="/welcome"
        render={props => <lazyLoader.WelcomePage {...props} />}
      />
      <Route
        path="/logout"
        render={props => <lazyLoader.LogoutPage {...props} />}
      />
      <Route
        path="/logoutAll"
        render={props => <lazyLoader.LogoutAllPage {...props} />}
      />
      <Route
        path="/profile"
        render={props => <lazyLoader.ProfilePage {...props} />}
      />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
