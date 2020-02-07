import React, { Component } from 'react';
import { reverseDirection, sortData } from '../../utils';
import styles from './Table.css';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortTag: '',
      sortDirection: '',
    };
  }

  handleSortClick = (e) => {
    const { id } = e.target;
    this.setState((state) => {
      if (state.sortTag !== id) {
        return {
          sortTag: id,
          sortDirection: 'up',
        };
      }
      return {
        sortDirection: reverseDirection(state.sortDirection),
      };
    });
  }

  renderTableHeader = () => {
    const { data } = this.props;
    const { sortDirection, sortTag } = this.state;
    const header = Object.keys(data[0]);
    return header.map((key) => (
      <th
        id={key}
        onClick={this.handleSortClick}
      >
        {key === sortTag && sortDirection === 'up' && <span>&uarr;</span>}
        {key === sortTag && sortDirection === 'down' && <span>&darr;</span>}
        {key.toUpperCase()}
      </th>
    ));
  }

  renderTableData = () => {
    const { data } = this.props;
    return data.map((element) => {
      const { tag, content } = element;
      return (
        <tr>
          <td>{tag}</td>
          <td>{content}</td>
        </tr>
      );
    });
  }

  render() {
    const { data } = this.props;
    const { sortTag, sortDirection } = this.state;
    // mutating props here, but should be okay.
    sortData(data, sortTag, sortDirection);
    return (
      <div>
        <table className={styles.table}>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
