<script setup>
    import { ref } from 'vue'
    import CircularProgress from './CircularProgress.vue';

    const weeks = [
        { label: 'Week 1', lessons: 3 },
        { label: 'Week 2', lessons: 3 },
        { label: 'Week 3', lessons: 3 },
        { label: 'Week 4', lessons: 3 },
        { label: 'Week 5', lessons: 1 },
    ];

    const totalLessons = 24;
    const completedLessons = ref(weeks.map(week => week.lessons).reduce((prev, next) => prev + next));

    const showWeeks = ref(false);
</script>

<template>
    <div class="mb-[6px]">
        <div class="flex items-center justify-between pb-3 border-b border-[#E7E5E0] mb-4">
            <span class="text-[11px] font-medium tracking-[0.09em] uppercase text-[#78716C]">Lessons progress</span>
        </div>

        <div class="flex justify-center items-center gap-[18px] mb-3">
            <CircularProgress :completed="completedLessons" :total="totalLessons" />
        </div>

        <div
            class="text-[12px] text-[#78716C] cursor-pointer border-b border-[#E7E5E0] no-underline inline-block mt-[2px] transition-[color] duration-150 font-['DM_Sans',system-ui,sans-serif] hover:text-[#1C1917]"
            :aria-expanded="showWeeks"
            aria-controls="week-expand"
            @click="showWeeks = !showWeeks"
        >
            Show per-week breakdown {{ showWeeks ? '▴' : '▾' }}
        </div>

        <div
            v-if="showWeeks"
            class="week-expand border-t border-[#E7E5E0] mt-[10px] pt-[10px]"
            id="week-expand"
            role="region"
            aria-label="Per-week lesson breakdown"
        >
            <div
                v-for="week in weeks"
                :key="week.label"
                class="flex justify-between text-[12px] text-[#78716C] py-[3px]"
            >
                <span>{{ week.label }}</span>
                <span>{{ week.lessons }} lessons</span>
            </div>
        </div>
    </div>
</template>