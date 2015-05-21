var React = require('react');
var ReactMixin = require('../../../common/react-mixin.js');
var TransactionsHeader = require('./transactions/transactions-header.jsx');

var data = [
  {
    date: '8/11/2014',
    transactionType: 'Direct Deposit',
    description: 'West Monroe Partners',
    amount: '$903.02',
    balance: '$2,390.01'
  },
  {
    date: '8/12/2014',
    transactionType: 'Bill Pay',
    description: 'West Monroe Partners',
    amount: '$903.02',
    balance: '$2,390.01'
  },
  {
    date: '8/13/2014',
    transactionType: 'Transfer',
    description: 'West Monroe Partners',
    amount: '$903.02',
    balance: '$2,390.01'
  }
];

var TransactionsView = React.createClass({

  mixins: [ReactMixin],

  getInitialState: function() {
    return {
      data: [],
      sort: 'date',
      direction: 'asc'
    };
  },

  handleSort: function(column) {

    if (this.state.sort == column) {

      if (this.state.direction == 'asc') {
        this.setState({ direction: 'desc' });
      } else {
        this.setState({ direction: 'asc' });
      }

    } else {
      this.setState({ sort: column, direction: 'asc' });
    }

  },

  render: function() {

    return (
      <div>
        <TransactionsHeader onSort={this.handleSort} sort={this.state.sort} direction={this.state.direction} />
      </div>
    )

  }

});

module.exports = TransactionsView;