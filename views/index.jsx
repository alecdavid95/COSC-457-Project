var React = require('react');

class HelloMessage extends React.Component {
  getColumnsFromRowData(row) {
    let cols = [];
    for (var j=0; j < row.length; j++) {
      cols.push(<td>{row[j]}</td>);  
    }
    return cols;
  }
  render() {
    var rows = [];
    for (var i=0; i < this.props.results.length; i++) {
      rows.push(<tr>{this.getColumnsFromRowData(this.props.results[i])}</tr>);

    }
    return <table style="">
             <tbody>{rows}</tbody>
           </table>;
  }
}

module.exports = HelloMessage;