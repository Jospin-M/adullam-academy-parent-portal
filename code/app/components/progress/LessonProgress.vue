<script setup>
    import { ref } from 'vue'
    import CircularProgress from './CircularProgress.vue';

    defineProps(['totalLessons']);

    const { students } = useStudents();
    const student = computed(() => students.value.selectedStudent);
    const weeks = computed(() => student.value.lessonProgress);
    const completedLessons = computed(() => weeks.value.map(week => week.lessons).reduce((prev, next) => prev + next));
    
    const showWeeks = ref(false);
</script>

<template>
    <div class="card p-6">
        <div class="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 body-text" style="color: var(--text-muted);">Lessons progress</div>

        <div class="flex justify-center items-center mb-4">
            <CircularProgress :completed="completedLessons" :total="totalLessons" />
        </div>

        <button
            class="text-[12px] body-text cursor-pointer inline-block mt-[4px] transition-[color] duration-150 bg-transparent border-none p-0 font-normal"
            style="color: var(--text-muted);"
            :aria-expanded="showWeeks"
            aria-controls="week-expand"
            @click="showWeeks = !showWeeks"
        >
            {{ !showWeeks ? 'Show' : 'Hide' }} per-week breakdown {{ showWeeks ? '▴' : '▾' }}
        </button>

        <div
            v-if="showWeeks"
            class="week-expand mt-[12px] pt-[12px]"
            id="week-expand"
            role="region"
            aria-label="Per-week lesson breakdown"
            style="border-top: 1px solid rgba(69,71,76,0.10);"
        >
            <div
                v-for="week in weeks"
                :key="week.label"
                class="flex justify-between text-[12px] body-text py-[4px]"
                style="color: var(--text-muted);"
            >
                <span>{{ week.label }}</span>
                <span style="color: var(--navy-900); font-weight: 600;">{{ week.lessons }} lessons</span>
            </div>
        </div>
    </div>
</template>
