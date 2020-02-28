import React, { useState, useEffect } from 'react';
import Table from './Components/Table/Table';
import Checkbox from './Components/Checkbox/Checkbox';
import { filterData } from './utils';
import styles from './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  useEffect(async () => {
    const resp = await fetch('/api/data');
    const json = await resp.json();
    setData(json);
  }, []);

  const handleCheckboxClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setCheckedTags([...checkedTags, name]);
    } else {
      const updatedTags = checkedTags.filter((tag) => tag !== name);
      setCheckedTags(updatedTags);
    }
  };

  const filteredData = filterData(data, checkedTags);

  return (
    <>
      <div className={styles.title}>
        <img src='/assets/logo.png' alt='Rick and Morty' />
      </div>
      <Checkbox label='character' onClick={handleCheckboxClick} />
      <Checkbox label='location' onClick={handleCheckboxClick} />
      <Checkbox label='quote' onClick={handleCheckboxClick} />
      {data.length !== 0 && (
        <Table data={filteredData} />
      )}
    </>
  );
};

export default App;
