<template>
  <div>
    <h1>Добро пожаловать на главную страницу</h1>
    <router-link to="/todo-list" class="button">Перейти к списку задач</router-link>
  </div>
</template>

<style>
.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #00ffc8;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
