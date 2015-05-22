var React = require('react');
var DateField = require('./date-field.jsx');
var TextField = require('./text-field.jsx');
var SelectField = require('./select-field.jsx');
var CurrencyField = require('./currency-field.jsx');
var Label = require('./label.jsx');

var TransactionRow = React.createClass({

  getInitialState: function() {
    return { editing: false };
  },

  handleChange: function() {

    // make service call

    console.log('something changed');

  },

  handleClick: function() {
    this.setState({ editing: !this.state.editing });
    console.log('ar')
  },

  render: function() {
    var data = this.props.data;
    var classes = 'transaction-row';
    if (this.state.editing) {
      classes += ' selected';
    }
    return (
      <div className={classes} onClick={this.handleClick}>
        <DateField className="column" value={data.date} onChange={this.handleChange} />
        <SelectField className="column" value={data.transactionType} onChange={this.handleChange} />
        <TextField className="column" value={data.description} onChange={this.handleChange} />
        <CurrencyField className="column column-right" value={data.amount} onChange={this.handleChange} />
        <CurrencyField className="column column-right" value={data.balance} />
      </div>
    )
  }

});

module.exports = TransactionRow;