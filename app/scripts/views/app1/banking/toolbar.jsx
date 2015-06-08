var React = require('react');

var BankingToolbar = React.createClass({

  handleClick: function() {
    if (typeof this.props.onClick == 'function') {
      this.props.onClick.call(this);
    }
  },

  render: function() {
    return (
      <div className="toolbar">
        <div className="menu-button" onClick={this.handleClick}></div>
        <h2 className="label">{this.props.account.accountName}</h2>
        <div className="add-transaction-button">Add Transaction</div>
        <div className="info">
          <div className="balance">{this.props.balance}</div>
          <div className="updated">Last Updated May 8, 2015</div>
        </div>
      </div>
    )
  }

});

module.exports = BankingToolbar;