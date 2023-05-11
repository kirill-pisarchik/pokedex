import classes from './Card.module.css';
import React, {FC} from 'react';
import {CardProps} from '../../pokedex';

const Card:FC<CardProps>  = ({ children, className }) => {
  return (
    <div className={`${classes.card} ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default Card;
