var React = require('react');

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

var CurrencyField = React.createClass({

  getInitialState: function() {
    return { value: this.props.value || '0', editing: false };
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.value });
  },

  handleFocus: function() {
    this.setState({ value: this.state.value.replace(',', ''), editing: true });
  },

  handleBlur: function() {
    this.setState({ editing: false });
  },

  getValue: function() {
    return this.state.value;
  },

  render: function() {
    var formatted = this.state.value;
    var classes = this.props.className;
    if (!this.state.editing) {
      formatted = numberWithCommas(this.state.value);
    }
    return <input className={classes} type="text" value={formatted} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />;
  }

});

module.exports = CurrencyField;