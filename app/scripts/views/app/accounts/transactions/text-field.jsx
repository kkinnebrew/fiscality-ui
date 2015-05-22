var React = require('react');

var TextField = React.createClass({

  getInitialState: function() {
    return { value: '' };
  },

  handleChange: function(event) {
    //this.setState({ value: event.target.value });
  },

  render: function() {
    var value = this.props.value;
    return <input type="text" value={value} onChange={this.handleChange} />;
  }

});

module.exports = TextField;