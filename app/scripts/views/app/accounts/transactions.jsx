var React = require('react');
var ReactMixin = require('../../../common/react-mixin.js');
var TransactionsHeader = require('./transactions/transactions-header.jsx');
var TransactionsBody = require('./transactions/transactions-body.jsx');
var _ = require('underscore');

var TransactionsView = React.createClass({

  mixins: [ReactMixin],

  getInitialState: function() {
    return {
      transactions: this.props.viewmodel.transactions,
      sort: 'date',
      direction: 'asc'
    };
  },

  handleSort: function(column) {

    if (this.state.sort == column) {

      if (this.state.direction == 'asc') {
        this.setState({ direction: 'desc', data: this.state.transactions.reverse() });
      } else {
        this.setState({ direction: 'asc', data: this.state.transactions.reverse() });
      }

    } else {
      this.setState({ sort: column, direction: 'asc', data: _.sortBy(this.state.transactions, column) });
    }

  },

  render: function() {

    return (
      <div className="transactions">
        <TransactionsHeader onSort={this.handleSort} sort={this.state.sort} direction={this.state.direction} />
        <TransactionsBody data={this.state.transactions} />
      </div>
    )

  }

});

module.exports = TransactionsView;