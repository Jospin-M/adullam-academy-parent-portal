<script setup>
    import { reactive, ref, onMounted, computed } from 'vue';

    const data = reactive({
        insight: "Elijah has two things that need your attention this week.",
        actionItems: [
            {
                id: "1",
                userId: "abc",
                action: "Coding challenge pass rate has dropped to 47% — below the alert threshold. Review the Python Functions lesson with Elijah before his next assignment.",
                talkingPoints: [
                    { id: "tp-1-1", text: "Can you explain what a function actually does, in your own words?", actionId: 1 },
                    { id: "tp-1-2", text: "What is the difference between a parameter and an argument?", actionId: 1 },
                    { id: "tp-1-3", text: "What happens to the rest of the program while a function is running?", actionId: 1 }
                ],
            },
            {
                id: "2",
                userId: "abc",
                action: "Two to-dos are now overdue by more than three days. Completing them this week will prevent them from appearing on the term report.",
                talkingPoints: [
                    { id: "tp-2-1", text: "Which of the two tasks feels more manageable right now — can we start there?", actionId: 2 },
                    { id: "tp-2-2", text: "What got in the way of completing these this week — was anything confusing?", actionId: 2 },
                    { id: "tp-2-3", text: "If we set aside 20 minutes together right now, which one could we close out?", actionId: 2 }
                ]
            },
            {
                id: "3",
                userId: "abc",
                action: "Quiz average is at 78% — just below the 80% threshold. A short review of Week 12 concepts would bring this back on track before the next assessment.",
                talkingPoints: [
                    { id: "tp-3-1", text: "Which question from your last quiz felt the trickiest? Do you still remember why?", actionId: 3 },
                    { id: "tp-3-2", text: "When you get something wrong, do you go back and read the explanation?", actionId: 3 },
                    { id: "tp-3-3", text: "Is there a Week 12 concept you'd want to walk through together?", actionId: 3 }
                ]
            },
            {
                id: "4",
                userId: "abc",
                action: "Elijah has completed 18 of 24 lessons and is on pace to finish the term by Week 22 — two weeks ahead of schedule.",
                talkingPoints: [
                    { id: "tp-4-1", text: "What has been your favourite lesson in this course so far?", actionId: 4 },
                    { id: "tp-4-2", text: "Is the pace feeling comfortable, or does it ever feel rushed?", actionId: 4 },
                    { id: "tp-4-3", text: "What do you think the next big topic is going to be?", actionId: 4 }
                ]
            }
        ]
    });

    const state = reactive({
        openTP: data.actionItems.reduce((acc, action) => {
            acc[action.id] = false;
            return acc;
        }, {})
    });

    const tpResponses = reactive(
        data.actionItems.reduce((acc, _, itemIndex) => {
            data.actionItems[itemIndex].talkingPoints.forEach((tp) => {
                acc[tp.id] = null;
            });
            return acc;
        }, {})
    );

    const TP_CHIPS = [
        { label: "Got it", type: "got-it" },
        { label: "Still struggling", type: "struggling" }
    ];

    const listRef = ref(null)
    const scrollHeight = ref(null)

    const isEmpty = computed(() => data.actionItems.length === 0);

    onMounted(() => {
        if (!listRef.value || data.actionItems.length <= 3) return;

        const items = listRef.value.querySelectorAll('.action-item');

        let height = 0;
        
        for (let i = 0; i < 3 && i < items.length; i++) {
            height += items[i].getBoundingClientRect().height;
        }

        scrollHeight.value = height;
    })

    function toggleTP(id) {
        state.openTP[id] = !state.openTP[id];
    }

    function selectTPChip(tpID, type) {
        tpResponses[tpID] = type;
    }

    function saveTalkingPointResponses(actionItemId) {
        const action = data.actionItems.find(action => action.id === actionItemId);
        action.talkingPoints.forEach(tp => {
            console.log("sending request to save talking point", { id: tp.id, response: tpResponses[tp.id] })
        });
        data.actionItems = data.actionItems.filter(item => item.id !== actionItemId);
    }
</script>

