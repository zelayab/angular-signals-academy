import { Routes } from '@angular/router';
import { App } from './app';
import { RootComponent } from './root.component';

export const routes: Routes = [
  { path: '', component: RootComponent, children: [{ path: '', component: App }] },
  { path: '**', redirectTo: '' },
];
