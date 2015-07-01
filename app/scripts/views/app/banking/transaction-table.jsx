var React = require('react');
var TransactionRow = require('./transaction-row.jsx')
var TransactionEditRow = require('./transaction-edit-row.jsx')

var TransactionTable = React.createClass({

  getDefaultProps: function() {
    return {
      transactions: [],
      types: [],
      accounts: []
    };
  },

  handleEdit: function(key) {
    if (this.props.onEdit && typeof this.props.onEdit == 'function') {
      this.props.onEdit.call(this, key);
    }
  },

  handleSave: function(transaction) {
    if (this.props.onSave && typeof this.props.onSave == 'function') {
      this.props.onSave.call(this, transaction);
    }
  },

  handleCancel: function(key) {
    if (this.props.onCancel && typeof this.props.onCancel == 'function') {
      this.props.onCancel.call(this, key);
    }
  },

  handleRemove: function(key) {
    if (this.props.onRemove && typeof this.props.onRemove == 'function') {
      this.props.onRemove.call(this, key);
    }
  },

  render: function() {

    var that = this;

    var transactionRows = this.props.transactions.map(function(transaction) {
      if (transaction.editing) {
        return (
          <TransactionEditRow types={that.props.types}
                              accounts={that.props.accounts}
                              transaction={transaction}
                              onSave={that.handleSave}
                              onCancel={that.handleCancel}
                              onRemove={that.handleRemove}
                              key={transaction.transactionId} />
        )
      } else {
        return (
          <TransactionRow onClick={that.handleEdit} transaction={transaction} key={transaction.transactionId} />
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
            <div className="header-column lg right last">Balance</div>
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