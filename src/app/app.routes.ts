import { Routes } from '@angular/router';
import { CssUnitEaseComponent } from './css-unit-ease/css-unit-ease.component';

export const routes: Routes = [
    { path: '', redirectTo: 'css-unit-ease', pathMatch: 'full' },
    { 
        path: 'css-unit-ease', 
        component: CssUnitEaseComponent, 
        loadChildren: () => import('./css-unit-ease/app.routes').then(r => r.cssUnitsEaseRoutes) 
    }
];
