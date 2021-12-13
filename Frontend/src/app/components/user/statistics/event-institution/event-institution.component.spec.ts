import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInstitutionComponent } from './event-institution.component';

describe('EventInstitutionComponent', () => {
  let component: EventInstitutionComponent;
  let fixture: ComponentFixture<EventInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventInstitutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
