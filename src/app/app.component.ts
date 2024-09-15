import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { VetInsuranceFormComponent } from './vet-insurance-form/vet-insurance-form.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, VetInsuranceFormComponent, CustomerSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PetInsSetup';
}
