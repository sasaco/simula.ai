import { Routes } from '@angular/router';
import { IfcEditorComponent } from './components/ifc-editor/ifc-editor.component';

export const routes: Routes = [
    /* ここに新しいページを追加する */
    { path: 'ifcedit', component: IfcEditorComponent },
    { path: '**', component: IfcEditorComponent }
];
