

import Home from './components/Home';
import Clients from './components/clients/Clients';
import Reports from './components/reports/Reports';
import Employees from './components/employees/Employees';
import NotFound from './components/common/Lost';

export default [
  {path: '/', component: Home},
  {path: '/consultants', component: Employees},
  {path: '/clients', component: Clients},
  {path: '/reports', component: Reports},
  {path: '*', component: NotFound}
]