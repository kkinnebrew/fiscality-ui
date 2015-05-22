var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

var TransactionsHeader = React.createClass({

  handleClick: function(e) {

    var column = $(e.currentTarget).attr('data-column');

    if (this.props.onSort) {
      this.props.onSort(column);
    }

  },

  render: function() {

    var columns = {
      'date': 'Date',
      'transactionType': 'Type',
      'description': 'Description',
      'amount': 'Amount',
      'balance': 'Balance'
    };

    var that = this;

    var cells = _.map(columns, function(label, column) {
      
      if (that.props.sort == column) {
        if (that.props.direction == 'desc') {
          return <div className="column active desc" onClick={that.handleClick} data-column={column}>{label}</div>;
        } else {

          return <div className="column active asc" onClick={that.handleClick} data-column={column}>{label}</div>;
        }
      } else {
        return <div className="column" onClick={that.handleClick} data-column={column}>{label}</div>;
      }

    });

    return (
      <div className="transaction-header">
        {cells}
      </div>
    )

  }

});

module.exports = TransactionsHeader;