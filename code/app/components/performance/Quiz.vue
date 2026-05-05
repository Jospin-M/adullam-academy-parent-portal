<script setup>
    const average = 83;
</script>

<template>
    <div class="flex flex-col gap-[3px]">
        <span
            class="headline text-[28px] font-bold leading-none"
            style="color: var(--alert);"
            aria-label="Quiz average, below threshold"
        >{{ average }}%</span>
        <span class="text-[12px] body-text font-normal" style="color: var(--text-muted);">Quiz average</span>
    </div>
</template>
