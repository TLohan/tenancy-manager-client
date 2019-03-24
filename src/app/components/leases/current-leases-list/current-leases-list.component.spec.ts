import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLeasesListComponent } from './current-leases-list.component';

describe('CurrentLeasesListComponent', () => {
  let component: CurrentLeasesListComponent;
  let fixture: ComponentFixture<CurrentLeasesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLeasesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLeasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
