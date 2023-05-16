import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterpaysComponent } from './ajouterpays.component';

describe('AjouterpaysComponent', () => {
  let component: AjouterpaysComponent;
  let fixture: ComponentFixture<AjouterpaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterpaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterpaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
