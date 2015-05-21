var React = require('react');
var TransactionRow = require('./transaction-row.jsx');

var TransactionsTable = React.createClass({

  getDefaultProps: function() {
    return {
      sort: 'date',
      direction: 'asc',
      data: []
    };
  },

  getInitialState: function() {
    return {
      sort: this.props.sort,
      direction: this.props.direction,
      data: this.props.data
    }
  },

  render: function() {

    var transactionRows = this.state.data.map(function(transaction) {
      return (
        <TransactionRow data={transaction} />
      )
    });

    return (
      <div className="transaction-table">
        <div>Sort: {this.state.sort}, Direction: {this.state.direction}</div>
          {transactionRows}
      </div>
    )

  }

});

module.exports = TransactionsTable;