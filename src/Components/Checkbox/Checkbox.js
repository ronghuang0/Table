import React from 'react';
import styles from './Checkbox.css';

const Checkbox = ({ label, onClick }) => (
  <>
    <label className={styles.container}>
      {label}
      <input type='checkbox' name={label} onClick={onClick} />
      <span className={styles.checkmark} />
    </label>
  </>
);

export default Checkbox;
