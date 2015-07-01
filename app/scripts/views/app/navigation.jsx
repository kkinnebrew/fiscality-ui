var React = require('react');

var NavigationBar = React.createClass({

  handleSummary: function() {

    if (React.findDOMNode(this.refs.summary).classList.contains('selected')) return;

    React.findDOMNode(this.refs.summary).classList.add('selected');
    React.findDOMNode(this.refs.banking).classList.remove('selected');
    React.findDOMNode(this.refs.investments).classList.remove('selected');
    React.findDOMNode(this.refs.budgets).classList.remove('selected');

  },

  handleBanking: function() {

    if (React.findDOMNode(this.refs.banking).classList.contains('selected')) return;

    React.findDOMNode(this.refs.summary).classList.remove('selected');
    React.findDOMNode(this.refs.banking).classList.add('selected');
    React.findDOMNode(this.refs.investments).classList.remove('selected');
    React.findDOMNode(this.refs.budgets).classList.remove('selected');

    this.props.viewmodel.setState('accounts');

  },

  handleInvestments: function() {

    if (React.findDOMNode(this.refs.investments).classList.contains('selected')) return;

    React.findDOMNode(this.refs.summary).classList.remove('selected');
    React.findDOMNode(this.refs.banking).classList.remove('selected');
    React.findDOMNode(this.refs.investments).classList.add('selected');
    React.findDOMNode(this.refs.budgets).classList.remove('selected');

    this.props.viewmodel.setState('investments');

  },

  handleBudgets: function() {

    if (React.findDOMNode(this.refs.budgets).classList.contains('selected')) return;

    React.findDOMNode(this.refs.summary).classList.remove('selected');
    React.findDOMNode(this.refs.banking).classList.remove('selected');
    React.findDOMNode(this.refs.investments).classList.remove('selected');
    React.findDOMNode(this.refs.budgets).classList.add('selected');

  },

  handleLogout: function() {
    this.props.viewmodel.logout();
  },

  render: function() {
    return (
      <nav id="nav">
        <h1 id="logo"></h1>
        <ul className="menu">
          <li className="menu-option" ref="summary" onClick={this.handleSummary}>Summary</li>
          <li className="menu-option" ref="banking" onClick={this.handleBanking}>Banking</li>
          <li className="menu-option" ref="investments" onClick={this.handleInvestments}>Investments</li>
          <li className="menu-option" ref="budgets" onClick={this.handleBudgets}>Budgets</li>
        </ul>
        <div id="profile" onClick={this.handleLogout}>
          <div className="badge"></div>
          <div className="label">Kevin Kinnebrew</div>
        </div>
      </nav>
    )
  }

});

module.exports = NavigationBar;