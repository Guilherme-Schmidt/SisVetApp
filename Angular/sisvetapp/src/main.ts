import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from '../src/app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, FormsModule),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
