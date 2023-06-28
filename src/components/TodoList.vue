<template>
  <div>
    <h1>Мененджер задач</h1>
    <form @submit.prevent="addTask" class="task-form">
      <div class="input-wrapper">
        <label for="taskName" class="input-label">Название</label>
        <input v-model="taskName" id="taskName" type="text" class="input-field">
      </div>
      <div class="input-wrapper">
        <label for="taskDescription" class="input-label">Описание</label>
        <textarea v-model="taskDescription" id="taskDescription" class="input-field"></textarea>
      </div>
      <button type="submit" class="button">{{ editIndex !== -1 ? 'Edit Task' : 'Добавить' }}</button> 
    </form>
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
        <button @click="removeTask(index)" class="button delete-button">&#10005;</button>
        <button @click="editTask(index)" class="button edit-button">Редактировать</button> 
      </li>
    </ul>
    <button @click="goToHome" class="button go-home-btn">Вернуться на домашнюю страницу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
      taskDescription: '',
      tasks: [], // Сохранение задач
      editIndex: -1 // Индекс задачи для редактирования
    };
  },
  created() {
    // Получам сохраненные задачи из localStorage при загрузке страницы
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  },
  methods: {
    addTask() {
      if (this.taskName && this.taskDescription) {
        if (this.editIndex !== -1) {
          this.tasks[this.editIndex] = { name: this.taskName, description: this.taskDescription };
          this.editIndex = -1; // Сброс индекса редактирования
        } else {
          this.tasks.push({ name: this.taskName, description: this.taskDescription });
        }
        this.taskName = '';
        this.taskDescription = '';
        // Сохраняем задачи в localStorage
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      // Обновляем сохраненные задачи в localStorage
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    editTask(index) {
      const task = this.tasks[index];
      this.taskName = task.name;
      this.taskDescription = task.description;
      this.editIndex = index;
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.task-form {
  margin-bottom: 20px;
}

.input-wrapper {
  margin-bottom: 10px;
}

.input-label {
  display: block;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
}

.task-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  position: relative; /* добавлено для положения кнопок */
}

.task-item h3 {
  margin: 0;
  font-size: 25px;
  }

.task-item p {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #00ffc8;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ff0000;
}

.go-home-btn {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>