import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDetailsThumbnailComponent } from './tenant-details-thumbnail.component';

describe('TenantDetailsThumbnailComponent', () => {
  let component: TenantDetailsThumbnailComponent;
  let fixture: ComponentFixture<TenantDetailsThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantDetailsThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDetailsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
