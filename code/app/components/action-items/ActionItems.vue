<script setup>
    import { reactive, ref, onMounted, computed } from 'vue';

    const data = reactive({
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
        ]
    });

    const listRef = ref(null);
    const scrollHeight = ref(null);

    const isEmpty = computed(() => data.actionItems.length === 0);

    onMounted(() => {
        if (!listRef.value || data.actionItems.length <= 3) return;

        const items = listRef.value.querySelectorAll('.action-item');

        let height = 0;

        for (let i = 0; i < 3 && i < items.length; i++) {
            height += items[i].getBoundingClientRect().height;
        }

        scrollHeight.value = height;
    });
</script>

<template>
    <!-- Hero statement -->
    <div class="mb-10">
        <p
            class="headline text-[28px] sm:text-[36px] font-bold leading-[1.2] tracking-[-0.02em] mb-2 max-[700px]:text-[22px]"
            style="color: var(--navy-900);"
            id="status-text"
        >
            {{ data.insight }}
        </p>
    </div>

    <div
        class="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 body-text"
        style="color: var(--text-muted);"
        id="action-label"
    >
        Action items
    </div>

    <!-- Empty state -->
    <div
        v-if="isEmpty"
        class="empty-state py-8 flex flex-col items-center text-center gap-3"
    >
        <div
            class="empty-icon w-10 h-10 rounded-full flex items-center justify-center"
            style="background: var(--success-bg);"
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                    d="M3.5 9l3.5 3.5 7-7"
                    stroke="var(--success)"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>

        <p
            class="headline text-[17px] font-semibold leading-[1.35]"
            style="color: var(--navy-900);"
        >
            All clear this week
        </p>

        <p
            class="body-text text-[13px] leading-[1.6] max-w-[300px]"
            style="color: var(--text-muted);"
        >
            There are no action items right now. Things like milestones, overdue
            tasks, and overall performance will surface here when they need your
            attention.
        </p>
    </div>

    <!-- Action list -->
    <div
        v-else
        class="action-list-scroll"
        :class="{ scrollable: data.actionItems.length > 3 }"
        :style="
            data.actionItems.length > 3 && scrollHeight
                ? { maxHeight: scrollHeight + 'px' }
                : {}
        "
    >
        <ul
            class="list-none"
            id="action-list"
            aria-label="Action items"
            ref="listRef"
        >
            <li
                v-for="(item, itemIndex) in data.actionItems"
                :key="item.id"
                class="action-item flex items-start gap-[14px] py-5 text-[15px] leading-[1.55] font-medium"
                :data-id="`a${itemIndex}`"
                style="border-top: 1px solid rgba(69,71,76,0.12);"
            >
                <div
                    class="w-[8px] h-[8px] rounded-full shrink-0 mt-[7px]"
                    style="background: var(--alert);"
                    aria-hidden="true"
                ></div>

                <span
                    class="block body-text"
                    style="color: var(--on-surface);"
                >
                    {{ item.action }}
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .action-list-scroll {
        scrollbar-width: thin;
        scrollbar-color: var(--surface-container-high) transparent;
    }

    .action-list-scroll::-webkit-scrollbar {
        width: 4px;
    }

    .action-list-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .action-list-scroll::-webkit-scrollbar-thumb {
        background-color: var(--surface-container-high);
        border-radius: 999px;
    }

    .action-list-scroll::-webkit-scrollbar-thumb:hover {
        background-color: rgba(69, 71, 76, 0.25);
    }

    .action-list-scroll.scrollable {
        overflow-y: auto;
    }

    .empty-state {
        width: 100%;
    }
</style>