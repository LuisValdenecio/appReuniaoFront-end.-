import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriocompletoComponent } from './relatoriocompleto.component';

describe('RelatoriocompletoComponent', () => {
  let component: RelatoriocompletoComponent;
  let fixture: ComponentFixture<RelatoriocompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoriocompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriocompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
