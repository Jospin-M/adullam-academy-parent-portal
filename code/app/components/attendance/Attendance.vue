<script setup>
    import { ref, computed } from 'vue';
    import Legend from './Legend.vue';

    const CLASS_INDICES = [0, 6];
    const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const DAY_TYPES = ['inclass', 'none', 'help', 'help', 'help', 'help', 'inclass'];

    const { students } = useStudents();
    const student = computed(() => students.value.selectedStudent);
    const attendance = computed(() => student.value.attendance);

    const totalClassDays = computed(() => {
        return attendance.value.weeks.reduce((sum, week) =>
            sum + CLASS_INDICES.filter(i => week.days[i] !== null).length, 0);
    });

    const presentClassDays = computed(() => {
        return attendance.value.weeks.reduce((sum, week) =>
        sum + CLASS_INDICES.filter(i => week.days[i] === 'present').length, 0);
    });

    const absentClassDays = computed(() => totalClassDays.value - presentClassDays.value);

    const attendancePercent = computed(() => {
        return totalClassDays.value > 0
        ? Math.round((presentClassDays.value / totalClassDays.value) * 100)
        : 0;
    });

    const absencesSummary = computed(() => `${absentClassDays.value} absence${absentClassDays.value !== 1 ? 's' : ''} this term`);

    const percentColor = computed(() =>
        attendancePercent >= 90 ? 'var(--success)' : 'var(--alert)'
    );

    const showLog = ref(false);

    /**
     * Determines the CSS class for an attendance dot based on status and day type
     * @param {string} status - The attendance status ('present', 'absent', or null)
     * @param {number} dayIndex - The index of the day (0-6) to determine session type (class or help)
     * @returns {string} The CSS class name for styling the attendance indicator
     */
    function dotClass(status, dayIndex) {
        const type = DAY_TYPES[dayIndex];

        if (status === 'present') {
            return type === 'help'
                ? 'attendance-dot-present-help'
                : 'attendance-dot-present-class';
        }

        if (status === 'absent') {
            return type === 'inclass'
                ? 'attendance-dot-absent-class'
                : 'attendance-dot-absent-help';
        }

        return 'attendance-dot-none';
    }
</script>

<template>
    <div class="card p-6">
        <div class="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 body-text" style="color: var(--text-muted);">
            Attendance
        </div>

        <div class="flex items-center justify-between mb-[6px]">
            <span
                class="headline text-[30px] font-bold leading-none"
                :style="{ color: percentColor }"
                :aria-label="`Attendance: ${attendancePercent} percent`"
            >
                {{ attendancePercent }}%
            </span>

            <button
                class="text-[12px] body-text cursor-pointer inline-block transition-[color] duration-150 bg-transparent border-none p-0 font-normal"
                style="color: var(--text-muted);"
                :aria-expanded="showLog"
                aria-controls="attendance-log"
                @click="showLog = !showLog"
            >
                {{ showLog ? 'Hide log ▴' : 'View log ▾' }}
            </button>
        </div>

        <div class="text-[12px] body-text mb-3" style="color: var(--text-muted);">
            {{ absencesSummary }} · based on in-class sessions only
        </div>

        <div
            v-show="showLog"
            class="attendance-log open"
            id="attendance-log"
            role="region"
            aria-label="Term attendance log"
        >
            <div class="pt-[14px]" style="border-top: 1px solid rgba(69,71,76,0.10);">
                <!-- Day headers -->
                <div class="flex items-center gap-[10px] mb-[6px]">
                    <span class="w-16 shrink-0"></span>
                    <div class="flex flex-1 items-center">
                        <span
                            v-for="(day, i) in DAYS"
                            :key="i"
                            class="flex-1 text-[9px] text-center body-text"
                            :class="DAY_TYPES[i] === 'none' ? 'opacity-65' : ''"
                            style="color: var(--text-muted);"
                        >
                            {{ day }}
                        </span>
                    </div>
                </div>

                <!-- Week rows -->
                <div
                    v-for="week in attendance.weeks"
                    :key="week.startDate"
                    class="att-week flex items-center gap-[10px] py-[6px] body-text text-[11px]"
                    style="color: var(--text-muted); border-top: 1px solid rgba(69,71,76,0.08);"
                >
                    <span class="w-16 shrink-0 text-[11px]">
                        {{ week.startDate }}
                    </span>

                    <div class="flex flex-1 items-center">
                        <span
                            v-for="(status, i) in week.days"
                            :key="i"
                            class="flex-1 flex justify-center"
                        >
                            <span
                                class="w-2 h-2 rounded-full shrink-0"
                                :class="dotClass(status, i)"
                            ></span>
                        </span>
                    </div>
                </div>

                <Legend />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Present — in-class (primary signal) */
.attendance-dot-present-class {
    background: var(--navy-900);
    opacity: 0.7;
}

/* Present — help session (secondary signal) */
.attendance-dot-present-help {
    background: var(--navy-900);
    opacity: 0.25;
    border: 1px solid rgba(15, 23, 42, 0.25);
}

/* Absent — in-class */
.attendance-dot-absent-class {
    background: transparent;
    border: 1.5px solid var(--alert);
}

/* Absent — help session */
.attendance-dot-absent-help {
    background: transparent;
    border: 1.5px solid var(--gold-500);
}

/* No data */
.attendance-dot-none {
    background: transparent;
    border: 1.5px solid rgba(69, 71, 76, 0.2);
    opacity: 0.5;
}
</style>