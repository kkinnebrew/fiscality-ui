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
      balance: '$0.00'
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

  handleEdit: function(key) {
    this.props.viewmodel.markEditing(key);
  },

  handleCancel: function(key) {
    this.props.viewmodel.clearEditing();
  },

  handleSave: function(transaction) {
    this.props.viewmodel.editTransaction(transaction);
  },

  render: function() {
    return (
      <div id="banking">
        <BankingToolbar key="toolbar" account={this.state.account} balance={this.state.balance} onClick={this.handleMenuClose} onAdd={this.handleAdd} />
        <PopupMenu key="menu" ref="addMenu" onSelect={this.handleAddSelect}></PopupMenu>
        <TransactionTable key="transaction-table" transactions={this.state.transactions} onCancel={this.handleCancel} onSave={this.handleSave} onEdit={this.handleEdit} />
        <TransactionDetail key="detail" />
        <AccountsMenu ref="menu" key="accounts" accounts={this.state.accounts} onSelect={this.handleSelect} onClick={this.handleMenuOpen} />
      </div>
    )
  }

});

module.exports = BankingView;