var React = require('react');
var TransactionRow = require('./transaction-row.jsx');
var _ = require('underscore');

var TransactionsTable = React.createClass({

  getDefaultProps: function() {
    return {
      data: []
    };
  },

  render: function() {

    var transactionRows = this.props.data.map(function(transaction) {
      return (
        <TransactionRow data={transaction} />
      )
    });

    return (
      <div className="transactions-body">
          {transactionRows}
      </div>
    )

  }

});

module.exports = TransactionsTable;