<script setup lang="ts">
    import Challenge from './Challenge.vue';
    import Quiz from './Quiz.vue';
</script>

<template>
    <div class="flex items-center justify-between pb-3">
        <span class="text-[11px] font-medium tracking-[0.09em] uppercase text-[#78716C]">Performance</span>
    </div>

    <div class="flex items-end gap-7 mb-[10px]">
        <Challenge />
        <Quiz />
    </div>
</template>