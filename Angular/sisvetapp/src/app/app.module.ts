import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MeuPrimeiroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

  ],
  
  providers: []
})

export class AppModule { }
