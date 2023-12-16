<template>
    <div>
        <h1>Todo page</h1>
        <div class="my-[100px]">
            {{ task }}
            <input v-model="task" type="text" class="border-gray-500">
            <button @click="addToDo" class="bg-blue-200 p-5 rounded-md">add</button>
        </div>
        <div>
            <ul class="bg-blue-200">
                <li v-for="todo in todos" :key="todo.id">
                    <div v-if="current.id==todo.id">
                      <input v-model="current.task" task="text" class="border">
                      <button @click="handleUpdate" class="border">update</button>
                      <button @click="current.id=0" class="border bg-gray-200">cancel</button>
                    </div>
                    <span v-else>{{ todo.task }}</span>
                    <button @click="handleEdit(todo)" class="bg-green-400 p-1 rounded-md m-2">Edit</button>
                    <button @click="handleDelete(todo)" class="bg-red-400 p-1 rounded-md m-2">Delete</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
//import { useApolloClient } from '@vue/apollo-composable'
const { client } = useApolloClient();

const INSERT_TODO = gql`
  mutation insert_todo_one($object: todo_insert_input!) {
    insert_todo_one(object: $object) {
      id
      task
    }
  }
`;


const TODO_QUERY = gql`
query todo($limit: Int , $offset: Int, $orderBy: [todo_order_by!]) {
    todos: todo(limit: $limit, offset: $offset, order_by: $orderBy) {
      id
      task
    }
  }
`;

const task = ref("");
const todos = ref([]);
const current = ref({
  id: 0,
  task: "",
})


async function getTodos() {
    const { data, error } = await useAsyncQuery(TODO_QUERY, {
        limit: 100,
        orderBy: {
            id: 'desc'
        }
    });
    console.log({ data, error });    
    if(data) {
        todos.value = data.value?.todos;
    }
}

getTodos();


async function addToDo() {
  try {
    const { data, errors } = await client.mutate({
      mutation: INSERT_TODO,
      variables: {
        object: {
          task: task.value,
        },
      },
    });
    console.log({ data, errors });
    if (data) {
      todos.value = [...todos.value, data.insert_todo_one]
      task.value = "";
    }
  } catch (error) {
    throw new Error(`[addTodo]: error: ${error}`);
  }
}



const DELETE = gql`
  mutation ($id:Int!){
  delete_todo_by_pk(id: $id) {
    id
    task
  }
}
`



function handleDelete(todo: any) {
  console.log(todo);
  todos.value = todos.value.filter((item: any) => item.id != todo.id);
  client.mutate({
    mutation: DELETE,
    variables: {
      id: todo.id
    }
  })

}

function handleEdit(todo: any) {
  console.log(todo);
  current.value = {
    ...todo
  }
}


const UPDATE = gql`
  mutation ($id: Int!, $set: todo_set_input) {
    todo: update_todo_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      task
    }
  }
`;


function handleUpdate() {
  const items = todos.value.map((item: any) => {
    if(item.id === current.value.id){
      return current.value
    }
    return item;
  })

  const { id, task } = current.value;

  client.mutate({
    mutation: UPDATE,
    variables: {
      id,
      set: {
        task
      },
    },
  });

  todos.value = items
  current.value = {
    id: 0,
    task: "",
  }

}

</script>
