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
    const allDone = computed(() => completedTodos.value === todos.value.length);

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
    <!-- Progress Crown header -->
    <div class="flex items-baseline justify-between mb-4 gap-3">
        <p class="text-[15px] font-semibold headline" id="todo-summary" style="color: var(--navy-900);">
            Elijah has completed {{ completedTodos }} of {{ todos.length }} to-dos this week
        </p>
    </div>

    <!-- Progress Crown bar -->
    <div class="relative mb-5">
        <div
            class="h-[6px] rounded-[3px] overflow-hidden relative"
            style="background: var(--surface-container-high);"
            role="progressbar"
            aria-label="To-do completion"
            aria-valuemin="0"
            :aria-valuemax="todos.length"
            :aria-valuenow="completedTodos"
        >
            <div
                class="todo-progress-fill h-full rounded-[3px]"
                :class="{ 'complete': allDone }"
                :style="{ width: `${progress}%`, background: 'var(--electric-500)' }"
            ></div>
        </div>
    
        <span
            class="absolute top-1/2 -translate-x-[-20%] -translate-y-[54%] transition-all duration-300"
            style="right: -2px; font-size: 20px;"
            :style="{
                color: allDone ? 'var(--gold-500)' : 'var(--gold-500)',
                opacity: allDone ? 1 : 0.4,
                filter: allDone ? 'drop-shadow(0 0 6px rgba(234,179,8,0.6))' : 'none'
            }"
            aria-hidden="true"
        >
            ★
        </span>
    </div>

    <!-- List -->
    <div
        class="todo-list-scroll"
        :class="{ 'scrollable': todos.length > 5 }"
        :style="todos.length > 5 && scrollHeight ? { maxHeight: scrollHeight + 'px' } : {}"
    >
        <ul class="list-none" id="todo-list" aria-label="Weekly to-dos" ref="listRef">
            <li
                v-for="todo in todos"
                :key="todo.id"
                class="todo-item flex items-start gap-3 py-[11px] transition-opacity duration-200"
                :class="{ 'is-done': todo.complete }"
                style="border-top: 1px solid rgba(69,71,76,0.10);"
            >
                <button
                    class="todo-checkbox w-4 h-4 rounded ghost-border shrink-0 mt-[2px] cursor-pointer bg-transparent flex items-center justify-center transition-all duration-150 p-0"
                    :class="{ 'checked': todo.complete }"
                    @click="toggleTodo(todo.id)"
                    :aria-label="`Mark '${todo.task}' as ${todo.complete ? 'incomplete' : 'complete'}`"
                    :aria-pressed="todo.complete"
                ></button>

                <span
                    class="todo-label flex-1 text-[13px] font-normal body-text leading-[1.5] cursor-pointer transition-[color] duration-150"
                    style="color: var(--on-surface);"
                    @click="toggleTodo(todo.id)"
                >
                    {{ todo.task }}
                </span>

                <span
                    v-if="todo.overdue"
                    class="todo-overdue-badge text-[10px] font-semibold rounded-[4px] py-[2px] px-[7px] whitespace-nowrap shrink-0 mt-[3px] transition-opacity duration-300 body-text"
                    style="background: rgba(194,65,12,0.10); color: var(--alert);"
                >
                    {{ todo.overdue }} days overdue
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    /* TODO ── done state */
    .todo-item.is-done {
        opacity: 0.42;
    }
    .todo-item.is-done .todo-label {
        text-decoration: line-through;
        color: var(--text-muted);
    }
    .todo-item.is-done .todo-overdue-badge {
        opacity: 0;
        pointer-events: none;
    }

    /* Checkbox: navy fill + gold check */
    .todo-checkbox {
        position: relative;
    }
    .todo-checkbox.checked {
        background: var(--navy-900) !important;
        border-color: var(--navy-900) !important;
    }
    .todo-checkbox.checked::after {
        content: '';
        display: block;
        width: 8px;
        height: 5px;
        border-left: 1.5px solid var(--gold-500);
        border-bottom: 1.5px solid var(--gold-500);
        transform: rotate(-45deg) translate(1px, -1px);
    }

    /* Progress fill animation */
    .todo-progress-fill {
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;
    }
    .todo-progress-fill.complete {
        background: var(--electric-500);
    }

    .todo-list-scroll {
        scrollbar-width: thin;
        scrollbar-color: var(--surface-container-high) transparent;
    }
    .todo-list-scroll::-webkit-scrollbar {
        width: 4px;
    }
    .todo-list-scroll::-webkit-scrollbar-track {
        background: transparent;
    }
    .todo-list-scroll::-webkit-scrollbar-thumb {
        background-color: var(--surface-container-high);
        border-radius: 999px;
    }
    .todo-list-scroll::-webkit-scrollbar-thumb:hover {
        background-color: rgba(69, 71, 76, 0.25);
    }
    .todo-list-scroll.scrollable {
        overflow-y: auto;
    }
</style>
