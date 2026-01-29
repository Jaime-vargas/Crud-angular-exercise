import {Component, inject} from '@angular/core';
import {CharacterDto} from '../../models/character-dto.interface';
import {CharacterStateService} from '../../services/character-state.service';

import {CharacterTable} from '../../components/character/character-table/character-table.component';
import{CharacterModalComponent} from '../../components/character/character-modal.component/character-modal.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {Character} from '../../models/character.interface';


@Component({
  selector: 'character-page',
  imports: [CharacterTable, CharacterModalComponent, NzButtonComponent, NzFlexDirective],
  templateUrl: './character.page.html',
  styleUrl: './character.page.css',
  standalone: true,
})

export class CharacterPage {
  // se importa el servicio
  characterService = inject(CharacterStateService)

  //MODAL SIGNALS
  modalTitle= this.characterService.title;
  modalOpenClose = this.characterService.modalOpenClose;
  editCharacter  = this.characterService.editingCharacter;
  loadingSaveButton = this.characterService.loading;

  //TABLE SIGNALS
  characters = this.characterService.characters;
  loading = this.characterService.loadingTable;
  deleteLoading = this.characterService.loadingDeleteButton;

  // INITIAL FUNCTION
  async ngOnInit() {
    await this.characterService.getCharacters();
  }

  // MODAL
  openModal() : void {
    this.characterService.openModal();
  }

  openEditModal(character: Character) : void {
    this.characterService.openEditModal(character);
  }

  closeModal(){
    this.characterService.closeModal();
  }

  async onSubmit(characterDto : CharacterDto) : Promise<void> {
    const id = this.characterService.editingId()
    if(id >= 0){
      //#LOG
      console.log("va a update - ID: " + id);
      await this.characterService.updateCharacter( id, characterDto);
    }else {
      //#LOG
      console.log("va a create - ID: " + id);
      await this.characterService.createCharacter(characterDto);
    }
  }

  async deleteCharacter(id: number ) {
    await this.characterService.deleteCharacter(id);
  }
}
