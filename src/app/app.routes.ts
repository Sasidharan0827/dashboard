import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Create } from './pages/create/create';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { List } from './pages/list/list';
import { Edit } from './pages/edit/edit';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: Dashboard,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: Create,
      },
      {
        path: 'list',
        component: List,
      },
      {
        path: 'edit/:id',
        component: Edit,
      },
    ],
  },
];
