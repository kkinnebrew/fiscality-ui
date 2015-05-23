var React = require('react');
var TransactionsHeader = require('./transactions/transactions-header.jsx');
var TransactionsBody = require('./transactions/transactions-body.jsx');
var _ = require('underscore');

var TransactionsView = React.createClass({

  getInitialState: function() {
    return {
      transactions: this.props.viewmodel.transactions,
      sort: 'date',
      direction: 'asc'
    };
  },

  handleSort: function(column) {
    this.props.viewmodel.sortBy(column);
  },

  render: function() {

    return (
      <div className="transactions">
        <input type="text" value="123.00" />
        <TransactionsHeader onSort={this.handleSort} sort={this.state.sort} direction={this.state.direction} />
        <TransactionsBody data={this.state.transactions} />
      </div>
    )

  }

});

module.exports = TransactionsView;