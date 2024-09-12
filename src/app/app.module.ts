import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { VetInsuranceFormComponent } from './vet-insurance-form/vet-insurance-form.component';

@NgModule({
  declarations: [
    AppComponent,
    VetInsuranceFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // Add ReactiveFormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
