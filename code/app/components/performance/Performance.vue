<script setup lang="ts">
    import Challenge from './Challenge.vue';
    import Quiz from './Quiz.vue';
</script>

<template>
    <div class="card p-6">
        <div class="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 body-text" style="color: var(--text-muted);">Coding performance</div>

        <div class="flex items-end gap-7 mb-4">
            <Challenge />
            <Quiz />
        </div>

        <div class="flex items-center gap-[6px] text-[12px] body-text" style="color: var(--text-muted);">
            <span class="text-[14px]" aria-hidden="true">↘</span>
            <span>Declining over the last 4 weeks</span>
        </div>
    </div>
</template>
