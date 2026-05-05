<script setup lang="ts">
    import Header from './components/header/Header.vue';
    import Activity from './components/activity-chart/Activity.vue';
    import Perfomance from './components/performance/Performance.vue';
    import LessonProgress from './components/progress/LessonProgress.vue';
    import Suggestions from "./components/practice-suggestions/Suggestions.vue";
    import ActionItems from './components/action-items/ActionItems.vue';
    import Todos from './components/todos/Todos.vue';
    import Attendance from './components/attendance/Attendance.vue';

    const lastUpdated = '3 hours ago';
</script>

<template>
    <div class="dashboard-root min-h-screen">
        <Header />

        <div class="two-col-grid grid [grid-template-columns:58fr_42fr] max-[700px]:grid-cols-1 max-w-[1200px] mx-auto px-5 sm:px-10">
            <!-- ── LEFT COLUMN ── -->
            <div class="pt-10 sm:pt-14 pr-0 sm:pr-14 pb-10 sm:pb-16">
                <ActionItems />

                <!-- tonal divider, no line -->
                <div class="my-10 h-[2px] rounded-[2px]" style="background: var(--surface-container-high);"></div>

                <Todos />
            </div>

            <!-- ── RIGHT COLUMN (cards) ── -->
            <div class="pt-10 sm:pt-14 pl-0 sm:pl-10 pb-10 sm:pb-16 flex flex-col gap-6" style="border-left: 1px solid rgba(69,71,76,0.10);">
                <Perfomance />
                <LessonProgress />
                <Attendance />
            </div>
        </div>

        <div class="max-w-[1200px] mx-auto px-5 sm:px-10">
            <Activity />
            <Suggestions />
        </div>

        <footer class="py-5 px-5 sm:px-10 max-w-[1200px] mx-auto flex justify-end" style="border-top: 1px solid rgba(69,71,76,0.10);">
            <span class="text-[12px] body-text" style="color: var(--text-muted);">Last updated {{ lastUpdated }}</span>
        </footer>
    </div>
</template>

<style>
    :root {
        /* Navy palette */
        --navy-950: #050d1a;
        --navy-900: #0a1628;
        --navy-800: #0f2040;
        --navy-600: #1a3560;

        /* Gold palette */
        --gold-500: #d4a853;
        --gold-400: #e0bc75;
        --gold-200: #f5e8c8;

        /* Electric */
        --electric-500: #3b82f6;
        --electric-400: #60a5fa;

        /* Surfaces (warm white) */
        --surface:                   #fbf9f6;
        --surface-container-low:     #f5f3f0;
        --surface-container:         #efecea;
        --surface-container-high:    #eae8e5;
        --surface-container-highest: #e4e2df;

        /* Text */
        --on-surface:         #1b1c1a;
        --on-surface-variant: #45474c;
        --text-muted:         #6b7280;

        /* Status */
        --alert:      #c2410c;
        --success:    #166534;
        --success-bg: #f0fdf4;
    }

    .dashboard-root {
        background: var(--surface);
        color: var(--on-surface);
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 16px;
        line-height: 1.6;
    }

    :focus-visible {
        outline: 2px solid var(--gold-500);
        outline-offset: 2px;
        border-radius: 4px;
    }

    /* ── TYPOGRAPHY HELPERS ── */
    .headline  { font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; }
    .body-text { font-family: 'Inter', sans-serif; }

    /* ── CARD ── */
    .card {
        background: #ffffff;
        border-radius: 1rem;
        box-shadow: 0 20px 40px rgba(10, 22, 40, 0.06);
    }

    /* ── AMBIENT SHADOW ── */
    .ambient-shadow {
        box-shadow: 0 20px 40px rgba(10, 22, 40, 0.06);
    }

    /* ── GHOST BORDER FALLBACK ── */
    .ghost-border { border: 1px solid rgba(69, 71, 76, 0.15); }

    /* ── GOLD BADGE ── */
    .gold-badge {
        background: linear-gradient(135deg, var(--gold-500), var(--gold-400));
        color: var(--navy-900);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
    }

    /* ── PRIMARY BUTTON ── */
    .btn-primary {
        background: var(--gold-500);
        color: var(--navy-900);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 600;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        transition: opacity 0.15s, transform 0.1s;
    }
    .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

    /* ── SECONDARY BUTTON ── */
    .btn-secondary {
        background: var(--navy-900);
        color: #ffffff;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 600;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        transition: opacity 0.15s;
    }
    .btn-secondary:hover { opacity: 0.85; }

    /* ── RESPONSIVE GRID ── */
    @media (max-width: 700px) {
        .two-col-grid { grid-template-columns: 1fr !important; }
    }
</style>
