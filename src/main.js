import { createApp } from 'vue';
import App from './App.vue';
import Home from './components/Home.vue';
import TodoList from './components/TodoList.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/todo-list', component: TodoList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');

