import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentReviewDetailsThumbnailComponent } from './rent-review-details-thumbnail.component';

describe('RentReviewDetailsThumbnailComponent', () => {
  let component: RentReviewDetailsThumbnailComponent;
  let fixture: ComponentFixture<RentReviewDetailsThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentReviewDetailsThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentReviewDetailsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
