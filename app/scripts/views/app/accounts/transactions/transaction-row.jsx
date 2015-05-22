var React = require('react');
var DateField = require('./date-field.jsx');
var TextField = require('./text-field.jsx');
var SelectField = require('./select-field.jsx');
var CurrencyField = require('./currency-field.jsx');
var Label = require('./label.jsx');

var TransactionRow = React.createClass({

  handleChange: function() {

    // make service call

    console.log('something changed');

  },

  render: function() {
    var data = this.props.data;
    return (
      <div className="transaction-row">
        <DateField className="column" value={data.date} onChange={this.handleChange} />
        <SelectField className="column" value={data.transactionType} onChange={this.handleChange} />
        <TextField className="column" value={data.description} onChange={this.handleChange} />
        <CurrencyField className="column" value={data.amount} onChange={this.handleChange} />
        <Label className="column" value={data.balance} />
      </div>
    )
  }

});

module.exports = TransactionRow;