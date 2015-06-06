var React = require('react');

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