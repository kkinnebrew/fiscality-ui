var React = require('react');
var $ = require('jquery');
var DateField = require('../common/date-field.jsx');
var TextField = require('../common/text-field.jsx');
var CurrencyField = require('../common/currency-field.jsx');
var SelectField = require('../common/select-field.jsx');

var TransactionEditRow = React.createClass({

  getDefaultProps: function() {
    return {
      transaction: {},
      types: [],
      accounts: []
    };
  },

  handleSave: function() {
    if (this.props.onSave && typeof this.props.onSave == 'function') {
      this.props.onSave.call(this, {
        transactionId: this.props.transaction.transactionId,
        date: this.refs.date.getValue(),
        transactionType: this.refs.type.getValue(),
        description: this.refs.description.getValue(),
        amount: this.refs.account ? this.refs.amount.getValue() : this.props.transaction.amount,
        toAccountId: this.refs.account ? this.refs.account.getValue() : undefined
      });
    }
  },

  handleCancel: function() {
    if (this.props.onCancel && typeof this.props.onCancel == 'function') {
      this.props.onCancel.call(this, this.props.transaction.transactionId);
    }
  },

  handleRemove: function() {
    if (this.props.onRemove && typeof this.props.onRemove == 'function') {
      this.props.onRemove.call(this, this.props.transaction.transactionId);
    }
  },

  render: function() {
    var transaction = this.props.transaction;
    var accountSelector = '';
    var amountSelector = '';
    if (!transaction.transactionId) {
      accountSelector = <SelectField className="field" options={this.props.accounts} ref="account" value={transaction.toAccountId} />;
      amountSelector = <CurrencyField className="field" ref="amount" value={transaction.amount} />;
    } else {
      amountSelector = <div className="label" ref="amount">{transaction.amount}</div>
    }
    return (
      <div className="row editing" data-key={transaction.transactionId}>
        <div className="column">
          <DateField className="field" ref="date" value={transaction.date} />
        </div>
        <div className="column md">
          <SelectField className="field" ref="type" options={this.props.types} value={transaction.transactionType} />
        </div>
        <div className="column xl">
          <TextField className="field" ref="description" value={transaction.description} />
          {accountSelector}
        </div>
        <div className="column lg right last">
          <div className="save-button" onClick={this.handleSave}>Save</div>
          <div className="remove-button" onClick={this.handleRemove}>Remove</div>
          <div className="cancel-button" onClick={this.handleCancel}>Cancel</div>
        </div>
        <div className="column right">
          {amountSelector}
        </div>
      </div>
    )
  }

});

module.exports = TransactionEditRow;