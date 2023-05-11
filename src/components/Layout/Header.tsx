import classes from './Header.module.css';
import React, {FC, PropsWithoutRef} from 'react';
import image from '../../assets/pokemons.webp';

const Header: FC<PropsWithoutRef<any>> = () => {

  return <>
    <header className={classes.header}>
      <h1>Pokedex</h1>
    </header>
    <div className={classes['main-image']}>
      <img src={image} alt='A lot of pokemons'/>
    </div>
  </>

};

export default React.memo(Header);
