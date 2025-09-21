import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notizen } from './notizen';

describe('Notizen', () => {
  let component: Notizen;
  let fixture: ComponentFixture<Notizen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notizen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Notizen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
