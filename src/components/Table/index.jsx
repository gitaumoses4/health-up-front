import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Table.scss';

const templateColumns = columns => ({ gridTemplateColumns: `repeat(${Object.keys(columns).length}, 1fr)` });

class Table extends Component {
  renderHeader = () => {
    const { columns } = this.props;
    return (
      <div className="thead" style={templateColumns(columns)}>
        {
          Object.keys(columns).map(head => (
            <div className="th" key={Math.random()}>{columns[head]}</div>
          ))
        }
      </div>
    );
  };

  renderRows = (row, columns) => columns.reduce((acc, column) => (
    {
      ...acc,
      [column]: row[column], 
    }), {});

  renderBody = () => {
    const {
      rows, children = this.renderRows, readOnly, columns, 
    } = this.props;
    return (
      <div className="tbody">
        {
          rows.map((row) => {
            const data = children(row, Object.keys(columns));
            return (
              <div
                role="presentation"
                onClick={() => !readOnly && data.onClick && data.onClick(this.props)}
                className="tr"
                key={Math.random()}
                style={templateColumns(columns)}>
                {
                  Object.keys(columns).map(column => (
                    <div className="td" key={Math.random()}>
                      <span className="title">{columns[column]}</span>
                      <span className="data">{data[column]}</span>
                    </div>
                  ))
                }
              </div>
            );
          })
        }
      </div>
    );
  };

  render() {
    const TableHead = this.renderHeader;
    const TableBody = this.renderBody;
    const { cards } = this.props;
    return (
      <div className={`table ${cards ? 'cardLike' : ''}`}>
        <div className="simple-table">
          <TableHead />
          <TableBody />
        </div>
      </div>
    );
  }
}

Table.propTypes = {

};

export default Table;
