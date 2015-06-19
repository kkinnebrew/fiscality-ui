var React = require('react');
var $ = require('jquery');

var AccountsMenu = React.createClass({

  getDefaultProps: function() {
    return {
      accounts: []
    };
  },

  handleClick: function() {
    if (typeof this.props.onClick == 'function') {
      this.props.onClick.call(this);
    }
  },

  handleSelect: function(e) {

    var key = $(e.currentTarget).attr('data-key');

    if (typeof this.props.onSelect == 'function') {
      this.props.onSelect.call(this, key);
    }

  },

  handleNew: function() {

    if (React.findDOMNode(this.refs.create).classList.contains('visible')) {
      React.findDOMNode(this.refs.create).classList.remove('visible');
      React.findDOMNode(this.refs.add).innerText = 'New';
    } else {
      React.findDOMNode(this.refs.create).classList.add('visible');
      React.findDOMNode(this.refs.add).innerText = 'Done';
    }

  },

  handleCreate: function() {

    var data = {
      accountName: React.findDOMNode(this.refs.accountName).value,
      accountType: React.findDOMNode(this.refs.accountType).value
    };

    var that = this;

    if (typeof this.props.onCreate == 'function') {
      this.props.onCreate.call(this, data, function() {
        React.findDOMNode(that.refs.accountName).value = '';
      });
    }

  },

  render: function() {

    var that = this;

    var accountRows = this.props.accounts.map(function(account) {
      return (
        <div className="item" onClick={that.handleSelect} data-key={account.accountId} key={account.accountId}>{account.accountName}</div>
      )
    });

    return (
      <div id="accounts-menu">

        <div className="header">
          <div className="back-button" onClick={this.handleClick}></div>
          <div className="title">Accounts</div>
          <div className="add-account-button" ref="add" onClick={this.handleNew}>New</div>
        </div>

        <div id="create-account-form" className="section" ref="create">
          <div className="title">Create Account</div>
          <input type="text" className="field" ref="accountName" placeholder="Account Name" />
          <select className="field" ref="accountType">
            <option>Asset</option>
            <option>Liability</option>
            <option>Income</option>
            <option>Expense</option>
            <option>Equity</option>
          </select>
          <div className="create-button" onClick={this.handleCreate}>Create</div>
        </div>

        <div className="section">
          <div className="title">Banking</div>
          {accountRows}
        </div>

        <div className="section">
          <div className="title">Credit &amp; Loan</div>
          <div className="item">American Express Blue Cash</div>
          <div className="item">Citi Double Cash</div>
          <div className="item">Citi AAdvantage Signature</div>
          <div className="item">Chase Freedom Rewards Signature</div>
          <div className="item">Chase Ink Premier</div>
          <div className="item">Bank of America World Points</div>
        </div>

      </div>
    )
  }

});

module.exports = AccountsMenu;