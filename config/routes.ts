export default [
  {
    name: 'account',
    layout: 'account',
    path: '/account/login',
    component: './User/login',
  },
  {
    path: '/welcome',
    name: 'welcome',
    layout: 'application',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    layout: 'application',
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
          },
        ],
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
