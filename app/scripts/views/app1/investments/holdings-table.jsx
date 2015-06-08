var React = require('react');

var HoldingsTable = React.createClass({

  render: function() {
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
          <div className="row">
            <div className="column">
              <div className="label">AAPL</div>
            </div>
            <div className="column lg">
              <div className="label">Apple, Inc</div>
            </div>
            <div className="column align-right">
              <div className="label">503.19</div>
            </div>
            <div className="column align-right md">
              <div className="label">+4.03</div>
              <div className="label">+0.89%</div>
            </div>
            <div className="column align-right">
              <div className="label">21</div>
            </div>
            <div className="column align-right md">
              <div className="label">4,302.01</div>
            </div>
            <div className="column align-right">
              <div className="label">+80.81</div>
              <div className="label">+0.89%</div>
            </div>
            <div className="column align-right lg">
              <div className="label">+3,290.12</div>
              <div className="label">+249.24%</div>
            </div>
            <div className="column align-right xsm">
              <div className="details-button"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = HoldingsTable;