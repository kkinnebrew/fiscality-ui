var React = require('react');

var TransactionTable = React.createClass({

  getDefaultProps: function() {
    return {
      transactions: []
    };
  },

  render: function() {

    var transactionRows = this.props.transactions.map(function(transaction) {
      return (
        <div className="row">
          <div className="column">
            <div className="label">{transaction.date}</div>
          </div>
          <div className="column md">
            <div className="label">{transaction.transactionType}</div>
          </div>
          <div className="column xl">
            <div className="label">{transaction.description}</div>
            <div className="tags">
              <div className="tag">Interest</div>
              <div className="tag">Taxable</div>
            </div>
          </div>
          <div className="column right last">
            <div className="label">{transaction.balance}</div>
          </div>
          <div className="column right">
            <div className="label">{transaction.amount}</div>
          </div>
        </div>
      )
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