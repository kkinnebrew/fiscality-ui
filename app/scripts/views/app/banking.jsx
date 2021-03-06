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
      accountOptions: [],
      transactions: [],
      account: {},
      balance: '$0.00',
      types: []
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

  handleRemove: function(key) {
    this.props.viewmodel.removeTransaction(key);
  },

  handleSave: function(transaction) {
    if (transaction.transactionId == null) {
      this.props.viewmodel.saveTransaction(transaction);
    } else {
      this.props.viewmodel.editTransaction(transaction);
    }
  },

  handleCreate: function(account, callback) {
    this.props.viewmodel.createAccount(account).then(callback);
  },

  render: function() {
    return (
      <div id="banking">
        <BankingToolbar key="toolbar" account={this.state.account} balance={this.state.balance} onClick={this.handleMenuClose} onAdd={this.handleAdd} />
        <PopupMenu key="menu" ref="addMenu" onSelect={this.handleAddSelect}></PopupMenu>
        <TransactionTable key="transaction-table" accounts={this.state.accountOptions} types={this.state.types} transactions={this.state.transactions} onCancel={this.handleCancel} onSave={this.handleSave} onRemove={this.handleRemove} onEdit={this.handleEdit} />
        <TransactionDetail key="detail" />
        <AccountsMenu ref="menu" key="accounts" accounts={this.state.accounts} onCreate={this.handleCreate} onSelect={this.handleSelect} onClick={this.handleMenuOpen} />
      </div>
    )
  }

});

module.exports = BankingView;