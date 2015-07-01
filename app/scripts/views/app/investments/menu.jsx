var React = require('react');
var $ = require('jquery');

var InvestmentsMenu = React.createClass({

  getDefaultProps: function() {
    return {
      portfolios: []
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

  render: function() {

    var that = this;

    var portfolioRows = this.props.portfolios.map(function(portfolio) {
      return (
        <div className="item" onClick={that.handleSelect} data-key={portfolio.portfolioId}>{portfolio.portfolioName}</div>
      )
    });

    return (
      <div id="portfolios-menu">
        <div className="header">
          <div className="back-button" onClick={this.handleClick}></div>
          <div className="title">Portfolios</div>
          <div className="add-portfolio-button">New</div>
        </div>
        <div className="section">
          <div className="title">Brokerage</div>
          {portfolioRows}
        </div>
      </div>
    )
  }

});

module.exports = InvestmentsMenu;