import { Component } from '@angular/core';

import {CharacterPage} from './pages/character.page/character.page';

@Component({
  selector: 'app-root',
  imports: [ CharacterPage],
  templateUrl: './app.html',
})
export class App {

}
