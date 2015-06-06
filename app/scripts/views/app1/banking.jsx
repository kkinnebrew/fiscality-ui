var React = require('react');
var BankingToolbar = require('./banking/toolbar.jsx');
var TransactionTable = require('./banking/transaction-table.jsx');
var TransactionDetail = require('./banking/transaction-detail.jsx');

var BankingView = React.createClass({

  render: function() {
    return (
      <div id="banking">
        <BankingToolbar />
        <TransactionTable />
        <TransactionDetail />
      </div>
    )
  }

});

module.exports = BankingView;