var React = require('react');
var InvestmentsToolbar = require('./investments/toolbar.jsx');
var InvestmentsChart = require('./investments/chart.jsx');
var HoldingsTable = require('./investments/holdings-table.jsx');
var InvestmentsMenu = require('./investments/menu.jsx');

var InvestmentsView = React.createClass({

  getInitialState: function() {
    return {
      portfolios: [],
      holdings: [],
      portfolio: {},
      balance: 0
    }
  },

  componentDidMount: function() {

    this.props.viewmodel.getPortfolios();

  },

  handleMenuClose: function() {
    React.findDOMNode(this.refs.menu).classList.add('visible');
  },

  handleMenuOpen: function() {
    React.findDOMNode(this.refs.menu).classList.remove('visible');
  },

  handleSelect: function(key) {
    this.props.viewmodel.setPortfolio(key);
    React.findDOMNode(this.refs.menu).classList.remove('visible');
  },

  render: function() {
    return (
      <div id="investments">
        <InvestmentsToolbar portfolio={this.state.portfolio} balance={this.state.balance} onClick={this.handleMenuClose} />
        <InvestmentsChart />
        <HoldingsTable holdings={this.state.holdings} />
        <InvestmentsMenu ref="menu" portfolios={this.state.portfolios} onSelect={this.handleSelect} onClick={this.handleMenuOpen} />
      </div>
    )
  }

});

module.exports = InvestmentsView;