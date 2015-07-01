var React = require('react');

var HoldingsTable = React.createClass({

  getDefaultProps: function() {
    return {
      holdings: []
    };
  },

  render: function() {

    var holdingsRows = this.props.holdings.map(function(holding) {
      return (
        <div className="row">
          <div className="column">
            <div className="label">{holding.symbol}</div>
          </div>
          <div className="column lg">
            <div className="label">{holding.name}</div>
          </div>
          <div className="column align-right">
            <div className="label">{holding.price}</div>
          </div>
          <div className="column align-right md">
            <div className="label">{holding.priceChange}</div>
            <div className="label">{holding.priceChangePercentage}%</div>
          </div>
          <div className="column align-right">
            <div className="label">{holding.quantity}</div>
          </div>
          <div className="column align-right md">
            <div className="label">{holding.marketValue}</div>
          </div>
          <div className="column align-right">
            <div className="label">{holding.marketChange}</div>
            <div className="label">{holding.marketChangePercentage}%</div>
          </div>
          <div className="column align-right lg">
            <div className="label">{holding.gainLoss}</div>
            <div className="label">{holding.gainLossPercentage}%</div>
          </div>
          <div className="column align-right xsm">
            <div className="details-button"></div>
          </div>
        </div>
      )
    });

    return (
      <div id="holdings-table">
        <div className="table-head">
          <div className="header-row">
            <div className="header-column selected ascending">Symbol</div>
            <div className="header-column lg">Name</div>
            <div className="header-column align-right">Price</div>
            <div className="header-column align-right md">Change</div>
            <div className="header-column align-right">Quantity</div>
            <div className="header-column align-right md">Market Value</div>
            <div className="header-column align-right">Change</div>
            <div className="header-column align-right lg">Gain / Loss</div>
            <div className="header-column align-right xsm"></div>
          </div>
        </div>
        <div className="table-body">
        {holdingsRows}
        </div>
      </div>
    )
  }

});

module.exports = HoldingsTable;