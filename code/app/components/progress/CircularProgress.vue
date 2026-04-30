<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        completed: { type: Number, required: true },
        total:     { type: Number, required: true },
    });

    const size        = 80;
    const strokeWidth = 5;
    const radius      = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const percentage = computed(() => (props.completed / props.total) * 100);
    const progress = computed(() => circumference - (props.completed / props.total) * circumference);

    const color = computed(() =>
        percentage.value >= 70 ? '#4A7C59'
        : percentage.value >= 40 ? '#D97706'
        :                           '#DC2626'
    );
</script>

<template>
    <div class="relative inline-flex items-center justify-center" :style="{ width: size + 'px', height: size + 'px' }">
        <svg :width="size" :height="size" class="absolute top-0 left-0 -rotate-90">
            <circle
                :cx="size / 2"
                :cy="size / 2"
                :r="radius"
                fill="none"
                stroke="#E7E5E0"
                :stroke-width="strokeWidth"
            />
            
            <circle
                :cx="size / 2"
                :cy="size / 2"
                :r="radius"
                fill="none"
                :stroke="color"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progress"
                class="transition-[stroke-dashoffset,stroke] duration-500"
            />
        </svg>

        <div class="flex flex-col items-center justify-center leading-none z-10">
            <span class="text-[15px] font-medium text-[#1C1917]">{{ completed }}</span>
            <span class="text-[10px] text-[#78716C]">of {{ total }}</span>
        </div>
    </div>
</template>