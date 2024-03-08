import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Employer, EmployersService } from '../employers-service.service';

interface Position {
  id: number;
  name: string;
}

@Component({
  selector: 'app-employers-register',
  templateUrl: './employers-register.page.html',
  styleUrls: ['./employers-register.page.css'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class EmployersRegisterPage implements OnInit {
  formData: FormGroup;
  positions: Position[] = [
    { id: 1, name: 'Gerente' },
    { id: 2, name: 'Coordinador' },
    { id: 3, name: 'Subdirector' },
  ];

  constructor(private employersService: EmployersService) {
    this.formData = new FormGroup({
      fullName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      status: new FormControl('activo'),
    });
  }

  ngOnInit() {}

  generateRandomId(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    const idLength = 10;
    for (let i = 0; i < idLength; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }

  addEmployer(formData: FormGroup) {
    if (formData.valid) {
      const nombreCompleto = formData.get('fullName')?.value ?? 'Unknown';
      console.log(formData.get('birthDate')?.value);
      const fechaNacimientoString =
        formData.get('birthDate')?.value ?? '10102021';
      const fechaNacimientoNumber = Number(
        fechaNacimientoString.replace(/-/g, '')
      );
      const edad = Number(formData.get('age')?.value ?? 1);
      const estatus = formData.get('status')?.value === 'activo';
      const idCargo = Number(formData.get('position')?.value ?? 1);

      const randomId: string = this.generateRandomId();

      const newEmployer: Employer = {
        id: randomId,
        nombre: nombreCompleto,
        fechaNacimiento: fechaNacimientoNumber,
        edad: edad,
        estatus: estatus,
        idCargo: idCargo,
      };

      console.log(newEmployer);
      this.employersService
        .addEmployer(newEmployer)
        .then(() => this.clearInputs());
    }
  }

  clearInputs() {
    this.formData.reset();
    this.formData.get('status')?.setValue('activo');
  }
}
