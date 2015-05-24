var React = require('react');
var TransactionRow = require('./transaction-row.jsx');
var _ = require('underscore');

var TransactionsTable = React.createClass({

  getDefaultProps: function() {
    return {
      data: []
    };
  },

  onSelect: function() {
    console.log('select');
  },

  render: function() {

    var transactionRows = this.props.data.map(function(transaction) {
      return (
        <TransactionRow data={transaction} onSelect={this.handleSelect} />
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