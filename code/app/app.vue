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

    const children = [
        {
            id: "xyz",
            name: "Elijah Johnson",
            insight: "Elijah is making steady progress this term, with a few areas that could use your attention this week.",
            actionItems: [
                {
                    id: "1",
                    userId: "abc",
                    action: "Set aside 15–20 minutes this week to review the Python Functions lesson with Elijah and ensure he understands the key concepts before his next assignment."
                },
                {
                    id: "2",
                    userId: "abc",
                    action: "Work with Elijah to complete the two overdue tasks within the next 2–3 days to prevent them from impacting his term report."
                },
                {
                    id: "3",
                    userId: "abc",
                    action: "Schedule a short review session with Elijah to go over Week 12 concepts before his next quiz to help bring his average above 80%."
                },
                {
                    id: "4",
                    userId: "abc",
                    action: "Acknowledge Elijah’s strong progress and encourage him to maintain his current pace to stay ahead of schedule."
                }
            ], 
            activity: {
                "2026-05-01": { quizzes: 2, lessons: 3, challenges: 1 },
                "2026-05-02": { quizzes: 4, lessons: 5, challenges: 2 },
                "2026-05-03": { quizzes: 1, lessons: 2, challenges: 0 },
                "2026-05-04": { quizzes: 5, lessons: 6, challenges: 3 },
                "2026-05-05": { quizzes: 3, lessons: 4, challenges: 2 },
                "2026-05-06": { quizzes: 0, lessons: 1, challenges: 0 },
                "2026-05-07": { quizzes: 2, lessons: 3, challenges: 1 },
                "2026-05-08": { quizzes: 4, lessons: 7, challenges: 3 },
                "2026-05-09": { quizzes: 3, lessons: 5, challenges: 2 },
                "2026-05-10": { quizzes: 1, lessons: 2, challenges: 1 },
                "2026-05-11": { quizzes: 2, lessons: 4, challenges: 2 },
                "2026-05-12": { quizzes: 6, lessons: 8, challenges: 4 },
                "2026-05-13": { quizzes: 2, lessons: 3, challenges: 1 },
                "2026-05-14": { quizzes: 4, lessons: 6, challenges: 2 },
                "2026-05-15": { quizzes: 1, lessons: 2, challenges: 0 },
                "2026-05-16": { quizzes: 3, lessons: 5, challenges: 2 },
                "2026-05-17": { quizzes: 2, lessons: 3, challenges: 1 },
                "2026-05-18": { quizzes: 5, lessons: 7, challenges: 3 },
                "2026-05-19": { quizzes: 3, lessons: 4, challenges: 2 },
                "2026-05-20": { quizzes: 1, lessons: 2, challenges: 1 },
                "2026-05-21": { quizzes: 4, lessons: 5, challenges: 2 },
                "2026-05-22": { quizzes: 2, lessons: 3, challenges: 1 },
                "2026-05-23": { quizzes: 3, lessons: 5, challenges: 2 },
                "2026-05-24": { quizzes: 6, lessons: 8, challenges: 4 },
                "2026-05-25": { quizzes: 2, lessons: 4, challenges: 2 },
                "2026-05-26": { quizzes: 1, lessons: 3, challenges: 1 },
                "2026-05-27": { quizzes: 4, lessons: 5, challenges: 2 },
                "2026-05-28": { quizzes: 2, lessons: 3, challenges: 1 },
                "2026-05-29": { quizzes: 5, lessons: 6, challenges: 3 },
                "2026-05-30": { quizzes: 3, lessons: 4, challenges: 2 },
            },
            attendance: {
                label: 'Term 2 · 2025',
                weeks: [
                    {
                        startDate: '29 Sep',
                        days: ['present', null, 'present', 'present', 'present', 'present', 'absent'],
                    },
                    {
                        startDate: '6 Oct',
                        days: ['absent', null, null, 'present', 'present', 'present', 'present'],
                    },
                    {
                        startDate: '13 Oct',
                        days: ['present', null, 'present', 'present', null, 'present', 'present'],
                    },
                    {
                        startDate: '20 Oct',
                        days: ['present', null, null, null, null, null, null],
                    },
                ],
            },
            scores: { passRate: 62, average: 83, insight: "Declining over the past 4 weeks" },
            suggestions: [
                {
                    id: 's1',
                    studentId: "abc",
                    title: 'Python Functions',
                    description: 'Below 50% on his last two attempts. Worth revisiting before the work compounds.',
                    concepts: ['Defining functions', 'Parameters & arguments', 'Return values'],
                    talkingPoints: [
                        { id: 's1-q1', text: 'Can you write a simple function right now that takes a name and prints a greeting?', suggestionId: 's1' },
                        { id: 's1-q2', text: 'What is the difference between a parameter and an argument?', suggestionId: 's1' },
                        { id: 's1-q3', text: 'What does the <code>return</code> keyword do — and what happens if you leave it out?', suggestionId: 's1' },
                    ],
                    done: false
                },
                {
                    id: 's2',
                    studentId: "abc",
                    title: 'Loops & Iteration',
                    description: 'Skipped two loop-based exercises last week without attempting them. A check-in would surface whether this is confidence or understanding.',
                    concepts: ['for loops', 'while loops', 'Break & continue'],
                    talkingPoints: [
                        { id: 's2-q1', text: 'Can you walk me through what a <code>for</code> loop does, step by step?', suggestionId: 's2' },
                        { id: 's2-q2', text: 'What is the difference between a <code>for</code> loop and a <code>while</code> loop — when would you use each?', suggestionId: 's2' },
                        { id: 's2-q3', text: 'Can you write a loop right now that prints the numbers 1 to 10?', suggestionId: 's2' },
                    ],
                    done: false
                },
                {
                    id: 's3',
                    studentId: "abc",
                    title: 'Lists & Indexing',
                    description: 'Consistent indexing errors across his last assignment. A quick concept to reinforce before the data structures unit.',
                    concepts: ['Zero-based indexing', 'Negative indices', 'Slicing'],
                    talkingPoints: [
                        { id: 's3-q1', text: 'If I have a list with five items, what index does the last item have — and why?', suggestionId: 's3' },
                        { id: 's3-q2', text: 'What happens when you try to access an index that doesn\'t exist in a list?', suggestionId: 's3' },
                        { id: 's3-q3', text: 'Can you show me how you\'d get the last three items from a list using slicing?', suggestionId: 's3' },
                    ],
                    done: false
                },
                {
                    id: 's4',
                    studentId: "abc",
                    title: 'Conditionals & Boolean Logic',
                    description: 'Mixing up <code>and</code> and <code>or</code> operators in compound conditions. A short conversation could prevent this becoming a habit.',
                    concepts: ['if / elif / else', 'Boolean operators', 'Comparison operators'],
                    talkingPoints: [
                    { id: 's4-q1', text: 'Can you tell me what this condition evaluates to: <code>True and False or True</code>?', suggestionId: 's4' },
                    { id: 's4-q2', text: 'When would you use <code>elif</code> instead of a second <code>if</code>?', suggestionId: 's4' },
                    { id: 's4-q3', text: 'Can you write a condition that checks whether a number is between 10 and 20?', suggestionId: 's4' },
                    ],
                    done: false
                },
            ],
            lessonProgress: [
                { label: 'Week 1', lessons: 3 },
                { label: 'Week 2', lessons: 3 },
                { label: 'Week 3', lessons: 3 },
                { label: 'Week 4', lessons: 3 },
                { label: 'Week 5', lessons: 1 },
            ],
            todos: [ 
                { id: "t1",  complete: true, task: "Watch Python Functions lesson video" },
                { id: "t2",  complete: false, task: "Complete Week 13 quiz" },
                { id: "t3",  complete: false, task: "Review loops exercise feedback" },
                { id: "t4",  complete: true, task: "Watch Week 14 introduction video" },
                { id: "t5",  complete: false, task: "Install VS Code & Python" },
                { id: "t6",  complete: true, task: "Complete the Python Functions coding challenge" },
                { id: "t7",  complete: false, task: "Read Week 14 lesson notes" },
                { id: "t8",  complete: false, task: "Submit Week 12 reflection" },
                { id: "t9",  complete: true, task: "Practice writing functions with return values" },
                { id: "t10", complete: false, task: "Message tutor with any questions before next session" },
            ]
        }
    ];

    const { setStudents, selectStudent } = useStudents();
    setStudents(children);
    selectStudent("0");

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
