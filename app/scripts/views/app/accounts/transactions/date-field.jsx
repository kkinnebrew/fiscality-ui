var React = require('react');

var DateField = React.createClass({

  getInitialState: function() {
    return { value: '', editing: false };
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  handleFocus: function() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    var unformatted = this.state.value + '';
    this.setState({value: unformatted.replace(/[$,]/g, ''), editing: true});
  },

  handleBlur: function() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    var unformatted = this.state.value + '';
    this.setState({value: unformatted.replace(/[$,A-Za-z_-]/g, ''), editing: false});
  },

  render: function() {
    var date = new Date(this.props.value);
    var str = date.toString(this.props.format || 'MMM dd, yyyy');
    var classes = this.props.className;
    if (this.state.editing) {
      classes += ' editing';
    }
    return <input className={classes} type="text" value={str} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange} />;
  }

});

module.exports = DateField;