<script setup>
    import { reactive, ref, onMounted, computed } from 'vue';

    const TP_CHIPS = [
        { type: 'answered-well', label: 'Answered well' },
        { type: 'struggled',     label: 'Struggled' },
    ];

    const { students } = useStudents();
    const student = computed(() => students.value.selectedStudent);
    const suggestions = computed(() => student.value.suggestions);

    const state = reactive({ // set of boolean flags that determine whether a talking point 'window' for a suggestion should be opened
        openTP: Object.fromEntries(suggestions.value.map(s => [s.id, false])),
    });

    const tpResponses = reactive(
        Object.fromEntries(suggestions.value.flatMap(s => s.talkingPoints.map(tp => [tp.id, null])))
    );

    const listRef = ref(null);
    const scrollHeight = ref(null);

    const isEmpty = computed(() => suggestions.value.length === 0);

    onMounted(() => {
        if (!listRef.value || suggestions.value.length <= 3) return;

        let height = 0;
        const items = listRef.value.querySelectorAll('.suggestion-item');

        for (let i = 0; i < 3 && i < items.length; i++) {
            height += items[i].getBoundingClientRect().height;
        }

        scrollHeight.value = height;
    });

    /**
     * Checks if all talking points within a suggestion have been answered
     * @param {Object} suggestion - The suggestion object containing talking points
     * @param {Array} suggestion.talkingPoints - Array of talking point objects with id properties
     * @returns {boolean} True if all talking points have a response, false otherwise
     */
    function allAnswered(suggestion) {
        return suggestion.talkingPoints.every(tp => tpResponses[tp.id] !== null);
    }

    /**
     * Toggles the selection state of a talking point chip
     * @param {string|number} tpId - The unique identifier of the talking point
     * @param {string} chipType - The type of chip being selected ('answered-well' or 'struggled')
     */
    function selectTPChip(tpId, chipType) {
        tpResponses[tpId] = tpResponses[tpId] === chipType ? null : chipType;
    }

    /**
     * Saves the responses for all talking points in a suggestion and removes it from the list
     * @param {string|number} suggestionId - The unique identifier of the suggestion
     * @returns {Promise<void>} Completes when the API request is finished
     */
    async function saveSuggestionResponses(suggestionId) {
        const responses = [];
        const suggestion = suggestions.value.find(s => s.id === suggestionId);
        
        suggestion.talkingPoints.forEach(tp => {
            responses.push({ talkingPointId: tp.id, response: tpResponses[tp.id] })
        });

        await $fetch(`/api/suggestions/${ suggestionId }/responses`, {
            method: 'PATCH',
            body: responses
        });

        // remove the suggestion from the list
        const index = suggestions.value.findIndex(s => s.id === suggestionId);
        suggestions.value.splice(index, 1);
    }
</script>

