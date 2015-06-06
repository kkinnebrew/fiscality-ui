var React = require('react');

var InvestmentsToolbar = React.createClass({

  render: function() {
    return (
      <div className="toolbar">
        <div className="menu-button"></div>
        <h2 className="label"></h2>
        <div className="info">
          <div className="balance"></div>
          <div className="updated"></div>
        </div>
        <div className="trade-button"></div>
      </div>
    )
  }

});

module.exports = InvestmentsToolbar;