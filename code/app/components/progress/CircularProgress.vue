<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        completed: { type: Number, required: true },
        total:     { type: Number, required: true },
    });

    const size        = 84;
    const strokeWidth = 5;
    const radius      = 32;
    const circumference = 2 * Math.PI * radius;

    const progress = computed(() => circumference - (props.completed / props.total) * circumference);
</script>

<template>
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" role="img" :aria-label="`${completed} of ${total} lessons complete`">
        <!-- Track -->
        <circle
            class="ring-track"
            :cx="size / 2"
            :cy="size / 2"
            :r="radius"
        />

        <!-- Fill -->
        <circle
            class="ring-fill"
            :cx="size / 2"
            :cy="size / 2"
            :r="radius"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="progress"
        />

        <!-- Center text -->
        <text class="ring-center-num" :x="size / 2" :y="(size / 2) - 4" text-anchor="middle" dominant-baseline="middle">{{ completed }}</text>
        <text class="ring-center-denom" :x="size / 2" :y="(size / 2) + 10" text-anchor="middle">of {{ total }}</text>
    </svg>
</template>

<style scoped>
    .ring-track {
        fill: none;
        stroke: var(--surface-container-high);
        stroke-width: 5;
    }
    .ring-fill {
        fill: none;
        stroke: var(--electric-500);
        stroke-width: 5;
        stroke-linecap: round;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .ring-center-num {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 17px;
        fill: var(--navy-900);
        font-weight: 700;
    }
    .ring-center-denom {
        font-family: 'Inter', sans-serif;
        font-size: 9px;
        fill: var(--text-muted);
        font-weight: 400;
    }
</style>
