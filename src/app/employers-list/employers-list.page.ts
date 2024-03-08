import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { EmployersService, EmployerWithEdition } from '../employers-service.service';

interface PositionDictionary {
  [key: number]: string;
}

@Component({
  selector: 'app-employers-list',
  templateUrl: './employers-list.page.html',
  styleUrls: ['./employers-list.page.css'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class EmployersListPage implements OnInit {
  query = '';
  limit = 1;
  page = 1;
  totalPages = 0;
  employers: EmployerWithEdition[] = [];
  positions: PositionDictionary = {
    1: 'Gerente',
    2: 'Coordinador',
    3: 'Subdirector',
  };

  positionsEdition = [
    { id: 1, name: 'Gerente' },
    { id: 2, name: 'Coordinador' },
    { id: 3, name: 'Subdirector' }
  ];


  constructor(private employersService: EmployersService) {}

  async ngOnInit() {
    await this.loadEmployees();
  }

  async loadEmployees() {
    const response = await this.employersService.getEmployers(this.page, this.limit);
    this.totalPages =  Math.ceil(response.items / this.limit);
    this.employers = response.data.map(employer => new EmployerWithEdition(employer));
  }

  getCargoName(idCargo: number): string {
    return this.positions[idCargo] || 'Sin cargo';
  }

  editEmployer(employer: EmployerWithEdition): void {
    employer.isEdition = !employer.isEdition;
    if (!employer.isEdition) {
      this.employersService.updateEmployer(employer)
      .then(() => this.loadEmployees());
    }
  }

  changeEmployerStatus(employer: EmployerWithEdition): void {
    employer.estatus = !employer.estatus;
    employer.isEdition = employer.estatus ? employer.isEdition : false;
    this.employersService.updateEmployer(employer)
    .then(() => this.loadEmployees());
  }

  deleteEmployer(employer: EmployerWithEdition): void {
    this.employersService.deleteEmployer(employer.id)
      .then(() => this.loadEmployees());
  }

  async onSearch(query: string) {
    this.query = query;
    if (query === '') {
      await this.loadEmployees();
      return;
    }else{
      const response = await this.employersService.searchEmployers(query);
      this.employers = response.data.map(employer => new EmployerWithEdition(employer));
    }
  }

  async previousPage() {
    if (this.page > 1) {
      this.page--;
      await this.loadEmployees();
    }
  }

  async nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      await this.loadEmployees();
    }
  }
}