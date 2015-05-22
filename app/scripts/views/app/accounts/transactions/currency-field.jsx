var React = require('react');

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

var CurrencyField = React.createClass({

  getInitialState: function() {
    return { value: '' };
  },

  handleChange: function(event) {
    //this.setState({ value: event.target.value });
  },

  render: function() {
    var symbol = this.props.symbol || '$';
    var value = isNaN ? parseFloat(this.props.value) : this.props.value;
    var formatted = value >= 0 ? (symbol + numberWithCommas(value.toFixed(2))) : ('-' + symbol + numberWithCommas(Math.abs(value).toFixed(2)));
    return <input className={this.props.className} type="text" value={formatted} onChange={this.handleChange} />;
  }

});

module.exports = CurrencyField;