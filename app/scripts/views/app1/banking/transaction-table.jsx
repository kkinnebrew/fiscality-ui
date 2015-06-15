var React = require('react');
var TransactionRow = require('./transaction-row.jsx')
var TransactionEditRow = require('./transaction-edit-row.jsx')

var TransactionTable = React.createClass({

  getDefaultProps: function() {
    return {
      transactions: []
    };
  },

  render: function() {

    var transactionRows = this.props.transactions.map(function(transaction) {
      if (transaction.editing) {
        return (
          <TransactionEditRow transaction={transaction} />
        )
      } else {
        return (
          <TransactionRow transaction={transaction} />
        )
      }
    });

    return (
      <div id="transaction-table">
        <div className="table-head">
          <div className="header-row">
            <div className="header-column selected ascending">Date</div>
            <div className="header-column md">Type</div>
            <div className="header-column xl">Description</div>
            <div className="header-column right last">Balance</div>
            <div className="header-column right">Amount</div>
          </div>
        </div>
        <div className="table-body">
        {transactionRows}
        </div>
      </div>
    )
  }

});

module.exports = TransactionTable;