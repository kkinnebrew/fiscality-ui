var React = require('react');
var BankingToolbar = require('./banking/toolbar.jsx');
var TransactionTable = require('./banking/transaction-table.jsx');
var TransactionDetail = require('./banking/transaction-detail.jsx');
var AccountsMenu = require('./banking/menu.jsx');
var PopupMenu = require('./banking/popup-menu.jsx');

var BankingView = React.createClass({

  getInitialState: function() {
    return {
      accounts: [],
      transactions: [],
      account: {},
      balance: 0
    }
  },

  componentDidMount: function() {

    this.props.viewmodel.getAccounts();

  },

  handleMenuClose: function() {
    React.findDOMNode(this.refs.menu).classList.add('visible');
  },

  handleMenuOpen: function() {
    React.findDOMNode(this.refs.menu).classList.remove('visible');
  },

  handleSelect: function(key) {
    this.props.viewmodel.setAccount(key);
    React.findDOMNode(this.refs.menu).classList.remove('visible');
  },

  handleAdd: function() {
    React.findDOMNode(this.refs.addMenu).classList.add('visible');
  },

  handleAddSelect: function(key) {
    this.props.viewmodel.addTransaction();
    React.findDOMNode(this.refs.addMenu).classList.remove('visible');

  },

  render: function() {
    return (
      <div id="banking">
        <BankingToolbar account={this.state.account} balance={this.state.balance} onClick={this.handleMenuClose} onAdd={this.handleAdd} />
        <PopupMenu ref="addMenu" onSelect={this.handleAddSelect}></PopupMenu>
        <TransactionTable transactions={this.state.transactions} />
        <TransactionDetail />
        <AccountsMenu ref="menu" accounts={this.state.accounts} onSelect={this.handleSelect} onClick={this.handleMenuOpen} />
      </div>
    )
  }

});

module.exports = BankingView;