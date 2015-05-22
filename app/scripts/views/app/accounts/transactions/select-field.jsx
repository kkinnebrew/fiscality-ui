var React = require('react');

var SelectField = React.createClass({

  getInitialState: function() {
    return { value: '' };
  },

  handleChange: function(event) {

    if (this.props.onChange) {
      this.props.onChange(event);
    }

  },

  render: function() {
    var value = this.props.value;
    return <input className={this.props.className} type="text" value={value} onChange={this.handleChange} />;
  }

});

module.exports = SelectField;