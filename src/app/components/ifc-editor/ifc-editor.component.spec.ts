import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfcEditorComponent } from './ifc-editor.component';

describe('IfcEditorComponent', () => {
  let component: IfcEditorComponent;
  let fixture: ComponentFixture<IfcEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfcEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IfcEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
