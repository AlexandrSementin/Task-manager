<template>
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="addTask" class="task-form">
      <div class="input-wrapper">
        <label for="taskName" class="input-label">Task Name:</label>
        <input v-model="taskName" id="taskName" type="text" class="input-field">
      </div>
      <div class="input-wrapper">
        <label for="taskDescription" class="input-label">Task Description:</label>
        <textarea v-model="taskDescription" id="taskDescription" class="input-field"></textarea>
      </div>
      <button type="submit" class="button">Add Task</button>
    </form>
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
        <button @click="removeTask(index)" class="button">Delete Task</button>
      </li>
    </ul>
    <button @click="goToHome" class="button go-home-btn">Go to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
      taskDescription: '',
      tasks: [] // Сохранение задач
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
        this.tasks.push({ name: this.taskName, description: this.taskDescription });
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

.go-home-btn {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
