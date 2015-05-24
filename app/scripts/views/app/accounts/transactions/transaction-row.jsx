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

  handleChange: function() {},

  handleFocus: function() {
    if (!this.state.editing) {
      this.setState({ editing: true });
      if (this.props.onSelect) {
        this.props.onSelect();
      }
    }
  },

  handleBlur: function() {
    this.setState({ editing: false })
  },

  render: function() {
    var data = this.props.data;
    var classes = 'transaction-row';
    if (this.state.editing) {
      classes += ' selected';
    }
    return (
      <div className={classes}>
        <DateField className="column" value={data.date} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />
        <SelectField className="column" value={data.transactionType} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />
        <TextField className="column" value={data.description} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />
        <CurrencyField className="column column-right column-last" value={data.balance} editable="false" />
        <CurrencyField className="column column-right" value={data.amount} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} />
      </div>
    )
  }

});

module.exports = TransactionRow;