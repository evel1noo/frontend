import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eintraege } from './eintraege';

describe('Eintraege', () => {
  let component: Eintraege;
  let fixture: ComponentFixture<Eintraege>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eintraege]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eintraege);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
