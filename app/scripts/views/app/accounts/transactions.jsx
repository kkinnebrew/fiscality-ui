var React = require('react');
var ReactMixin = require('../../../common/react-mixin.js');
var TransactionsHeader = require('./transactions/transactions-header.jsx');
var TransactionsBody = require('./transactions/transactions-body.jsx');
var _ = require('underscore');

var data = [
  {
    date: '8/11/2014',
    transactionType: 'Direct Deposit',
    description: 'West Monroe Partners',
    amount: '1',
    balance: '$2,390.01'
  },
  {
    date: '8/12/2014',
    transactionType: 'Bill Pay',
    description: 'West Monroe Partners',
    amount: '4',
    balance: '$2,390.01'
  },
  {
    date: '8/13/2014',
    transactionType: 'Transfer',
    description: 'West Monroe Partners',
    amount: '2',
    balance: '$2,390.01'
  },
  {
    date: '8/11/2014',
    transactionType: 'Direct Deposit',
    description: 'West Monroe Partners',
    amount: '1',
    balance: '$2,390.01'
  },
  {
    date: '8/12/2014',
    transactionType: 'Bill Pay',
    description: 'West Monroe Partners',
    amount: '4',
    balance: '$2,390.01'
  },
  {
    date: '8/13/2014',
    transactionType: 'Transfer',
    description: 'West Monroe Partners',
    amount: '2',
    balance: '$2,390.01'
  },
  {
    date: '8/11/2014',
    transactionType: 'Direct Deposit',
    description: 'West Monroe Partners',
    amount: '1',
    balance: '$2,390.01'
  },
  {
    date: '8/12/2014',
    transactionType: 'Bill Pay',
    description: 'West Monroe Partners',
    amount: '4',
    balance: '$2,390.01'
  },
  {
    date: '8/13/2014',
    transactionType: 'Transfer',
    description: 'West Monroe Partners',
    amount: '2',
    balance: '$2,390.01'
  },
  {
    date: '8/11/2014',
    transactionType: 'Direct Deposit',
    description: 'West Monroe Partners',
    amount: '1',
    balance: '$2,390.01'
  },
  {
    date: '8/12/2014',
    transactionType: 'Bill Pay',
    description: 'West Monroe Partners',
    amount: '4',
    balance: '$2,390.01'
  },
  {
    date: '8/13/2014',
    transactionType: 'Transfer',
    description: 'West Monroe Partners',
    amount: '2',
    balance: '$2,390.01'
  },
  {
    date: '8/11/2014',
    transactionType: 'Direct Deposit',
    description: 'West Monroe Partners',
    amount: '1',
    balance: '$2,390.01'
  },
  {
    date: '8/12/2014',
    transactionType: 'Bill Pay',
    description: 'West Monroe Partners',
    amount: '4',
    balance: '$2,390.01'
  },
  {
    date: '8/13/2014',
    transactionType: 'Transfer',
    description: 'West Monroe Partners',
    amount: '2',
    balance: '$2,390.01'
  }
];

var TransactionsView = React.createClass({

  mixins: [ReactMixin],

  getInitialState: function() {
    return {
      data: data,
      sort: 'date',
      direction: 'asc'
    };
  },

  handleSort: function(column) {

    if (this.state.sort == column) {

      if (this.state.direction == 'asc') {
        this.setState({ direction: 'desc', data: this.state.data.reverse() });
      } else {
        this.setState({ direction: 'asc', data: this.state.data.reverse() });
      }

    } else {
      this.setState({ sort: column, direction: 'asc', data: _.sortBy(this.state.data, column) });
    }

  },

  render: function() {

    return (
      <div className="transactions">
        <TransactionsHeader onSort={this.handleSort} sort={this.state.sort} direction={this.state.direction} />
        <TransactionsBody data={this.state.data} />
      </div>
    )

  }

});

module.exports = TransactionsView;