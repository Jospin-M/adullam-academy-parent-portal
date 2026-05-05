<script setup>
    import { reactive, ref, onMounted, computed } from 'vue';

    const TP_CHIPS = [
        { type: 'answered-well', label: 'Answered well' },
        { type: 'struggled',     label: 'Struggled' },
    ];

    const suggestions = reactive([
        {
            id: 's1',
            userId: "abc",
            title: 'Python Functions',
            description: 'Below 50% on his last two attempts. Worth revisiting before the work compounds.',
            concepts: ['Defining functions', 'Parameters & arguments', 'Return values'],
            talkingPoints: [
                { id: 's1-q1', text: 'Can you write a simple function right now that takes a name and prints a greeting?', suggestionId: 's1' },
                { id: 's1-q2', text: 'What is the difference between a parameter and an argument?', suggestionId: 's1' },
                { id: 's1-q3', text: 'What does the <code>return</code> keyword do — and what happens if you leave it out?', suggestionId: 's1' },
            ],
        },
        {
            id: 's2',
            userId: "abc",
            title: 'Loops & Iteration',
            description: 'Skipped two loop-based exercises last week without attempting them. A check-in would surface whether this is confidence or understanding.',
            concepts: ['for loops', 'while loops', 'Break & continue'],
            talkingPoints: [
                { id: 's2-q1', text: 'Can you walk me through what a <code>for</code> loop does, step by step?', suggestionId: 's2' },
                { id: 's2-q2', text: 'What is the difference between a <code>for</code> loop and a <code>while</code> loop — when would you use each?', suggestionId: 's2' },
                { id: 's2-q3', text: 'Can you write a loop right now that prints the numbers 1 to 10?', suggestionId: 's2' },
            ],
        },
        {
            id: 's3',
            userId: "abc",
            title: 'Lists & Indexing',
            description: 'Consistent indexing errors across his last assignment. A quick concept to reinforce before the data structures unit.',
            concepts: ['Zero-based indexing', 'Negative indices', 'Slicing'],
            talkingPoints: [
                { id: 's3-q1', text: 'If I have a list with five items, what index does the last item have — and why?', suggestionId: 's3' },
                { id: 's3-q2', text: 'What happens when you try to access an index that doesn\'t exist in a list?', suggestionId: 's3' },
                { id: 's3-q3', text: 'Can you show me how you\'d get the last three items from a list using slicing?', suggestionId: 's3' },
            ],
        },
        {
            id: 's4',
            userId: "abc",
            title: 'Conditionals & Boolean Logic',
            description: 'Mixing up <code>and</code> and <code>or</code> operators in compound conditions. A short conversation could prevent this becoming a habit.',
            concepts: ['if / elif / else', 'Boolean operators', 'Comparison operators'],
            talkingPoints: [
                { id: 's4-q1', text: 'Can you tell me what this condition evaluates to: <code>True and False or True</code>?', suggestionId: 's4' },
                { id: 's4-q2', text: 'When would you use <code>elif</code> instead of a second <code>if</code>?', suggestionId: 's4' },
                { id: 's4-q3', text: 'Can you write a condition that checks whether a number is between 10 and 20?', suggestionId: 's4' },
            ],
        },
    ]);

    const state = reactive({
        openTP: Object.fromEntries(suggestions.map(s => [s.id, false])),
    });

    const tpResponses = reactive(
        Object.fromEntries(suggestions.flatMap(s => s.talkingPoints.map(tp => [tp.id, null])))
    );

    const listRef = ref(null);
    const scrollHeight = ref(null);

    const isEmpty = computed(() => suggestions.length === 0);

    onMounted(() => {
        if (!listRef.value || suggestions.length <= 3) return;

        let height = 0;
        const items = listRef.value.querySelectorAll('.suggestion-item');

        for (let i = 0; i < 3 && i < items.length; i++) {
            height += items[i].getBoundingClientRect().height;
        }

        scrollHeight.value = height;
    });

    function allAnswered(suggestion) {
        return suggestion.talkingPoints.every(tp => tpResponses[tp.id] !== null);
    }

    function selectTPChip(tpId, chipType) {
        tpResponses[tpId] = tpResponses[tpId] === chipType ? null : chipType;
    }

    function saveSuggestionResponses(suggestionId) {
        const suggestion = suggestions.find(s => s.id === suggestionId);
        suggestion.talkingPoints.forEach(tp => {
            console.log('saving talking point response', { id: tp.id, response: tpResponses[tp.id] });
        });

        const index = suggestions.findIndex(s => s.id === suggestionId);
        suggestions.splice(index, 1);
    }
</script>

<template>
    <div class="pt-4 pb-16">
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
