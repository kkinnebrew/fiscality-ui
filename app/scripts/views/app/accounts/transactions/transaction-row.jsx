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
      <div class="transaction-row">
        <DateField value={data.date} onChange={this.handleChange} />
        <SelectField value={data.transactionType} onChange={this.handleChange} />
        <TextField value={data.description} onChange={this.handleChange} />
        <CurrencyField value={data.amount} onChange={this.handleChange} />
        <Label value={data.balance} />
      </div>
    )
  }

});

module.exports = TransactionRow;