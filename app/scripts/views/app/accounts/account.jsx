var React = require('react');
var _ = require('underscore');

var AccountView = React.createClass({

  getInitialState: function() {
    return {
      account: this.props.viewmodel.account || {},
      balance: this.props.viewmodel.balance
    };
  },

  handleMenu: function(e) {
    this.props.viewmodel.choose();
  },

  handleClick: function(e) {

    var tab = $(e.currentTarget).attr('data-tab');

    if (this.props.onTab) {
      this.props.onTab(tab);
    }

  },

  render: function () {

    return (
      <div className="account-panel">
        <div className="account-header">
          <div className="menu-button" onClick={this.handleMenu}></div>
          <div className="account-info">
            <div className="account-name">{this.state.account.name}</div>
            <div className="account-type">{this.state.account.type}</div>
          </div>
          <div className="account-balance">
            <div className="amount">{this.state.balance}</div>
            <div className="label">Balance (USD)</div>
          </div>
        </div>
        <div className="nav">
          <div className="nav-button transactions-button" data-tab="transactions" onClick={this.handleClick}>Transactions</div>
          <div className="nav-button performance-button" data-tab="performance" onClick={this.handleClick}>Performance</div>
          <div className="nav-button nav-button-right settings-button" data-tab="settings" onClick={this.handleClick}>Settings</div>
        </div>
      </div>
    )

  }

});

module.exports = AccountView;