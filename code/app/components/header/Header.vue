<script setup>
    import { ref } from 'vue';

    const parent = {
        name: "Sarah Johnson",
        email: "sarah.johnson@adullam.edu"
    };

    const parentInitials = parent.name.split(" ").map(n => n[0]).join("");

    const children = [
        { name: "Elijah Johnson", grade: "Year 9" },
        { name: "Amara Mitchell", grade: "Year 7" },
    ];

    const childrenInitials = children.map(child =>
        child.name.split(" ").map(n => n[0]).join("")
    );

    const showDropDown = ref(false);
    const selectedChild = ref(0);
</script>

<template>
    <header class="dashboard-header flex items-center justify-between px-5 sm:px-10 py-[14px] sm:py-[18px]">
        <div class="headline font-bold text-[15px] sm:text-[17px] tracking-tight shrink-0 mr-3" style="color: var(--navy-900);">
            Adullam Academy
        </div>

        <div class="relative" id="switcher-wrap">
            <button
                class="switcher-trigger flex items-center gap-[8px] sm:gap-[10px] py-[6px] pr-[10px] sm:pr-[14px] pl-[8px] rounded-[40px] cursor-pointer transition-all duration-[180ms] ghost-border"
                :class="{ 'open': showDropDown }"
                style="background: rgba(255,255,255,0.7);"
                @click="showDropDown = !showDropDown"
                id="switcher-trigger"
                aria-haspopup="listbox"
                :aria-expanded="showDropDown"
                aria-controls="switcher-dropdown"
                :aria-label="`Account menu for ${parent.name}`"
            >
                <div class="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 gold-badge" aria-hidden="true">{{ parentInitials }}</div>
                <span class="body-text text-[14px] font-medium max-[480px]:hidden" style="color: var(--navy-900);">{{ parent.name }}</span>
                <span class="switcher-caret text-[10px] ml-[2px] transition-transform duration-200 inline-block" style="color: var(--text-muted);" aria-hidden="true">▾</span>
            </button>

            <div
                v-show="showDropDown"
                class="switcher-dropdown absolute top-[calc(100%+8px)] right-0 w-[calc(100vw-40px)] max-w-[280px] min-w-[228px] rounded-[12px] overflow-hidden z-[200] ambient-shadow"
                style="background: rgba(251,249,246,0.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);"
                id="switcher-dropdown"
                role="dialog"
                aria-label="Account and child switcher"
            >
                <div class="flex items-center gap-[11px] px-4 pt-[14px] pb-[13px]" style="border-bottom: 1px solid rgba(69,71,76,0.1);">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 gold-badge" aria-hidden="true">{{ parentInitials }}</div>
                    <div class="flex flex-col gap-[2px] leading-none">
                        <span class="text-[13px] font-semibold headline" style="color: var(--navy-900);">{{ parent.name }}</span>
                        <span class="text-[11px] body-text" style="color: var(--text-muted);">{{ parent.email }}</span>
                    </div>
                </div>

                <div class="text-[10px] font-semibold tracking-[0.1em] uppercase px-4 pt-[10px] pb-[5px] body-text" style="color: var(--text-muted);">Viewing dashboard for</div>

                <ul class="list-none">
                    <li v-for="(child, index) in children" :key="index">
                        <button
                            class="dd-child-btn flex items-center gap-[10px] w-full px-4 py-2 bg-transparent border-none cursor-pointer text-left transition-[background] duration-[120ms] hover:bg-[rgba(10,22,40,0.04)]"
                            :class="{ 'active': selectedChild === index }"
                            :id="`dd-child-${index}`"
                            @click="selectedChild = index"
                        >
                            <div
                                class="dd-child-avatar w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 transition-all duration-150 body-text"
                                style="background: rgba(10,22,40,0.10); color: var(--navy-900);"
                                aria-hidden="true"
                            >{{ childrenInitials[index] }}</div>

                            <div class="flex-1 min-w-0">
                                <div class="text-[13px] font-semibold headline leading-[1.2]" style="color: var(--navy-900);">{{ child.name }}</div>
                                <div class="text-[11px] body-text mt-[2px]" style="color: var(--text-muted);">{{ child.grade }}</div>
                            </div>

                            <svg
                                class="dd-check w-[14px] h-[14px] shrink-0 transition-opacity duration-150"
                                :class="selectedChild === index ? 'opacity-100' : 'opacity-0'"
                                viewBox="0 0 14 14"
                                fill="none"
                                style="color: var(--gold-500);"
                                aria-hidden="true"
                            >
                                <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </li>
                </ul>

                <div style="height: 1px; background: rgba(69,71,76,0.1); margin: 4px 0;"></div>

                <button
                    class="dd-logout-btn flex items-center gap-[9px] w-full pt-[10px] px-4 pb-[14px] bg-transparent border-none cursor-pointer body-text text-[13px] transition-[color] duration-[120ms] text-left"
                    style="color: var(--text-muted);"
                    @mouseover="$event.currentTarget.style.color = 'var(--navy-900)'"
                    @mouseout="$event.currentTarget.style.color = 'var(--text-muted)'"
                    aria-label="Log out of Adullam Academy"
                >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M6 3H3a1 1 0 00-1 1v8a1 1 0 001 1h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path>
                        <path d="M10.5 5.5L13 8l-2.5 2.5M13 8H6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Log out
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped>
    .dashboard-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(251, 249, 246, 0.72);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(69, 71, 76, 0.12);
    }

    .switcher-trigger.open .switcher-caret {
        transform: rotate(180deg);
    }

    .dd-child-btn.active .dd-child-avatar {
        background: var(--navy-900) !important;
        color: var(--gold-500) !important;
    }
</style>
