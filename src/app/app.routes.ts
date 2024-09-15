import { Routes } from '@angular/router';
import { VetInsuranceFormComponent } from './vet-insurance-form/vet-insurance-form.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';

export const routes: Routes = [
    {
        path: '',
        component: VetInsuranceFormComponent,
        title: 'PetIns Home',
    },
    {
        path:'CustomerSearch',
        component: CustomerSearchComponent,
        title: 'PetIns Customer Search',
    },
];
