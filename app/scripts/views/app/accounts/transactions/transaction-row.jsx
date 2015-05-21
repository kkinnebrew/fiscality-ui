var React = require('react');

var TransactionRow = React.createClass({

  getInitialState: function() {
    return { data: this.props.data };
  },

  handleChange: function() {

    // make service call

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