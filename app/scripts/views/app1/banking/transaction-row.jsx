var React = require('react');
var $ = require('jquery');

var TransactionRow = React.createClass({

  getDefaultProps: function() {
    return {
      transaction: {}
    };
  },

  handleClick: function(e) {
    if (this.props.onClick && typeof this.props.onClick == 'function') {
      var key = $(e.currentTarget).attr('data-key');
      this.props.onClick.call(this, key);
    }
  },

  render: function() {
    var transaction = this.props.transaction;
    return (
      <div className="row" onClick={this.handleClick} data-key={transaction.transactionId}>
        <div className="column">
          <div className="label">{transaction.date}</div>
        </div>
        <div className="column md">
          <div className="label">{transaction.transactionType}</div>
        </div>
        <div className="column xl">
          <div className="label">{transaction.description}</div>
          <div className="tags">
            <div className="tag">Interest</div>
            <div className="tag">Taxable</div>
          </div>
        </div>
        <div className="column lg right last">
          <div className="label">{transaction.balance}</div>
        </div>
        <div className="column right">
          <div className="label">{transaction.amount}</div>
        </div>
      </div>
    )
  }

});

module.exports = TransactionRow;