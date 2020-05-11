'use strict';

{
  const todos = [];

  document.getElementById('add-button').addEventListener('click', () => {
    const task = document.getElementById('task');
    const todo = {
      task: task.value,
      status: '作業中'
    };
    addToDo(todo);
    task.value = '';
  });

  // ToDo追加
  function addToDo(todo) {
    todos.push(todo);

    const table = document.getElementById('task-table');
    const row = table.insertRow();
    const cellId = row.insertCell(0);
    const cellComment = row.insertCell(1);
    const cellStatus = row.insertCell(2);
    const textIndex = document.createTextNode(todos.length - 1);
    const textTask = document.createTextNode(todo.task);
    const statusButton = createStatusButton(todo);
    const deleteButton = createDeleteButton(todo);

    cellId.appendChild(textIndex);
    cellComment.appendChild(textTask);
    cellStatus.appendChild(statusButton);
    cellStatus.appendChild(deleteButton);
  }

  // ToDo削除
  function deleteToDo(deleteButton, todo) {
    const tr = deleteButton.parentNode.parentNode;
    const deleteIndex = todos.indexOf(todo);
    const tableRows = document.getElementById('task-table').rows;
    tr.parentNode.deleteRow(tr.rowIndex);
    todos.splice(deleteIndex, 1);
    for (let i = 1; i < tableRows.length; i++) {
      tableRows[i].cells[0].textContent = i - 1;
    }
  }

  // 状態ボタン作成
  function createStatusButton(todo) {
    const statusButton = document.createElement('button');
    const text = document.createTextNode(todo.status);
    statusButton.appendChild(text);
    statusButton.addEventListener('click' , () => {
      const index = todos.indexOf(todo);
      const status = (statusButton.textContent === '作業中') ? '完了' : '作業中';
      todos[index].status = statusButton.textContent = status;
    });
    return statusButton;
  }

  // 削除ボタン作成
  function createDeleteButton(todo) {
    const deleteButton = document.createElement('button');
    const text = document.createTextNode('削除');
    deleteButton.appendChild(text);
    deleteButton.addEventListener('click', function() {
      deleteToDo(this, todo);
    });
    return deleteButton;
  }

  const radioButtons = document.getElementsByName('status');
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', () => {
      DisplayToDo();
    });
  });

  // Todoの表示処理
  function DisplayToDo() {
    const table = document.getElementById('task-table');
    const rows = table.rows;
    const status = radioButtons[0].checked ? 'すべて' : radioButtons[1].checked ? '作業中' : '完了';
    for (let i = 1; i < rows.length; i++) {
      if (status === 'すべて' || status === todos[i - 1].status) {
        rows[i].classList.remove('hide');
      } else {
        rows[i].classList.add('hide');
      }
    }
  }
}