<script setup>
    import { ref } from 'vue';
    import Legend from './Legend.vue';

    const CLASS_INDICES = [0, 6];
    const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const DAY_TYPES = ['inclass', 'none', 'help', 'help', 'help', 'help', 'inclass'];

    const attendance = {
        label: 'Term 2 · 2025',
        weeks: [
            {
                startDate: '29 Sep',
                days: ['present', null, 'present', 'present', 'present', 'present', 'present'],
            },
            {
                startDate: '6 Oct',
                days: ['present', null, 'absent', 'present', 'present', 'present', 'present'],
            },
            {
                startDate: '13 Oct',
                days: ['present', null, 'present', 'present', 'absent', 'present', 'present'],
            },
            {
                startDate: '20 Oct',
                days: ['present', null, null, null, null, null, null],
            },
        ],
    };

    const totalClassDays = attendance.weeks.reduce((sum, week) =>
        sum + CLASS_INDICES.filter(i => week.days[i] !== null).length, 0);

    const presentClassDays = attendance.weeks.reduce((sum, week) =>
        sum + CLASS_INDICES.filter(i => week.days[i] === 'present').length, 0);

    const absentClassDays = totalClassDays - presentClassDays
    const attendancePercent = totalClassDays > 0
        ? Math.round((presentClassDays / totalClassDays) * 100)
        : 0;
    const absencesSummary = `${absentClassDays} absence${absentClassDays !== 1 ? 's' : ''} this term`;

    const showLog = ref(false);

    function dotClass(status, dayIndex) {
        const type = DAY_TYPES[dayIndex];

        if (status === 'present') return 'bg-[#1C1917] opacity-[0.55]';
        if (status === 'absent')  return type === 'inclass' ? 'bg-[#DC2626]' : 'bg-[#D97706]';
        
        return 'border-[1.5px] border-[#57534E ] opacity-25';
    }
</script>

<template>
    <div class="mb-[6px]">
        <div class="flex items-center justify-between pb-3 border-b border-[#E7E5E0] mb-4">
            <span class="text-[11px] font-medium tracking-[0.09em] uppercase text-[#78716C]">Attendance</span>
        </div>

        <div class="flex items-center justify-between mb-[2px]">
            <span class="font-['Lora',Georgia,serif] text-[22px] font-normal text-[#2D6A4F]">{{ attendancePercent }}%</span>

            <div
                class="text-[12px] text-[#78716C] cursor-pointer border-b border-[#E7E5E0] inline-block mt-[2px] transition-[color] duration-150 font-['DM_Sans',system-ui,sans-serif] hover:text-[#1C1917]"
                :aria-expanded="showLog"
                aria-controls="attendance-log"
                @click="showLog = !showLog"
            >
                {{ showLog ? 'Hide attendance log ▴' : 'Show attendance log ▾' }}
            </div>
        </div>

        <div class="text-[11px] text-[#57534E ] opacity-60 mb-[6px]">
            Based on in-class sessions only
        </div>

        <div class="text-[12px] text-[#78716C]">
            {{ absencesSummary }}
        </div>

        <div
            v-if="showLog"
            class="attendance-log"
            id="attendance-log"
            role="region"
            aria-label="Term attendance log"
        >
            <div class="border-t border-[#E7E5E0] mt-[10px] pt-[14px]">
                <div class="flex items-baseline justify-between mb-[10px]">
                    <span class="text-[11px] font-medium tracking-[0.06em] uppercase text-[#78716C]">{{ attendance.label }}</span>
                </div>

                <!-- Day headers -->
                <div class="flex items-center gap-[10px] mb-[6px]">
                    <span class="w-16 shrink-0"></span>
                    <div class="flex flex-1 items-center">
                        <span
                            v-for="(day, i) in DAYS"
                            :key="i"
                            class="flex-1 text-[9px] font-normal text-center"
                            :class="DAY_TYPES[i] === 'none' ? 'text-[#78716C] opacity-65' : 'text-[#78716C] '"
                        >{{ day }}</span>
                    </div>
                </div>

                <!-- Week rows -->
                <div
                    v-for="week in attendance.weeks"
                    :key="week.startDate"
                    class="att-week flex items-center gap-[10px] py-[5px] border-t border-[#E7E5E0]"
                >
                    <span class="w-16 shrink-0 text-[11px] text-[#78716C]">{{ week.startDate }}</span>

                    <div class="flex flex-1 items-center">
                        <span
                            v-for="(status, i) in week.days"
                            :key="i"
                            class="flex-1 flex justify-center"
                        >
                            <span class="w-2 h-2 rounded-full shrink-0" :class="dotClass(status, i)"></span>
                        </span>
                    </div>
                </div>

                <Legend />
            </div>
        </div>
    </div>
</template>