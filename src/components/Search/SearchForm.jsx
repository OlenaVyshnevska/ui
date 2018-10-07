import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import querystring from 'querystring';
import constants from '../constants';

class SearchForm extends React.Component {
  static propTypes = {
    strings: PropTypes.shape({}),
    small: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const params = querystring.parse(window.location.search.substring(1));
    const { pathname } = window.location;
    if (params.q && pathname === '/search') {
      this.props.dispatchSearch(params.q);
      this.state = {
        query: params.q,
      };
    } else {
      this.state = {};
    }
  }

  formSubmit = (e) => {
    const { query } = this.state;
    e.preventDefault();
    this.props.history.push(`/search?q=${query}`);
    this.props.dispatchSearch(query);
  };

  handleChange = (e) => {
    const { pathname } = window.location;
    const { value } = e.target;

    this.setState({
      query: value,
    });

    if (pathname === '/search') {
      this.debouncedSetQuery(value);
    }
  };

  render() {
    const { strings, small } = this.props;
    return (
      <form onSubmit={this.formSubmit}>
        <TextField
          id="searchField"
          hintText={strings.search_title}
          value={this.state.query}
          onChange={this.handleChange}
          fullWidth
          underlineFocusStyle={{
            borderColor: constants.primaryLinkColor,
            bottom: '-4px',
            left: '-40px',
            width: 'calc(100% + 40px)',
          }}
          style={{ width: small ? '150%' : '100%', whiteSpace: 'nowrap', overflow: 'hidden' }}
          underlineStyle={{ borderColor: 'transparent' }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});


export default withRouter(connect(mapStateToProps)(SearchForm));