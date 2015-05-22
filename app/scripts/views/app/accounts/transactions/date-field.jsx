var React = require('react');

var DateField = React.createClass({

  getInitialState: function() {
    return { value: '' };
  },

  handleChange: function(event) {
    //this.setState({ value: event.target.value });
  },

  render: function() {
    var date = new Date(this.props.value);
    var str = date.toString(this.props.format || 'MMM dd, yyyy');
    return <input className={this.props.className} type="text" value={str} onChange={this.handleChange} />;
  }

});

module.exports = DateField;