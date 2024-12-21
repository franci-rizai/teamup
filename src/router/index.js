import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import CreateProfile from '@/views/CreateProfile.vue'
import Project from '@/views/Project.vue'
import ProjectDetails from '@/views/ProjectDetails.vue'
import CreateProject from '@/views/CreateProject.vue'
import Dashboard from '@/views/DashboardComp/Dashboard.vue'
import Profile from '@/views/Profile.vue'





const routes = [
  {
   path:'/',
   name:'Home',
   component: Home
  },
 
  {
    path:'/signup',
    name:'Signup',
    component: Signup
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
  path:'/CreateProfile',
    name:'CreateProfile',
    component: CreateProfile
  },
  {
    path:'/Profile',
      name:'Profile',
      component: Profile
    },
  {
    path:'/Project',
      name:'Project',
      component: Project
    },
    {
      path:'/Project/:id',
        name:'ProjectDetails',
        component: ProjectDetails,
        props: true,
      },
      {
        path:'/CreateProject',
          name:'CreateProject',
          component: CreateProject,
          props: true,
        },
        {
          path:'/Dashboard',
            name:'Dashboard',
            component: Dashboard,
            props: true,
          }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
