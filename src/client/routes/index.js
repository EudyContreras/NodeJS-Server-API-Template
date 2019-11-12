
import Home from '../components/home';
import Topics from '../components/topics';
import NotFound from '../components/notFound';

export default [
  {path: '/', component: Home},
  {path: '/topics', component: Topics},
  {component: NotFound}
]