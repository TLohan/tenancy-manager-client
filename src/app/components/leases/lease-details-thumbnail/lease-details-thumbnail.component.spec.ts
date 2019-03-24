import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseDetailsThumbnailComponent } from './lease-details-thumbnail.component';

describe('LeaseDetailsThumbnailComponent', () => {
  let component: LeaseDetailsThumbnailComponent;
  let fixture: ComponentFixture<LeaseDetailsThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseDetailsThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseDetailsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
