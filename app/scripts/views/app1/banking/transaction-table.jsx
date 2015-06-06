var React = require('react');

var TransactionTable = React.createClass({

  render: function() {
    return (
      <div id="transaction-table">
        <thead>
          <tr className="header-row">
            <th className="header-column selected ascending">Date</th>
            <th className="header-column">Type</th>
            <th className="header-column">Description</th>
            <th className="header-column">Amount</th>
            <th className="header-column">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr className="row">
            <td className="column">
              <div className="label">8/19/2014</div>
              </td>
            <td className="column">
              <div className="label">Paycheck Deposit</div>
            </td>
            <td className="column">
              <div className="label">Web Design Agency</div>
              <div className="tag">Interest</div>
              <div className="tag">Taxable"</div>
            </td>
            <td className="column">
              <div className="label">1,503.21</div>
            </td>
            <td className="column">
              <div className="label">$3,912.61</div>
            </td>
          </tr>
        </tbody>
      </div>
    )
  }

});

module.exports = TransactionTable;