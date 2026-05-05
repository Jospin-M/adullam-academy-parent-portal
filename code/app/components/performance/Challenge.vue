<script setup>
    const passRate = 62;
</script>

<template>
    <div class="flex flex-col gap-[3px]">
        <span
            class="headline text-[40px] font-bold leading-none max-[700px]:text-[32px]"
            style="color: var(--alert);"
            aria-label="Challenge pass rate, below threshold"
        >{{ passRate }}%</span>
        <span class="text-[12px] body-text font-normal" style="color: var(--text-muted);">Challenge pass rate</span>
    </div>
</template>
