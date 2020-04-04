import React, { useEffect } from 'react';
import SubBanner from '../../components/Banner/SubBanner/SubBanner';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './WelcomePage.css';
import * as userActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const WelcomePage = () => {
  const token = localStorage.getItem('token');

  const user = useSelector(state => state.user.user);
  const loading = useSelector(state => state.user.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const onFetchUser = token => dispatch(userActions.fetchUser(token));
    onFetchUser(token);
  }, [dispatch, token]);

  const welcomeMessage = (
    <div>
      <h2>Welcome {user && user.username}</h2>
      <p>
        We are glad to see you as part of our family. As a registered member,
        you would be able to enjoy our online appointment booking service.
        Contrast to calling us to do that, everything is availabe online for our
        members. Start booking now and we look forward to helping you resolve
        concerns.
      </p>
    </div>
  );

  return (
    <div>
      {!user && <Redirect to="/signIn" />}
      <SubBanner title={'Welcome'} />
      <section className="ContactDataForm">
        {loading && <Spinner />}
        {welcomeMessage}
      </section>
    </div>
  );
};

export default WelcomePage;
