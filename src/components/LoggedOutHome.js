// @flow
import React from 'react';
import { Box } from '@coursera/coursera-ui';
import { Redirect } from 'react-router-dom';

import { graphql, gql, compose } from 'react-apollo';

import { CLIENT_ID, DOMAIN } from 'src/constants/config';
import LoginAuth0 from 'src/components/LoginAuth0';
import MakeAThonAnim from 'src/components/MakeAThonAnim';

type Props = {
  loading: Boolean,
  isLoggedIn: Boolean,
  error: any,
};

function LoggedOutHome({ loading, isLoggedIn, error, ...rest }: Props) {
  // Redirect if user is logged in.
  if (isLoggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <Box
      style={{ width: '100vw', height: '100vh', backgroundColor: 'gray' }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {loading && <h1>Loading</h1>}
      {error && <h1>Error: {error}</h1>}
      {!loading &&
        !isLoggedIn &&
        !error && (
          <Box flexDirection="column" justifyContent="center" alignItems="center">
            <img
              className="m-b-2"
              src="https://s3.amazonaws.com/fedulab/web/logo_light.png"
              alt="Fedulabe"
            />
            <MakeAThonAnim />
            <h1 className="color-white m-b-1">Welcome to 9th Make-a-thon</h1>
            <LoginAuth0 clientId={CLIENT_ID} domain={DOMAIN} />
          </Box>
        )}
    </Box>
  );
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;

export default compose(
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
    props: ({ data, data: { loading, user, error } }) => ({
      error,
      loading,
      isLoggedIn: !!user,
      data,
    }),
  }),
)(LoggedOutHome);