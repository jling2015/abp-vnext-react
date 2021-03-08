export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    routes: [
      {
        path: '/admin/identity',
        name: 'identity',
        icon: 'smile',
        routes: [
          {
            path: '/admin/identity/identityUser',
            name: 'identityUser',
            icon: 'smile',
            component: './admin/identity/identityUser',
          },
          {
            path: '/admin/identity/identityRole',
            name: 'identityRole',
            icon: 'smile',
            component: './admin/identity/identityRole',
          }
        ],
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
