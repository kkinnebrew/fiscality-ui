var React = require('react');

var SelectField = React.createClass({

  getDefaultProps: function() {
    return {
      options: []
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

    var options = this.props.options.map(function(option) {
      if (typeof option === 'string') {
        return <option value={option} key={option}>{option}</option>
      } else {
        return <option value={option.value} key={option.value}>{option.label}</option>
      }
    });

    return (
      <select className={classes} type="text" value={value} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleChange}>
      {options}
      </select>
    )
  }

});

module.exports = SelectField;