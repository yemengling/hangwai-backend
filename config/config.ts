// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
          redirect: '/user/myLogin'
        },
        {
          name: 'myLogin',
          path: '/user/myLogin',
          component: './user/myLogin'
        }
      ]
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome'
            },
            {
              icon: 'smile',
              name: '欢迎',
              path: '/welcome',
              component: './Welcome'
            },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              icon: 'database',
              name: '数据管理',
              path: '/dataManage',
              routes: [
                {
                  path: '/dataManage/showChart',
                  name: '图表统计',
                  component: './dataManage/showChart/ShowChart',
                },
                {
                  path: '/dataManage/schoolList',
                  name: '学校录入',
                  component: './dataManage/schoolList/SchoolList',
                  operation: [
                    {
                      name: "新增",
                      pageNameEn: "schoolList_add"
                    },
                    {
                      name: "编辑",
                      pageNameEn: "schoolList_update"
                    },
                    {
                      name: "删除",
                      pageNameEn: "schoolList_delete"
                    }
                  ]
                },
                {
                  path: '/dataManage/studentList',
                  name: '学生录入',
                  component: './dataManage/studentList/StudentList',
                },
              ],
            },
            {
              icon: 'setting',
              name: '系统设置',
              path: '/systemManage',
              routes: [
                {
                  path: '/systemManage/setRole',
                  name: '用户权限',
                  component: './systemManage/setRole/SetRole',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
