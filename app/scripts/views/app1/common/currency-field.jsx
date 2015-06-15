var React = require('react');

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

var CurrencyField = React.createClass({

  getDefaultProps: function() {
    return {
      editable: 'true'
    };
  },

  getInitialState: function() {
    return { value: this.props.value, editing: false };
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.value });
  },

  //handleFocus: function() {
  //  if (this.props.editable == 'true') {
  //    if (this.props.onFocus) {
  //      this.props.onFocus();
  //    }
  //    var unformatted = this.state.value + '';
  //    this.setState({value: unformatted.replace(/[$,]/g, ''), editing: true});
  //  }
  //},
  //
  //handleBlur: function() {
  //  if (this.props.editable == 'true') {
  //    if (this.props.onBlur) {
  //      this.props.onBlur();
  //    }
  //    var unformatted = this.state.value + '';
  //    this.setState({value: unformatted.replace(/[$,A-Za-z_-]/g, ''), editing: false});
  //  }
  //},

  getValue: function() {
    return this.state.value;
  },

  render: function() {
    var formatted = this.state.value ? this.state.value.replace(',', '') : '0';
    var classes = this.props.className;
    if (this.state.editing) {
      classes += ' editing';
    }
    if (this.props.editable == 'true') {
      return <input className={classes} type="text" value={formatted} onChange={this.handleChange} />;
    } else {
      return <div className={classes}>{formatted}</div>;
    }
  }

});

module.exports = CurrencyField;