<template>
    <div class="pt-4 pb-5">
        <div class="headline text-[18px] font-bold tracking-[-0.01em] mb-6" style="color: var(--navy-900);">Practice suggestions</div>

        <!-- Empty state -->
        <div v-if="isEmpty" class="py-8 flex flex-col items-center text-center gap-3 w-full">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style="background: var(--surface-container-low);">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="6" stroke="var(--text-muted)" stroke-width="1.4"/>
                    <circle cx="9" cy="9" r="1.5" fill="var(--text-muted)"/>
                    <path d="M9 2v2M9 14v2M2 9h2M14 9h2" stroke="var(--text-muted)" stroke-width="1.3" stroke-linecap="round"/>
                </svg>
            </div>
            <p class="headline text-[17px] font-semibold leading-[1.35]" style="color: var(--navy-900);">No suggestions yet</p>
            <p class="body-text text-[13px] leading-[1.6] max-w-[300px]" style="color: var(--text-muted);">
                Practice suggestions appear once a few lessons or quizzes have been completed. They're personalised to areas where a bit of extra review would help most.
            </p>
        </div>

        <!-- List -->
        <div
            v-else
            class="suggestions-scroll"
            :class="{ 'scrollable': suggestions.length > 3 }"
            :style="suggestions.length > 3 && scrollHeight ? { maxHeight: scrollHeight + 'px' } : {}"
            ref="listRef"
        >
            <div
                v-for="suggestion in suggestions"
                :key="suggestion.id"
                class="suggestion-item py-6 max-[700px]:flex-col max-[700px]:gap-[10px]"
                style="border-top: 1px solid rgba(69,71,76,0.10);"
            >
                <div class="flex-1 min-w-0">
                    <p class="text-[14px] body-text leading-[1.55]" style="color: var(--on-surface);">
                        <strong class="headline font-semibold" style="color: var(--navy-900);">{{ suggestion.title }}.</strong>
                        <span v-html="' ' + suggestion.description"></span>
                    </p>

                    <!-- Concept tags -->
                    <div class="flex flex-wrap gap-[6px] mt-[10px]">
                        <span
                            v-for="concept in suggestion.concepts"
                            :key="concept"
                            class="text-[10px] font-medium body-text py-[3px] px-[8px] rounded-[20px] ghost-border"
                            style="color: var(--text-muted); background: var(--surface-container-low);"
                            v-html="concept"
                        ></span>
                    </div>

                    <!-- Talking points toggle -->
                    <button
                        class="tp-btn inline-flex items-center gap-[5px] text-[11px] font-normal body-text border-none bg-transparent cursor-pointer p-0 mt-[10px] tracking-[0.02em] transition-[color] duration-150 leading-[1.6]"
                        style="color: var(--text-muted);"
                        :aria-expanded="state.openTP[suggestion.id]"
                        :aria-controls="`tp-${suggestion.id}`"
                        @click="state.openTP[suggestion.id] = !state.openTP[suggestion.id]"
                    >
                        <svg class="inline-block w-[13px] h-[13px] shrink-0 opacity-[0.55]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M2 4h12v7a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" stroke-width="1.3"></path>
                            <path d="M5 2v2M11 2v2M5 9h6M5 11h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"></path>
                        </svg>
                        Talking points
                    </button>

                    <!-- TP panel -->
                    <div
                        v-show="state.openTP[suggestion.id]"
                        class="tp-panel open w-full"
                        :id="`tp-${suggestion.id}`"
                        role="region"
                        :aria-label="`Talking points for ${suggestion.title}`"
                    >
                        <div class="rounded-[10px] p-[12px_14px]" style="background: var(--surface-container-low);">
                            <div
                                v-for="tp in suggestion.talkingPoints"
                                :key="tp.id"
                                class="tp-question-row flex flex-col gap-[6px] mb-3 last:mb-0"
                            >
                                <span class="tp-question-text text-[12px] leading-[1.55] font-normal body-text" style="color: var(--text-muted);" v-html="tp.text"></span>

                                <div class="flex flex-wrap gap-[5px] pl-[14px]">
                                    <button
                                        v-for="chip in TP_CHIPS"
                                        :key="chip.type"
                                        class="tp-chip text-[10px] font-normal body-text py-[4px] px-[10px] rounded-[20px] bg-transparent cursor-pointer transition-all duration-[140ms] leading-[1.4] ghost-border"
                                        style="color: var(--text-muted);"
                                        :class="`tp-chip-${chip.type}`"
                                        :data-selected="tpResponses[tp.id] === chip.type"
                                        @click="selectTPChip(tp.id, chip.type)"
                                    >
                                        {{ chip.label }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            v-if="allAnswered(suggestion)"
                            class="btn-secondary mt-3 text-[12px] py-[6px] px-[16px]"
                            :aria-label="`Mark ${suggestion.title} as done`"
                            @click="saveSuggestionResponses(suggestion.id)"
                        >
                            Mark as done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tp-panel {
        margin-top: 0;
        transition: margin 0.3s ease;
    }
    .tp-panel.open {
        margin-top: 12px;
    }

    /* Selected chip states */
    .tp-chip[data-selected="true"].tp-chip-answered-well {
        border-color: #16a34a;
        color: #16a34a;
        background: rgba(22, 163, 74, 0.08);
    }
    .tp-chip[data-selected="true"].tp-chip-struggled {
        border-color: var(--alert);
        color: var(--alert);
        background: rgba(194, 65, 12, 0.08);
    }

    .tp-chip:hover {
        border-color: var(--text-muted);
        color: var(--on-surface);
    }

    .suggestions-scroll {
        scrollbar-width: thin;
        scrollbar-color: var(--surface-container-high) transparent;
    }
    .suggestions-scroll::-webkit-scrollbar {
        width: 4px;
    }
    .suggestions-scroll::-webkit-scrollbar-track {
        background: transparent;
    }
    .suggestions-scroll::-webkit-scrollbar-thumb {
        background-color: var(--surface-container-high);
        border-radius: 999px;
    }
    .suggestions-scroll::-webkit-scrollbar-thumb:hover {
        background-color: rgba(69, 71, 76, 0.25);
    }
    .suggestions-scroll.scrollable {
        overflow-y: auto;
    }
</style>
