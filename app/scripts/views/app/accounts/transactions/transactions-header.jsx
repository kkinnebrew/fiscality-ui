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
      'balance': 'Balance',
      'amount': 'Amount'
    };

    var that = this;

    var cells = _.map(columns, function(label, column) {

      var classes = (column == 'amount' || column == 'balance') ? 'column column-right' : 'column';

      if (column == 'balance') {
        classes += ' column-last';
      }

      if (that.props.sort == column) {
        if (that.props.direction == 'desc') {
          classes += ' active desc';
          return <div className={classes} onClick={that.handleClick} data-column={column}>{label}</div>;
        } else {
          classes += ' active asc';
          return <div className={classes} onClick={that.handleClick} data-column={column}>{label}</div>;
        }
      } else {
        return <div className={classes} onClick={that.handleClick} data-column={column}>{label}</div>;
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