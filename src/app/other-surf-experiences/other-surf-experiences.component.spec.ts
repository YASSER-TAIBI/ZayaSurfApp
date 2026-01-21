import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSurfExperiencesComponent } from './other-surf-experiences.component';

describe('OtherSurfExperiencesComponent', () => {
  let component: OtherSurfExperiencesComponent;
  let fixture: ComponentFixture<OtherSurfExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherSurfExperiencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherSurfExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
