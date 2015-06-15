var React = require('react');
var $ = require('jquery');
var DateField = require('../common/date-field.jsx');
var TextField = require('../common/text-field.jsx');
var CurrencyField = require('../common/currency-field.jsx');
var SelectField = require('../common/select-field.jsx');

var TransactionEditRow = React.createClass({

  getDefaultProps: function() {
    return {
      transaction: {}
    };
  },

  handleSave: function() {
    if (this.props.onSave && typeof this.props.onSave == 'function') {
      this.props.onSave.call(this, {
        transactionId: this.props.transaction.transactionId,
        date: this.refs.date.getValue(),
        transactionType: this.refs.type.getValue(),
        description: this.refs.description.getValue(),
        amount: this.refs.amount.getValue()
      });
    }
  },

  handleCancel: function(e) {
    if (this.props.onCancel && typeof this.props.onCancel == 'function') {
      var key = $(e.currentTarget).attr('data-key');
      this.props.onCancel.call(this, key);
    }
  },

  render: function() {
    var transaction = this.props.transaction;
    return (
      <div className="row editing" data-key={transaction.transactionId}>
        <div className="column">
          <DateField className="field" ref="date" value={transaction.date} />
        </div>
        <div className="column md">
          <SelectField className="field" ref="type" value={transaction.transactionType} />
        </div>
        <div className="column xl">
          <TextField className="field" ref="description" value={transaction.description} />
          <div className="tags">
            <div className="tag">Interest</div>
            <div className="tag">Taxable</div>
          </div>
        </div>
        <div className="column lg right last">
          <div className="save-button" onClick={this.handleSave}>Save</div>
          <div className="cancel-button" onClick={this.handleCancel}>Cancel</div>
        </div>
        <div className="column right">
          <CurrencyField className="field" ref="amount" value={transaction.amount} />
        </div>
      </div>
    )
  }

});

module.exports = TransactionEditRow;