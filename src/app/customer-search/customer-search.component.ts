import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import axios from 'axios';

export interface CustomerData {
  first_name: string;
  last_name: string
  date_of_birth: string;
  insurance_provider: string;
  policy_number: string;
}

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatTableModule],
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss'
})
export class CustomerSearchComponent {
  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: CustomerData) => `${element.first_name} ${element.last_name}`,
    },
    {
      columnDef: 'dateOfBirth',
      header: 'DoB',
      cell: (element: CustomerData) => `${element.date_of_birth}`,
    },
    {
      columnDef: 'insuranceProvider',
      header: 'Insurance Provider',
      cell: (element: CustomerData) => `${element.insurance_provider}`,
    },
    {
      columnDef: 'policyNumber',
      header: 'Policy #',
      cell: (element: CustomerData) => `${element.policy_number}`,
    },
  ];

  datasource: CustomerData[] = [];
  filteredSource: CustomerData[] = [];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor() {
    
    axios.get('http://127.0.0.1:5000/api/customers')
      .then((response) => {
        console.log('Success:', response.data);
        this.datasource = response.data;
        this.filteredSource = this.datasource;
      })
      .catch((error) => {
        console.error('Error:', error.response?.data || error.message);
      });
  }

  filter(newValue: Event) {
    let current: string = (newValue?.target as HTMLInputElement)?.value || "";
    if (current == "") {
      this.filteredSource = this.datasource;
    } else {
      this.filteredSource = this.datasource.filter((row) => row.first_name.toLowerCase().substring(0, current.length) == current.toLowerCase() 
      || row?.last_name.toLowerCase().substring(0, current.length) == current.toLowerCase());
    }
    
  }

}
