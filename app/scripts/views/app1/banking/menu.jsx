var React = require('react');

var AccountsMenu = React.createClass({

  handleClick: function() {
    if (typeof this.props.onClick == 'function') {
      this.props.onClick.call(this);
    }
  },

  render: function() {
    return (
      <div id="accounts-menu">
        <div className="header">
          <div className="back-button" onClick={this.handleClick}></div>
          <div className="title">Accounts</div>
          <div className="add-account-button">New</div>
        </div>
        <div className="section">
          <div className="title">Banking</div>
          <div className="item">Merrill Lynch - Long Term Gain</div>
          <div className="item">Merrill Lynch - Cost</div>
          <div className="item">Merrill Lynch - Cash</div>
          <div className="item">Merrill Lynch - Lost</div>
          <div className="item">Merrill Lynch - Short Term Gain</div>
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