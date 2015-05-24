var React = require('react');

var DateField = React.createClass({

  getInitialState: function() {
    return { value: this.props.value, editing: false };
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  handleFocus: function() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    var date = new Date(this.state.value);
    var value = date.toString(this.props.format || 'M/d/yyyy');
    this.setState({ value: value, editing: true });
  },

  handleBlur: function() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({ editing: false });
  },

  render: function() {
    var str = '';
    var classes = this.props.className;
    if (this.state.editing) {
      classes += ' editing';
      str = this.state.value;
    } else {
      var date = new Date(this.state.value);
      str = date.toString(this.props.format || 'MMM dd, yyyy');
    }
    return <input className={classes} type="text" value={str} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />;
  }

});

module.exports = DateField;