<template>
    <p class="font-['Lora',Georgia,serif] text-[26px] font-normal leading-[1.35] text-[#1C1917] mb-10 max-w-[460px] max-[700px]:text-[22px]" id="status-text">
        {{ data.insight }}
    </p>

    <div class="text-[11px] font-medium tracking-[0.09em] uppercase text-[#78716C] mb-4" id="action-label">Action items</div>

    <!-- Empty state -->
    <div v-if="isEmpty" class="empty-state py-8 flex flex-col items-center text-center gap-3">
        <div class="empty-icon w-10 h-10 rounded-full flex items-center justify-center" style="background: rgba(45,106,79,0.09);">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3.5 9l3.5 3.5 7-7" stroke="#2D6A4F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <p class="font-['Lora',Georgia,serif] text-[17px] font-normal text-[#1C1917] leading-[1.35]">All clear this week</p>
        <p class="text-[13px] text-[#78716C] leading-[1.6] max-w-[300px]">
            There are no action items right now. Things like milestones, overdue tasks, and overall performance will surface here when they need your attention.
        </p>
    </div>

    <!-- List -->
    <div
        v-else
        class="action-list-scroll"
        :class="{ 'scrollable': data.actionItems.length > 3 }"
        :style="data.actionItems.length > 3 && scrollHeight ? { maxHeight: scrollHeight + 'px' } : {}"
    >
        <ul class="list-none" id="action-list" aria-label="Action items" ref="listRef">
            <template v-for="(item, itemIndex) in data.actionItems" :key="itemIndex">
                <li
                    class="action-item flex items-start gap-[14px] py-4 border-b border-[#A8A29E] last:border-b-0 last:pb-0 text-[15px] leading-[1.55] font-medium text-[#1C1917] transition-opacity duration-150"
                    :data-id="`a${itemIndex}`"
                >
                    <div class="flex-1 min-w-0">
                        <div class="flex flex-row justify-between">
                            <span class="block">{{ item.action }}</span>

                            <button
                                v-if="data.actionItems[itemIndex].talkingPoints.every(tp => tpResponses[tp.id] != null)"
                                class="h-3 mark-done-btn shrink-0 text-[11px] font-normal text-[#78716C] border-none bg-transparent cursor-pointer font-['DM_Sans',system-ui,sans-serif] py-[3px] px-0 whitespace-nowrap mt-[2px] hover:text-[#1C1917]"
                                :aria-label="`Mark action item ${itemIndex + 1} as done`"
                                @click="saveTalkingPointResponses(data.actionItems[itemIndex].id)"
                            >
                                Mark done
                            </button>
                        </div>

                        <button
                            class="tp-btn inline-flex items-center gap-[5px] text-[11px] font-normal font-['DM_Sans',system-ui,sans-serif] text-[#78716C] border-none border-b border-[#A8A29E] bg-transparent cursor-pointer p-0 mt-[9px] tracking-[0.02em] transition-[color,border-color] duration-150 leading-[1.6] hover:text-[#1C1917]"
                            :aria-expanded="state.openTP[itemIndex] ? 'true' : 'false'"
                            :aria-controls="`tp-a${itemIndex}`"
                            @click="toggleTP(item.id)"
                        >
                            <svg class="inline-block w-[13px] h-[13px] shrink-0 opacity-[0.55]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M2 4h12v7a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" stroke-width="1.3"></path>
                                <path d="M5 2v2M11 2v2M5 9h6M5 11h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"></path>
                            </svg>
                            Talking points
                        </button>

                        <template v-if="state.openTP[item.id]">
                            <div
                                class="tp-panel"
                                :id="`tp-a${itemIndex}`"
                                role="region"
                                :aria-label="`Talking points for action item ${itemIndex + 1}`"
                            >
                                <div class="bg-[rgba(28,25,23,0.03)] border-l-2 border-[#A8A29E] rounded-r-[4px] p-[10px_12px]">
                                    <div
                                        v-for="tp in item.talkingPoints"
                                        :key="tp.id"
                                        class="tp-question-row flex flex-col gap-[6px] mb-2 last:mb-0"
                                    >
                                        <span class="tp-question-text text-[12px] text-[#78716C] leading-[1.55] font-normal">{{ tp.text }}</span>

                                        <div class="flex flex-wrap gap-[5px] pl-[14px]">
                                            <button
                                                v-for="chip in TP_CHIPS"
                                                :key="chip.type"
                                                class="tp-chip text-[10px] font-normal font-['DM_Sans',system-ui,sans-serif] py-[3px] px-[9px] border border-[#A8A29E] rounded-[20px] cursor-pointer transition-[border-color,color,background] duration-[140ms] leading-[1.4] hover:border-[#78716C] hover:text-[#1C1917]"
                                                :class="{ 'selected': tpResponses[tp.id] === chip.type }"
                                                @click="selectTPChip(tp.id, chip.type)"
                                            >
                                                {{ chip.label }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<style scoped>
    .tp-chip.selected,
    .chip.selected {
        background-color: #1C1917;
        color: #F7F5F1;
        border-color: #1C1917;
    }

    .action-list-scroll {
        scrollbar-width: thin;
        scrollbar-color: #E7E5E0 transparent;
    }

    .action-list-scroll::-webkit-scrollbar {
        width: 4px;
    }

    .action-list-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .action-list-scroll::-webkit-scrollbar-thumb {
        background-color: #E7E5E0;
        border-radius: 999px;
    }

    .action-list-scroll::-webkit-scrollbar-thumb:hover {
        background-color: #A8A29E;
    }

    .action-list-scroll.scrollable {
        overflow-y: auto;
    }

    .empty-state {
        width: 100%;
    }
</style>