import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dearshboard from '../pages/Dearshboard/index';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/deashboard" component={Dearshboard} isPrivate />
    </Switch>
  );
};

export default Routes;
