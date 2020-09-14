import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts, { Post } from './components/post/Post';

let router = [
  {
    path: '/', //homepage default loading page
    componentName: Landing,
    exact: true, // strict pattern on/off
  },
  {
    path: '/login', //after is transferred id of params
    componentName: Login
  },
  {
    path: '/register',
    componentName: Register
  },
  {
    path: '/dashboard',
    componentName: Dashboard,
    auth: true, // whether auth
    // routes: [ /** nested route, dashboard have sub-pages */
    //  {
    //    path: '/dashboard',
    //    componentName: main,
    //    exact: false
    //  }
    //  ]
  },
  {
    path: '/create-profile',
    componentName: CreateProfile,
    auth: true, // auth ture or false
  },
  {
    path: '/edit-profile',
    componentName: EditProfile,
    auth: true, // auth t/f

  },
  {
    path: '/add-education',
    componentName: AddEducation,
    auth: true, // auth t/f

  },
  {
    path: '/add-experience',
    componentName: AddExperience,
    auth: true, // auth t/f
  },
  { // Developers
    path: '/profiles',
    componentName: Profiles,
    auth: false, // auth t/f
  },
  { // More info about developers
    path: '/profile/:handle', // dynamic transfer params
    componentName: Profile,
    auth: false, // auth t/f
  },
  { // comment
    path: '/feed',
    componentName: Posts,
    auth: false, // auth t/f
  },
  { // encouraging comment
    path: '/post/:id',
    componentName: Post,
    auth: true, // auth t/f
  },


];

export default router;