import React, { useState } from 'react';
import { reverseDirection, sortData } from '../../utils';
import styles from './Table.css';

const Table = ({ data }) => {
  const [sortTag, setSortTag] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const handleSortClick = (e) => {
    const { id } = e.target;
    if (sortTag !== id) {
      setSortTag(id);
      setSortDirection('up');
    } else {
      setSortDirection(reverseDirection(sortDirection));
    }
  };

  const renderTableHeader = () => {
    const header = Object.keys(data[0]);
    return header.map((key) => (
      <th
        id={key}
        onClick={handleSortClick}
      >
        {key === sortTag && sortDirection === 'up' && <span>&uarr;</span>}
        {key === sortTag && sortDirection === 'down' && <span>&darr;</span>}
        {key.toUpperCase()}
      </th>
    ));
  };

  const renderTableData = () => data.map((element) => {
    const { tag, content } = element;
    return (
      <tr>
        <td>{tag}</td>
        <td>{content}</td>
      </tr>
    );
  });

  // mutating props here, but should be okay.
  sortData(data, sortTag, sortDirection);
  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
