import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployersRegisterPage } from './employers-register.page';

describe('EmployersRegisterPage', () => {
  let component: EmployersRegisterPage;
  let fixture: ComponentFixture<EmployersRegisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmployersRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
