var React = require('react');
var $ = require('jquery');

var PopUpMenu = React.createClass({

  handleSelect: function(e) {

    var key = $(e.currentTarget).attr('data-key');

    if (typeof this.props.onSelect == 'function') {
      this.props.onSelect.call(this, key);
    }

  },

  render: function() {
    return (
      <ul id="add-transaction-menu">
        <li className="menu-option" onClick={this.handleSelect} data-key="transfer">Transfer</li>
        <li className="menu-option" onClick={this.handleSelect} data-key="deposit">Deposit</li>
        <li className="menu-option" onClick={this.handleSelect} data-key="withdrawal">Withdrawal</li>
        <li className="menu-option" onClick={this.handleSelect} data-key="billpay">Bill Pay</li>
        <li className="menu-option" onClick={this.handleSelect} data-key="custom">Custom</li>
      </ul>
    )
  }

});

module.exports = PopUpMenu;