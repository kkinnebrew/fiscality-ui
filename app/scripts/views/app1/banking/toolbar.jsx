var React = require('react');

var BankingToolbar = React.createClass({

  render: function() {
    return (
      <div className="toolbar">
        <div className="menu-button"></div>
        <h2 className="label"></h2>
        <div className="info">
          <div className="balance"></div>
          <div className="updated"></div>
        </div>
        <div className="add-transaction-button"></div>
      </div>
    )
  }

});

module.exports = BankingToolbar;