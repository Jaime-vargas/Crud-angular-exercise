import {Component, input, output} from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';

import {Character} from '../../../models/character.interface';

@Component({
  selector: 'character-table',
  imports: [ReactiveFormsModule, NzTableModule, NzButtonModule, NzFlexModule, NzFormModule, NzInputModule],
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.css',
  standalone: true,
})

export class CharacterTable {
  characters = input.required<Character[]>();
  loading = input.required<boolean>();
  deleteLoading = input.required<Record<number, boolean>>();

  create= output<Character>();
  edit = output<Character>();
  delete = output<number>();


}
