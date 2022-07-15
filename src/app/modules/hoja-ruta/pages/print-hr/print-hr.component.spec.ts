import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintHrComponent } from './print-hr.component';

describe('PrintHrComponent', () => {
  let component: PrintHrComponent;
  let fixture: ComponentFixture<PrintHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
