import {Character} from '../models/character.interface';
import {Injectable} from '@angular/core';
import {CharacterDto} from '../models/character-dto.interface';

@Injectable({providedIn: 'root'})
export class CharacterApiService {

  async getAll() :Promise<Character[]>{
    await new Promise (r => setTimeout(r,1000));
    return [
      { id: 1, name: 'Aragorn', role: 'Ranger', age: 87},
      { id: 2, name: 'Gimli', role: 'Archer', age: 85},
      {id:3, name: 'Murdingler', role: 'Warrior', age: 47}
    ];
  }

  async create(characterDto: CharacterDto):Promise<Character> {
    await new Promise(r => setTimeout(r, 1000));
    return {
      id: Math.floor(Math.random() * 10000),
      ...characterDto
    };
  }

  async update(id: number, characterDto: CharacterDto):Promise<Character> {
    await new Promise(r => setTimeout(r, 1000));
    return {id, ...characterDto};
  }

  async delete(id: number){
    await new Promise(r => setTimeout(r, 1000));
  }
}
