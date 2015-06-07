var React = require('react');

var TransactionTable = React.createClass({

  render: function() {
    return (
      <div id="transaction-table">
        <div className="table-head">
          <div className="header-row">
            <div className="header-column selected ascending">Date</div>
            <div className="header-column">Type</div>
            <div className="header-column xl">Description</div>
            <div className="header-column">Amount</div>
            <div className="header-column">Balance</div>
          </div>
        </div>
        <div className="table-body">
          <div className="row">
            <div className="column">
              <div className="label">8/19/2014</div>
            </div>
            <div className="column">
              <div className="label">Paycheck Deposit</div>
            </div>
            <div className="column xl">
              <div className="label">Web Design Agency</div>
              <div className="tags">
                <div className="tag">Interest</div>
                <div className="tag">Taxable</div>
              </div>
            </div>
            <div className="column">
              <div className="label">1,503.21</div>
            </div>
            <div className="column">
              <div className="label">$3,912.61</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = TransactionTable;