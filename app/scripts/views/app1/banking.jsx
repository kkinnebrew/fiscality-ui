var React = require('react');
var BankingToolbar = require('./banking/toolbar.jsx');
var TransactionTable = require('./banking/transaction-table.jsx');
var TransactionDetail = require('./banking/transaction-detail.jsx');
var AccountsMenu = require('./banking/menu.jsx');

var BankingView = React.createClass({

  handleMenu: function() {
    React.findDOMNode(this.refs.menu).classList.add('visible');
  },

  handleSelect: function() {
    React.findDOMNode(this.refs.menu).classList.remove('visible');
  },

  render: function() {
    return (
      <div id="banking">
        <BankingToolbar onClick={this.handleMenu} />
        <TransactionTable />
        <TransactionDetail />
        <AccountsMenu ref="menu" onClick={this.handleSelect} />
      </div>
    )
  }

});

module.exports = BankingView;