import React, { Component } from 'react';
import Table from './Components/Table/Table';
import Checkbox from './Components/Checkbox/Checkbox';
import { filterData } from './utils';
import styles from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checkedTags: [],
    };
  }

  async componentDidMount() {
    const data = await fetch('/api/data');
    const json = await data.json();
    this.setState({
      data: json,
    });
  }

  handleCheckboxClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      this.setState((state) => ({
        checkedTags: [...state.checkedTags, name],
      }));
    } else {
      this.setState((state) => {
        const updatedTags = state.checkedTags.filter((tag) => tag !== name);
        return { checkedTags: updatedTags };
      });
    }
  }

  render() {
    const {
      data,
      checkedTags,
    } = this.state;
    const filteredData = filterData(data, checkedTags);

    return (
      <>
        <div className={styles.title}>
          <img src='/assets/logo.png' alt='Rick and Morty' />
        </div>
        <Checkbox label='character' onClick={this.handleCheckboxClick} />
        <Checkbox label='location' onClick={this.handleCheckboxClick} />
        <Checkbox label='quote' onClick={this.handleCheckboxClick} />
        {data.length !== 0 && (
          <Table data={filteredData} />
        )}
      </>
    );
  }
}
