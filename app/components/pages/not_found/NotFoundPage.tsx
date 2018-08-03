import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends React.PureComponent<{}, {}> {

  render() {
    return (
      <section>
        <h2>Page not found</h2>
        <Link to="/">Go back to home</Link>
      </section>
    );
  };
};
