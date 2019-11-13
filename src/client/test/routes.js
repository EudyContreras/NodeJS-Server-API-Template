
import App from './app'
import Clients from './components/clients/clients.component'
import Reports from './components/reports/reports.component';
import Employees from './components/employees/employee_list.component';

export default [
  {path: '/'},
  {path: '/consultants', component: Employees},
  {path: '/clients', component: Clients},
  {path: '/reports', component: Reports}
]