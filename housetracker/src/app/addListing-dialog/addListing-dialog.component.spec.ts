import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListingDialogComponent } from './addListing-dialog.component';

describe('ModalDialogComponent', () => {
  let component: AddListingDialogComponent;
  let fixture: ComponentFixture<AddListingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
