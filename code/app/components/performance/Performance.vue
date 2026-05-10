<script setup>
    import Quiz from './Quiz.vue';
    import Challenge from './Challenge.vue';

    const { students } = useStudents();
    const scores = computed(() => student.value.scores);
    const student = computed(() => students.value.selectedStudent);
</script>

<template>
    <div class="card p-6">
        <div class="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 body-text" style="color: var(--text-muted);">Coding performance</div>

        <div class="flex items-end gap-7">
            <Challenge :challengePassRate="scores.challengePassRate" />
            <Quiz :quizAverage="scores.quizAverage" />
        </div>
    </div>
</template>
