import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../model/hero';
import { Level } from '../model/level';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const levels = [
      { id: 1, level: 1, exp: 1 },
      { id: 2, level: 3, exp: 3 },
      { id: 3, level: 2, exp: 2 },
      { id: 4, level: 4, exp: 4 },
      { id: 5, level: 5, exp: 5 },
      { id: 6, level: 6, exp: 6 },
      { id: 7, level: 7, exp: 7 },
      { id: 8, level: 8, exp: 8 },
      { id: 9, level: 9, exp: 9 },
      { id: 10, level: 10, exp: 10 },
      { id: 11, level: 11, exp: 11 }
    ]
    return { heroes, levels };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
