var React = require('react');

var NavigationBar = React.createClass({

  handleLogout: function() {
    this.props.viewmodel.logout();
  },

  render: function() {
    return (
      <nav id="nav">
        <h1 id="logo"></h1>
        <ul className="menu">
          <li className="menu-option selected">Summary</li>
          <li className="menu-option">Banking</li>
          <li className="menu-option">Investments</li>
          <li className="menu-option">Budgets</li>
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