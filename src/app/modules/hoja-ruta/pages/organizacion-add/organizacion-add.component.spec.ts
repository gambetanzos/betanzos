import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionAddComponent } from './organizacion-add.component';

describe('OrganizacionAddComponent', () => {
  let component: OrganizacionAddComponent;
  let fixture: ComponentFixture<OrganizacionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
