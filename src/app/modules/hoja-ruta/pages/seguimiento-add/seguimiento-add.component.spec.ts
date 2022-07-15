import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAddComponent } from './seguimiento-add.component';

describe('SeguimientoAddComponent', () => {
  let component: SeguimientoAddComponent;
  let fixture: ComponentFixture<SeguimientoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
