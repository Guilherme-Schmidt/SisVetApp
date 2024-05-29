import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';

@Component({
  selector: 'app-meu-primeiro',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    MeuPrimeiroComponent // Importar o componente standalone aqui
  ]
})
export class AppComponent {
  title = 'meu-projeto-angular';
}
