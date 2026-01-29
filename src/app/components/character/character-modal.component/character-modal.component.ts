import {Component, EventEmitter, inject, Input, Output, SimpleChanges} from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule  } from 'ng-zorro-antd/form';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {CharacterDto} from '../../../models/character-dto.interface';
import {Character} from '../../../models/character.interface';

@Component({
  selector: 'app-character-modal',
  imports: [NzFormModule, NzModalModule, NzButtonModule, ReactiveFormsModule, NzInputDirective],
  templateUrl: './character-modal.component.html',
  styleUrl: './character-modal.component.css',
  standalone: true,
})
export class CharacterModalComponent {

  @Input() title:string= "";
  @Input() visible = false;
  @Input() character: Character | null = null;
  @Input()loadingSave:boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<CharacterDto>();

  submitted = false;

  private fb = inject(FormBuilder);

  modalForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern("^[Aa].+")]],
    age: [0,[Validators.required, Validators.min(10)]],
    role: ['', [Validators.required]]
  })

  ngOnChanges(changes: SimpleChanges) {
    if(changes['character']) {
      if(this.character){
        this.modalForm.patchValue({
          name: this.character.name,
          age: this.character.age,
          role: this.character.role
        });
      }else{
        this.modalForm.reset({})
      }
      this.modalForm.markAsPristine();
      this.modalForm.markAsUntouched();
    }
  }
  closeModal(){
    this.modalForm.reset({
      name: '',
      age: 0,
      role: '',
    })
    this.modalForm.markAsPristine();
    this.modalForm.markAsUntouched();
    this.close.emit();
  }

  onSubmit() {
    this.submitted = true;
    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    this.submit.emit(this.modalForm.getRawValue());
  }


}

