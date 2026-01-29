import {CharacterApiService} from './character-api.service';
import {inject, Injectable, signal} from '@angular/core';
import {Character} from '../models/character.interface';
import {CharacterDto} from '../models/character-dto.interface';

@Injectable({providedIn: 'root'})
export class CharacterStateService {

  private characterApiService = inject(CharacterApiService);
  private _characters = signal<Character[]>([]);

  //TABLE SIGNALS
  characters = this._characters.asReadonly();
  loadingTable = signal<boolean>(false);
  loadingDeleteButton = signal<Record<number, boolean>>({});

  //MODAL SIGNALS
  modalTitles = ["Nuevo Character", "Editar Character"];
  title = signal<string>(this.modalTitles[0] || "");
  modalOpenClose = signal<boolean>(false);
  editingId = signal<number>(-1);
  editingCharacter = signal<Character | null>(null);
  loading = signal<boolean>(false);

  //MODAL CONTROL
  openModal ():void {
      this.modalOpenClose.set(true);
      this.title.set(this.modalTitles[0] || "");
      this.editingId.set(-1);
      this.editingCharacter.set(null);
  }

  openEditModal(character: Character) : void {
    this.modalOpenClose.set(true);
    this.title.set(this.modalTitles[1] || "");
    //#LOG
    console.log("OpenEditModal: " + character.name);
    this.editingId.set(character.id);
    console.log("OpenEditModal: " + character.id);
    this.editingCharacter.set({...character});
  }

  closeModal(): void {
    this.modalOpenClose.set(false);
    this.editingId.set(-1);
    this.editingCharacter.set(null);
  }

  // TABLE BUTTON LOADING MAP HELPER
  setButtonLoading (id: number, active: boolean) {
    this.loadingDeleteButton.update(map => (
      {...map, [id]: active}));
  }

  // CRUD FUNCTIONS
  async getCharacters(){
    try{
      this.loadingTable.set(true);
      const response = await this.characterApiService.getAll();
      this._characters.set(response);
    }catch(error){
      console.log(error);
    }finally {
      this.loadingTable.set(false);
    }
  }

  async createCharacter(characterDto: CharacterDto){
    try{
      this.loading.set(true);
      this.loadingTable.set(true);
      const response: Character = await this.characterApiService.create(characterDto);
      this._characters.update(current => [...current, response]);
    }catch(error){
      console.log(error);
    }finally {
      this.loading.set(false);
      this.closeModal();
      this.loadingTable.set(false);
    }
  }

  async updateCharacter(id:number, characterDto: CharacterDto){
    try{
      this.loading.set(true);
      this.loadingTable.set(true);
      const response = await this.characterApiService.update(id, characterDto);
      const exists = this._characters().some(c => c.id === id);
      if (!exists) new Error(`Character with id ${id} not found`);
      this._characters.update(current => current.map(c => c.id === id ? response : c));

    }catch(error){
      console.log(error);
    }finally {
      this.loading.set(false);
      this.closeModal();
      this.loadingTable.set(false);
    }
  }

  async deleteCharacter(id: number){
    try{
      this.setButtonLoading(id, true);
      await this.characterApiService.delete(id);
      if(this._characters().find(current => current.id === id)) {
        this._characters.update(current => current.filter(c => c.id !== id));
      }
    }catch(error){
      console.log(error);
    }
    finally {
      this.setButtonLoading(id, false);
    }
  }

}
