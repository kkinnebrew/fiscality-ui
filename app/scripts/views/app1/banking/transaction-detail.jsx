var React = require('react');

var TransactionDetail = React.createClass({

  render: function() {
    return (
      <div id="transaction-detail">
        <div className="actions">
          <div className="modify-button">Modify</div>
          <div className="delete-button">Delete</div>
        </div>
        <div className="section lines">
          <h3 className="title">Lines</h3>
          <ul className="line-group">
            <li className="line">
              <div className="account">Chase Freedom Visa</div>
              <div className="amount">190.12</div>
            </li>
            <li className="line">
              <div className="account">Chase Freedom Visa</div>
              <div className="amount">190.12</div>
            </li>
          </ul>
          <div className="line-editor-button">Line Editor</div>
        </div>
        <div className="section tags">
          <h3 className="title">Tags</h3>
          <ul className="tag-group">
            <li className="tag">Bill Pay</li>
            <li className="tag">Recruiting</li>
            <li className="add-tag-button"></li>
          </ul>
        </div>
        <div className="section comments">
          <h3 className="title">Tags</h3>
          <div className="comment">Bill Pay was sent automatically on 8/8/14.</div>
        </div>
        <div className="controls">
          <div className="previous-button">Previous</div>
          <div className="next-button">Next</div>
        </div>
      </div>
    )
  }

});

module.exports = TransactionDetail;