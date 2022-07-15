import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaAddComponent } from './hoja-add.component';

describe('HojaAddComponent', () => {
  let component: HojaAddComponent;
  let fixture: ComponentFixture<HojaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
