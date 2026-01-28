import {Component, computed, input, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';

import {Character} from '../../interfaces/character.interface';

@Component({
  selector: 'character-table',
  imports: [ReactiveFormsModule, NzTableModule, NzButtonModule, NzFlexModule, NzFormModule, NzInputModule],
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.css',
})

export class CharacterTable {
  characters = input.required<Character[]>();
  delete = output<Character>()
}
