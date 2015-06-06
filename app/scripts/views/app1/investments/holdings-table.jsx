var React = require('react');

var HoldingsTable = React.createClass({

  render: function() {
    return (
      <div id="holdings-table">
        <thead>
          <tr className="header-row">
            <th className="header-column selected ascending">Symbol</th>
            <th className="header-column">Name</th>
            <th className="header-column">Price</th>
            <th className="header-column">Change</th>
            <th className="header-column">Quantity</th>
            <th className="header-column">Market Value</th>
            <th className="header-column">Change</th>
            <th className="header-column">Gain Loss</th>
            <th className="header-column"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="row">
            <td className="column">
              <div className="label">AAPL</div>
            </td>
            <td className="column">
              <div className="label">Apple, Inc</div>
            </td>
            <td className="column">
              <div className="label">503.19</div>
            </td>
            <td className="column">
              <div className="label">+4.03</div>
              <div className="label">+0.89%</div>
            </td>
            <td className="column">
              <div className="label">21</div>
            </td>
            <td className="column">
              <div className="label">4,302.01</div>
            </td>
            <td className="column">
              <div className="label">+80.81</div>
              <div className="label">+0.89%</div>
            </td>
            <td className="column">
              <div className="label">+3,290.12</div>
              <div className="label">+249.24%</div>
            </td>
            <td className="column">
              <div className="details-button"></div>
            </td>
          </tr>
        </tbody>
      </div>
    )
  }

});

module.exports = HoldingsTable;