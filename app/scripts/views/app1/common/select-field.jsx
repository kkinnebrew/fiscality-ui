var React = require('react');

var SelectField = React.createClass({

  getInitialState: function() {
    return { value: this.props.value, editing: false };
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.value });
  },

  handleFocus: function() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.setState({ editing: true });
  },

  handleBlur: function() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({ editing: false });
  },

  getValue: function() {
    return this.state.value;
  },

  render: function() {
    var value = this.state.value;
    var classes = 'select-field ' + this.props.className;
    if (this.state.editing) {
      classes += ' editing';
    }
    return <input className={classes} type="text" value={value} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />;
  }

});

module.exports = SelectField;