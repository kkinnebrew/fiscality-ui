var React = require('react');

var DateField = React.createClass({

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
    this.setState({ editing: true });
  },

  handleBlur: function() {
    this.setState({ editing: false });
  },

  getValue: function() {
    return this.state.value;
  },

  render: function() {
    var str = '';
    var classes = this.props.className;
    if (this.state.editing) {
      classes += ' editing';
      str = this.state.value;
    } else {
      var date = new Date(this.state.value);
      str = date.toString(this.props.format || 'M/d/yyyy');
    }
    return <input className={classes} type="text" value={str} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />;
  }

});

module.exports = DateField;