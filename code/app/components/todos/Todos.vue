<script setup>
    import { ref, computed, onMounted } from 'vue';

    const todos = ref([
        { id: "t1",  complete: false, task: "Watch Python Functions lesson video" },
        { id: "t2",  complete: false, task: "Complete Week 13 quiz" },
        { id: "t3",  complete: false, task: "Review loops exercise feedback" },
        { id: "t4",  complete: false, task: "Watch Week 14 introduction video" },
        { id: "t5",  complete: false, task: "Install VS Code & Python" },
        { id: "t6",  complete: false, task: "Complete the Python Functions coding challenge" },
        { id: "t7",  complete: false, task: "Read Week 14 lesson notes" },
        { id: "t8",  complete: false, task: "Submit Week 12 reflection" },
        { id: "t9",  complete: false, task: "Practice writing functions with return values" },
        { id: "t10", complete: false, task: "Message tutor with any questions before next session" },
    ]);
    const completedTodos = ref(todos.value.filter(todo => todo.complete).length);

    const listRef = ref(null);
    const scrollHeight = ref(null);
    const progress = computed(() => (completedTodos.value / todos.value.length) * 100);

    onMounted(() => {
        if (!listRef.value || todos.value.length <= 5) return
        const items = listRef.value.querySelectorAll('.todo-item')
        let height = 0
        for (let i = 0; i < 5 && i < items.length; i++) {
            height += items[i].getBoundingClientRect().height
        }
        scrollHeight.value = height
    })

    function toggleTodo(id) {
        const index = todos.value.findIndex(todo => todo.id === id);

        if (!todos.value[index].complete) {
            completedTodos.value++;
        } else {
            completedTodos.value--;
        }

        todos.value[index].complete = !todos.value[index].complete;

        console.log("sending request to update todo state", todos.value[index].id);
        console.log(`${completedTodos.value} todos have been completed`);
    }
</script>

<template>
    <div class="flex items-baseline justify-between mb-[14px] gap-3">
        <p class="text-[15px] font-medium" id="todo-summary">
            {{ completedTodos }} of {{ todos.length }} to-dos complete
        </p>
    </div>

    <div
        class="h-[3px] bg-[#E7E5E0] rounded-[2px] mb-[18px] overflow-hidden"
        role="progressbar"
        aria-label="To-do completion"
        aria-valuemin="0"
        :aria-valuemax="todos.length"
        :aria-valuenow="completedTodos"
    >
        <div
            class="h-full rounded-[2px] bg-[#1C1917] opacity-30 transition-[width] duration-300"
            :style="{ width: `${progress}%` }"
        ></div>
    </div>

    <div
        class="todo-list-scroll"
        :class="{ 'scrollable': todos.length > 5 }"
        :style="todos.length > 5 && scrollHeight ? { maxHeight: scrollHeight + 'px' } : {}"
    >
        <ul class="list-none" id="todo-list" aria-label="Weekly to-dos" ref="listRef">
            <li
                v-for="todo in todos"
                :key="todo.id"
                class="todo-item flex items-start gap-3 py-[10px] border-t border-[#E7E5E0] first:border-t-0 first:pt-0 transition-opacity duration-200"
                :class="{ 'is-done': todo.complete }"
            >
                <button
                    class="todo-checkbox w-4 h-4 rounded border-[1.5px] border-[#C8C4BC] shrink-0 mt-[2px] cursor-pointer bg-transparent flex items-center justify-center transition-[border-color,background] duration-150 p-0 hover:border-[#78716C]"
                    :class="{ 'checked': todo.complete }"
                    @click="toggleTodo(todo.id)"
                    :aria-label="`Mark '${todo.task}' as ${todo.complete ? 'incomplete' : 'complete'}`"
                    :aria-pressed="todo.complete"
                >
                    <div v-if="todo.complete" class="flex items-center justify-center bg-black rounded h-full w-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </button>

                <span
                    class="todo-label flex-1 text-[13px] font-normal text-[#1C1917] leading-[1.5] cursor-pointer transition-[color] duration-150"
                    :class="{ 'line-through text-[#9C9491]': todo.complete }"
                    @click="toggleTodo(todo.id)"
                >
                    {{ todo.task }}
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .todo-list-scroll {
        scrollbar-width: thin;
        scrollbar-color: #E7E5E0 transparent;
    }

    .todo-list-scroll::-webkit-scrollbar {
        width: 4px;
    }

    .todo-list-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .todo-list-scroll::-webkit-scrollbar-thumb {
        background-color: #E7E5E0;
        border-radius: 999px;
    }

    .todo-list-scroll::-webkit-scrollbar-thumb:hover {
        background-color: #A8A29E;
    }

    .todo-list-scroll.scrollable {
        overflow-y: auto;
    }
</style>