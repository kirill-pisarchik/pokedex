import classes from './PokemonEvolution.module.css';
import React, {FC} from 'react';
import {PokemonEvolutionProps} from '../../pokedex';



const PokemonEvolution:FC<PokemonEvolutionProps> = ({pokemonName, evolutionChain, onClickEvolutionStage}) => {

  return (<>
    <h3>Evolution</h3>
    <div className={classes.evolution}>{evolutionChain.map((chainElementRow, row) => (
        <div className={classes.evolution__row} key={`${row}`}>
          { chainElementRow.map((chainElement, coll) => (
            <div className={classes.evolution__item} key={`${row}-${coll}`}>
              <div className={classes.evolution__separator}>
                { coll !== 0 && chainElement && ' → '}
              </div>
              <div
                title={chainElement || ''}
                className={`
                  ${classes.evolution__name}
                  ${(chainElement || '') === pokemonName ? classes.evolution__current_item : ''}
                `}
                onClick={() => onClickEvolutionStage(chainElement) }
              >
                {chainElement}
              </div>
            </div>))}
        </div>)
      )}
    </div>
  </>);
};

export default PokemonEvolution;
