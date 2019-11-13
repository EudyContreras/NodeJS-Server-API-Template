
import Home from '../components/home';
import Topics from '../components/topics';
import NotFound from '../components/notFound';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/topics',
    component: Topics
  },
  {
    path: '*',
    restricted: false,
    component: NotFound
  }
]