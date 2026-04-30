<script setup>
    import { reactive } from 'vue';

    const data = reactive({
        insight: "Elijah has two things that need your attention this week.",
        actionItems: [
            {
                id: "1",
                action: "Coding challenge pass rate has dropped to 47% — below the alert threshold. Review the Python Functions lesson with Elijah before his next assignment.",
                talkingPoints: [
                    { id: "tp-1-1", text: "Can you explain what a function actually does, in your own words?", actionId: 1 },
                    { id: "tp-1-2", text: "What is the difference between a parameter and an argument?", actionId: 1 },
                    { id: "tp-1-3", text: "What happens to the rest of the program while a function is running?", actionId: 1 }
                ]
            },
            {
                id: "2",
                action: "Two to-dos are now overdue by more than three days. Completing them this week will prevent them from appearing on the term report.",
                talkingPoints: [
                    { id: "tp-2-1", text: "Which of the two tasks feels more manageable right now — can we start there?", actionId: 2 },
                    { id: "tp-2-2", text: "What got in the way of completing these this week — was anything confusing?", actionId: 2 },
                    { id: "tp-2-3", text: "If we set aside 20 minutes together right now, which one could we close out?", actionId: 2 }
                ]
            },
            {
                id: "3",
                action: "Quiz average is at 78% — just below the 80% threshold. A short review of Week 12 concepts would bring this back on track before the next assessment.",
                talkingPoints: [
                    { id: "tp-3-1", text: "Which question from your last quiz felt the trickiest? Do you still remember why?", actionId: 3 },
                    { id: "tp-3-2", text: "When you get something wrong, do you go back and read the explanation?", actionId: 3 },
                    { id: "tp-3-3", text: "Is there a Week 12 concept you'd want to walk through together?", actionId: 3 }
                ]
            },
            {
                id: "4",
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

    /**
     * Toggles the visibility of talking points for an action item
     * @param {string} id - The id of the action item that is being toggled
     */
    function toggleTP(id) {
        state.openTP[id] = !state.openTP[id];
    }

    /**
     * Records the user's response to a talking point question
     * @param {string} tpID - The unique identifier of the talking point (e.g., "tp-1-1")
     * @param {string} type - The response type: "got-it", "struggling", or "skipped"
     */
    function selectTPChip(tpID, type) {
        tpResponses[tpID] = type;
    }

    /**
     * Sends all talking point responses for an action item to the server
     * @param {number} actionItemId - The ID of the action item whose responses should be saved
     */
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

    <ul class="list-none" id="action-list" aria-label="Action items">
        <template v-for="(item, itemIndex) in data.actionItems" :key="itemIndex">
            <li
                class="action-item flex items-start gap-[14px] py-4 border-t border-[#E7E5E0] first:border-t-0 first:pt-0 text-[15px] leading-[1.55] font-medium text-[#1C1917] transition-opacity duration-150"
                :data-id="`a${itemIndex}`">
                <div class="flex-1 min-w-0">
                    <span class="block">{{ item.action }}</span>

                    <button
                        class="tp-btn inline-flex items-center gap-[5px] text-[11px] font-normal font-['DM_Sans',system-ui,sans-serif] text-[#78716C] border-none border-b border-[#E7E5E0] bg-transparent cursor-pointer p-0 mt-[9px] tracking-[0.02em] transition-[color,border-color] duration-150 leading-[1.6] hover:text-[#1C1917]"
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
                            :class="{ open: state.openTP[itemIndex] }"
                            :id="`tp-a${itemIndex}`"
                            role="region"
                            :aria-label="`Talking points for action item ${itemIndex + 1}`"
                        >
                            <div class="bg-[rgba(28,25,23,0.03)] border-l-2 border-[#E7E5E0] rounded-r-[4px] p-[10px_12px]">
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
                                            class="tp-chip text-[10px] font-normal font-['DM_Sans',system-ui,sans-serif] py-[3px] px-[9px] border border-[#E7E5E0] rounded-[20px] cursor-pointer transition-[border-color,color,background] duration-[140ms] leading-[1.4] hover:border-[#78716C] hover:text-[#1C1917]"
                                            :class="{
                                                'selected': tpResponses[tp.id] === chip.type
                                            }"
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

                <!-- verify that all the talking points have been addressed before showing the 'Mark done' option -->
                <button 
                    v-if="data.actionItems[itemIndex].talkingPoints.every(tp => tpResponses[tp.id] != null)" 
                    class="mark-done-btn shrink-0 text-[11px] font-normal text-[#78716C] border-none bg-transparent cursor-pointer font-['DM_Sans',system-ui,sans-serif] py-[3px] px-0 whitespace-nowrap mt-[2px] hover:text-[#1C1917]"
                    :aria-label="`Mark action item ${itemIndex + 1} as done`"
                    @click="saveTalkingPointResponses(data.actionItems[itemIndex].id)"
                >
                    Mark done
                </button>
            </li>
        </template>
    </ul>
</template>

<style scoped>
    .tp-chip.selected,
    .chip.selected {
        background-color: #1C1917;
        color: #F7F5F1;
        border-color: #1C1917;
    }
</style>