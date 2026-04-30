<script setup>
    import { ref } from 'vue';

    const todos = ref([
        {
            id: "t1",
            complete: false,
            task: "Watch Python Functions lesson video"
        },
        {
            id: "t2",
            complete: false,
            task: "Complete Week 13 quiz"
        },
        {
            id: "t3",
            complete: false,
            task: "Review loops exercise feedback"
        },
        {
            id: "t4",
            complete: false,
            task: "Watch Week 14 introduction video"
        },
        {
            id: "t5",
            complete: false,
            task: "Install VS Code & Python"
        }
    ]);

    let completedTodos = ref(todos.value.filter(todo => todo.complete == true).length);;

    function toggleTodo(id) {
        const index = todos.value.findIndex(todo => todo.id === id);

        if(!todos.value[index].complete) {
            completedTodos.value++;
        } else {
            completedTodos.value--;
        }

        todos.value[index].complete = !todos.value[index].complete;

        console.log("sending request to update tb state", todos.value[index].id);
        console.log(`${completedTodos.value} todos have been completed`)
    }

    const progress = computed(() => (completedTodos.value / todos.value.length) * 100);
</script>

<template>
    <div class="flex items-baseline justify-between mb-[14px] gap-3">
        <p class="text-[15px] font-medium" id="todo-summary">
            {{ todos.filter(todo => todo.complete == true).length }} of {{ todos.length }} to-dos complete this week
        </p>
    </div>

    <div class="h-[3px] bg-[#E7E5E0] rounded-[2px] mb-[18px] overflow-hidden" role="progressbar" aria-label="To-do completion" aria-valuemin="0" aria-valuemax="6" aria-valuenow="4">
        <div class="todo-progress-fill h-full rounded-[2px] bg-[#1C1917] opacity-30" id="todo-progress-fill" :style="{ width: `${progress}%` }"></div>
    </div>

    <ul class="list-none" id="todo-list" aria-label="Weekly to-dos">
        <li 
            v-for="(todo) in todos" 
            :key="todo.id" 
            :class="['todo-item', 'flex', 'items-start', 'gap-3', 'py-[10px]', 'border-t', 'border-[#E7E5E0]', 'first:border-t-0', 'first:pt-0', 'transition-opacity', 'duration-200', { 'is-done': todo.complete }]"
            data-todo-id="t1"
        >
            <button 
                :class="['todo-checkbox', 'w-4', 'h-4', 'rounded', 'border-[1.5px]', 'border-[#E7E5E0]', 'shrink-0', 'mt-[2px]', 'cursor-pointer', 'bg-transparent', 'flex', 'items-center', 'justify-center', 'transition-[border-color,background]', 'duration-150', 'p-0', 'font-[\'DM_Sans\',system-ui,sans-serif]', 'hover:border-[#78716C]', { 'checked': todo.complete }, 'bg:black']"
                @click="toggleTodo(todo.id)"
                :aria-label="`Mark '${todo.task}' as ${todo.complete ? 'incomplete' : 'complete'}'`"
                :aria-pressed="todo.complete"
            >
                <div v-if="todo.complete" class="flex-row justify-center items-center bg-black rounded h-[100%] w-[100%] text-white text-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-full h-full text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="3"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </button>

            <span 
                :class="['todo-label', 'flex-1', 'text-[13px]', 'font-normal', 'text-[#1C1917]', 'leading-[1.5]', 'cursor-pointer', 'transition-[color]', 'duration-150', { 'line-through': todo.complete, 'text-[#9C9491]': todo.complete }]"
                @click="toggleTodo(todo.id)"
            >
                {{ todo.task }}
            </span>
        </li>
    </ul>
</template>