import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysComponent } from './pays.component';

describe('PaysComponent', () => {
  let component: PaysComponent;
  let fixture: ComponentFixture<PaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
