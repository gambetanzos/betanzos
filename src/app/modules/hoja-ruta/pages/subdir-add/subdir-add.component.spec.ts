import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdirAddComponent } from './subdir-add.component';

describe('SubdirAddComponent', () => {
  let component: SubdirAddComponent;
  let fixture: ComponentFixture<SubdirAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdirAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdirAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
