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
            description: 'Elijah scored below 50% on his last two attempts here. This concept underpins most of the coming weeks — worth revisiting now before the work compounds.',
            lessonUrl: '#',
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
            description: 'Elijah skipped two loop-based exercises last week without attempting them. A quick check-in here would help surface whether this is a confidence issue or a gap in understanding.',
            lessonUrl: '#',
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
            description: 'Elijah made consistent indexing errors across his last assignment. This is a quick concept to reinforce and will come up heavily in the data structures unit ahead.',
            lessonUrl: '#',
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
            description: 'Quiz results show Elijah is mixing up <code>and</code> and <code>or</code> operators in compound conditions. A short conversation here could prevent this from becoming a persistent habit.',
            lessonUrl: '#',
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
    <div class="pt-9 pb-12">
        <div class="text-[11px] font-medium tracking-[0.09em] uppercase text-[#78716C] mb-4">Practice suggestions</div>

        <!-- Empty state -->
        <div v-if="isEmpty" class="py-8 flex flex-col items-center text-center gap-3 w-full">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style="background: rgba(28,25,23,0.05);">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="6" stroke="#78716C" stroke-width="1.4"/>
                    <circle cx="9" cy="9" r="1.5" fill="#78716C"/>
                    <path d="M9 2v2M9 14v2M2 9h2M14 9h2" stroke="#78716C" stroke-width="1.3" stroke-linecap="round"/>
                </svg>
            </div>
            <p class="font-['Lora',Georgia,serif] text-[17px] font-normal text-[#1C1917] leading-[1.35]">No suggestions yet</p>
            <p class="text-[13px] text-[#78716C] leading-[1.6] max-w-[300px]">
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
                class="suggestion-item flex flex-col gap-[10px] py-4 border-t border-[#E7E5E0] first-of-type:border-t-0 first-of-type:pt-0"
            >
                <!-- Top row: text + go to lesson -->
                <div class="flex items-start justify-between gap-5 max-[700px]:flex-col max-[700px]:gap-[6px]">
                    <p class="text-[13px] text-[#1C1917] leading-[1.55] flex-1 min-w-0">
                        <strong>{{ suggestion.title }}.</strong> {{ suggestion.description }}
                    </p>

                    <a
                        class="text-[12px] text-[#78716C] no-underline border-b border-[#E7E5E0] whitespace-nowrap cursor-pointer shrink-0 transition-[color,border-color] duration-150 hover:text-[#B45309] hover:border-b-[#B45309]"
                        :href="suggestion.lessonUrl"
                        tabindex="0"
                    >Go to lesson →</a>
                </div>

                <!-- Talking points toggle -->
                <button
                    class="tp-btn self-start inline-flex items-center gap-[5px] text-[11px] font-normal font-['DM_Sans',system-ui,sans-serif] text-[#78716C] border-none border-b border-[#E7E5E0] bg-transparent cursor-pointer p-0 tracking-[0.02em] transition-[color,border-color] duration-150 leading-[1.6] hover:text-[#1C1917]"
                    :aria-expanded="state.openTP[suggestion.id]"
                    :aria-controls="`tp-${suggestion.id}`"
                    @click="state.openTP[suggestion.id] = !state.openTP[suggestion.id]"
                >
                    <svg class="inline-block w-[13px] h-[13px] shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="opacity: 0.55;">
                        <path d="M2 4h12v7a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" stroke-width="1.3"></path>
                        <path d="M5 2v2M11 2v2M5 9h6M5 11h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"></path>
                    </svg>
                    Talking points
                </button>

                <!-- TP panel + mark done — full width -->
                <template v-if="state.openTP[suggestion.id]">
                    <div
                        class="tp-panel open w-full"
                        :id="`tp-${suggestion.id}`"
                        role="region"
                        :aria-label="`Talking points for ${suggestion.title}`"
                    >
                        <div class="bg-[rgba(28,25,23,0.03)] border-l-2 border-[#E7E5E0] rounded-r-[4px] p-[10px_12px]">
                            <div
                                v-for="tp in suggestion.talkingPoints"
                                :key="tp.id"
                                class="tp-question-row flex flex-col gap-[6px] mb-2 last:mb-0"
                            >
                                <span class="tp-question-text text-[12px] text-[#78716C] leading-[1.55] font-normal" v-html="tp.text"></span>

                                <div class="flex flex-wrap gap-[5px] pl-[14px]">
                                    <button
                                        v-for="chip in TP_CHIPS"
                                        :key="chip.type"
                                        class="tp-chip text-[10px] font-normal font-['DM_Sans',system-ui,sans-serif] py-[3px] px-[9px] border border-[#E7E5E0] rounded-[20px] cursor-pointer transition-[border-color,color,background] duration-[140ms] leading-[1.4] hover:border-[#78716C] hover:text-[#1C1917]"
                                        :class="{ 'selected': tpResponses[tp.id] === chip.type }"
                                        @click="selectTPChip(tp.id, chip.type)"
                                    >
                                        {{ chip.label }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        v-if="allAnswered(suggestion)"
                        class="mark-done-btn w-full text-[11px] font-normal text-[#78716C] border border-[#E7E5E0] rounded-[4px] bg-transparent cursor-pointer font-['DM_Sans',system-ui,sans-serif] py-[6px] px-0 whitespace-nowrap transition-[color,border-color] duration-150 hover:text-[#1C1917] hover:border-[#78716C]"
                        :aria-label="`Mark ${suggestion.title} as done`"
                        @click="saveSuggestionResponses(suggestion.id)"
                    >
                        Mark done
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tp-chip.selected {
        background-color: #1C1917;
        color: #F7F5F1;
        border-color: #1C1917;
    }

    .suggestions-scroll {
        scrollbar-width: thin;
        scrollbar-color: #E7E5E0 transparent;
    }

    .suggestions-scroll::-webkit-scrollbar {
        width: 4px;
    }

    .suggestions-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .suggestions-scroll::-webkit-scrollbar-thumb {
        background-color: #E7E5E0;
        border-radius: 999px;
    }

    .suggestions-scroll::-webkit-scrollbar-thumb:hover {
        background-color: #A8A29E;
    }

    .suggestions-scroll.scrollable {
        overflow-y: auto;
    }
</style>