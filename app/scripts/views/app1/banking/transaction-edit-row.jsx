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

  render: function() {
    var transaction = this.props.transaction;
    return (
      <div className="row">
        <div className="column">
          <DateField className="field" value={transaction.date} />
        </div>
        <div className="column md">
          <SelectField className="field" value={transaction.transactionType} />
        </div>
        <div className="column xl">
          <TextField className="field" value={transaction.description} />
          <div className="tags">
            <div className="tag">Interest</div>
            <div className="tag">Taxable</div>
          </div>
        </div>
        <div className="column right last">
          <div className="label">{transaction.balance}</div>
        </div>
        <div className="column right">
          <CurrencyField className="field" value={transaction.amount} />
        </div>
      </div>
    )
  }

});

module.exports = TransactionEditRow;