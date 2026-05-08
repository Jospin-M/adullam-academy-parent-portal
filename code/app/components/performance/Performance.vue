<script setup>
    import Challenge from './Challenge.vue';
    import Quiz from './Quiz.vue';

    const { students } = useStudents();
    const student = computed(() => students.value.selectedStudent);
    const scores = computed(() => student.value.scores);
</script>

<template>
    <div class="card p-6">
        <div class="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 body-text" style="color: var(--text-muted);">Coding performance</div>

        <div class="flex items-end gap-7 mb-4">
            <Challenge :challengePassRate="scores.challengePassRate"/>
            <Quiz :quizAverage="scores.quizAverage" />
        </div>
    </div>
</template>
