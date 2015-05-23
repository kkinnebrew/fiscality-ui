var React = require('react');

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

var CurrencyField = React.createClass({

  getInitialState: function() {
    return { value: this.props.value, editing: false };
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  handleFocus: function(event) {
    var unformatted = this.state.value + '';
    this.setState({ value: unformatted.replace(/[$,]/g, ''), editing: true });
  },

  handleBlur: function(event) {
    var unformatted = this.state.value + '';
    this.setState({ value: unformatted.replace(/[$,A-Za-z_-]/g, ''), editing: false });
  },

  render: function() {
    var formatted = this.state.value;
    var classes = this.props.className;
    if (!this.state.editing) {
      var symbol = this.props.symbol || '$';
      var value = isNaN ? parseFloat(this.state.value) : this.state.value;
      formatted = value >= 0 ? (symbol + numberWithCommas(value.toFixed(2))) : ('-' + symbol + numberWithCommas(Math.abs(value).toFixed(2)));
    } else {
      classes += ' editing';
    }
    return <input className={classes} type="text" value={formatted} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />;
  }

});

module.exports = CurrencyField;