import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';


//json-server funciona con id de tipo string y no de tipo number
export interface Employer {
  id: string;
  nombre: string;
  fechaNacimiento: number;
  edad: number;
  estatus: boolean;
  idCargo: number;
}

export interface ApiResponseGetEmployers {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Employer[];
}

export class EmployerWithEdition implements Employer {
  id: string;
  nombre: string;
  fechaNacimiento: number;
  edad: number;
  estatus: boolean;
  idCargo: number;
  isEdition: boolean; // Propiedad para controlar el modo de edición

  constructor(employer: Employer) {
    this.id = employer.id;
    this.nombre = employer.nombre;
    this.fechaNacimiento = employer.fechaNacimiento;
    this.edad = employer.edad;
    this.estatus = employer.estatus;
    this.idCargo = employer.idCargo;
    this.isEdition = false; // Por defecto, no está en modo de edición
  }
}

type ApiResponse = Employer[];


@Injectable({
  providedIn: 'root',
})
export class EmployersService {

  private apiUrl = 'http://localhost:3000/content';

  private cargoMappings: { [nombre: string]: number } = {
    'Gerente': 1,
    'Coordinador': 2,
    'Subdirector': 3
  };

  httpClient = inject(HttpClient);

  getPositionName(idCargo: number): string {
    return Object.keys(this.cargoMappings).find(key => this.cargoMappings[key] === idCargo) || '';
  }

  async getEmployers(page: number, limit: number): Promise<ApiResponseGetEmployers> {
    return await firstValueFrom(this.httpClient.get<ApiResponseGetEmployers>(`${this.apiUrl}?_page=${page}&_per_page=${limit}`));
  }

  //json server no soporta busquedas con query params por lo que se hace la busqueda en el cliente con js
  //no me fue posible implementar la paginación en la busqueda debido a que json server no soporta query params
  async searchEmployers(search: string): Promise<ApiResponseGetEmployers> {
    if (!search.trim()) {
      return await this.getEmployers(1, 10);
    }
    search = search.toLowerCase();
    const response =  await firstValueFrom(this.httpClient.get<ApiResponseGetEmployers>(`${this.apiUrl}?_page=${1}`));

    const filteredData = response.data.filter(employer =>
      employer.nombre.toLowerCase().includes(search) ||
      employer.id.toString().includes(search) ||
      this.getPositionName(employer.idCargo).toLowerCase().includes(search)
    );

    return {
      first: response.first,
      prev: response.prev,
      next: response.next,
      last: response.last,
      pages: response.pages,
      items: response.items,
      data: filteredData
    };
  }

  async addEmployer(employer: Employer): Promise<ApiResponse> {
    return await firstValueFrom(this.httpClient.post<ApiResponse>(this.apiUrl, employer));
  } 

  async updateEmployer(employer: Employer): Promise<ApiResponse> {
    return await firstValueFrom(this.httpClient.put<ApiResponse>(`${this.apiUrl}/${employer.id}`, employer));
  }

  async deleteEmployer(id: string): Promise<ApiResponse> {
    return await firstValueFrom(this.httpClient.delete<ApiResponse>(`${this.apiUrl}/${id}`));
  }
}
