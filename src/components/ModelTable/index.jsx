import React, { Component } from 'react';
import Empty from '../Empty';
import Table from '../Table';
import WithLoading from '../WithLoading';

const ModelTable = ({
  model, columns, renderTable, className = '',
  cards = false,
}) => {
  class DynamicTable extends Component {
    render() {
      const {
        data, loading, history, readOnly, cards: propCards,
        emptyMessage,
        emptyImage,
      } = this.props;
      const models = data[model];
      return (
        <div className={`model-table ${className}`}>
          {
            loading || (!models || !models.length) ? (
              <Empty image={emptyImage} message={emptyMessage} />
            ) : (
              <Table
                columns={columns}
                rows={models}
                readOnly={readOnly}
                cards={cards || propCards}
                history={history}
              >
                {renderTable}
              </Table>
            )
          }
        </div>
      );
    }
  }

  return WithLoading(DynamicTable);
};

ModelTable.propTypes = {

};

export default ModelTable;
