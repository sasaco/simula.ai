import { Component } from '@angular/core';
import { ThreeComponent } from "../three/three.component";

@Component({
    selector: 'app-ifc-editor',
    standalone: true,
    templateUrl: './ifc-editor.component.html',
    styleUrl: './ifc-editor.component.scss',
    imports: [ThreeComponent]
})
export class IfcEditorComponent {

}
