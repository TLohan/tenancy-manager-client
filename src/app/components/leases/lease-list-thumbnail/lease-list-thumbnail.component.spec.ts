import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseListThumbnailComponent } from './lease-list-thumbnail.component';

describe('LeaseListThumbnailComponent', () => {
  let component: LeaseListThumbnailComponent;
  let fixture: ComponentFixture<LeaseListThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseListThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseListThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
