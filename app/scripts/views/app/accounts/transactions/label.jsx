var React = require('react');

var Label = React.createClass({

  getInitialState: function() {
    return { value: this.props.value };
  },

  handleChange: function(event) {
    //this.setState({ value: event.target.value });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ value: nextProps.value });
  },

  render: function() {
    var value = this.props.value;
    return <input className={this.props.className} type="text" value={value} onChange={this.handleChange} />;
  }

});

module.exports = Label;