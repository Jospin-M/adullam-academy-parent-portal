<script setup>
    const parent = {
        name: "Sarah Johnson",
        email: "sarah.johnson@adullam.edu"
    }

    const parentInitials = parent.name.split(" ").map(name => name[0]).join("");

    const children = [
        {
            name: "Elijah Johnson"
        },
        {
            name: "Amara Mitchell"
        }
    ];

    const childrenInitials = children.map(child => child.name.split(" ").map(name => name[0]).join(""));

    const showDropDown = ref(false);
</script>

<template>
    <header class="flex items-center justify-between px-10 py-[18px] border-b border-[#E7E5E0] sticky top-0 bg-[#F7F5F1] z-[100]">
        <!-- will be replaced with actual logo -->
        <div class="font-serif text-[17px] font-medium text-[#1C1917] tracking-tight">Adullam Academy</div>

        <div class="relative" id="switcher-wrap">
            <!-- Trigger pill — always shows parent account -->
            <button class="switcher-trigger flex items-center gap-[10px] py-[6px] pr-[14px] pl-[8px] border border-[#E7E5E0] rounded-[40px] cursor-pointer transition-[border-color] duration-[180ms] bg-[#F7F5F1] font-sans text-base hover:border-[#B45309]" @click="showDropDown = !showDropDown" id="switcher-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="switcher-dropdown">
                <div class="w-[30px] h-[30px] rounded-full bg-[#1C1917] text-[#F7F5F1] flex items-center justify-center text-[11px] font-medium shrink-0" aria-hidden="true">{{ parentInitials }}</div>
                <span class="text-[14px] font-medium">{{ parent.name }}</span>
                <span class="switcher-caret text-[10px] text-[#78716C] ml-[2px] transition-transform duration-200 inline-block" aria-hidden="true">▾</span>
            </button>

            <!-- Dropdown panel -->
            <div v-show="showDropDown" class="switcher-dropdown absolute top-[calc(100%+8px)] right-0 min-w-[228px] bg-[#F7F5F1] border border-[#E7E5E0] rounded-[10px] shadow-[0_4px_20px_rgba(28,25,23,0.09),0_1px_3px_rgba(28,25,23,0.05)] overflow-hidden z-[200]" id="switcher-dropdown" role="dialog" aria-label="Account and child switcher">
                <!-- Parent identity -->
                <div class="flex items-center gap-[11px] px-4 pt-[14px] pb-[13px] border-b border-[#E7E5E0]">
                    <div class="w-8 h-8 rounded-full bg-[#1C1917] text-[#F7F5F1] flex items-center justify-center text-[11px] font-medium font-sans shrink-0" aria-hidden="true">{{ parentInitials }}</div>
                    <div class="flex flex-col gap-[2px] leading-none">
                    <span class="text-[13px] font-medium text-[#1C1917]">{{ parent.name }}</span>
                    <span class="text-[11px] text-text-[#78716C]">{{ parent.email }}</span>
                    </div>
                </div>

                <!-- Children list -->
                <li v-for="(child, index) in children" :key="index">
                    <button class="dd-child-btn flex items-center gap-[10px] w-full px-4 py-2 bg-transparent border-none cursor-pointer font-sans text-left transition-[background] duration-[120ms] hover:bg-[rgba(28,25,23,0.04)] active" id="dd-child-0" >
                        <div class="dd-child-avatar w-[26px] h-[26px] rounded-full bg-[rgba(28,25,23,0.12)] text-[#1C1917] flex items-center justify-center text-[10px] font-medium shrink-0 font-sans transition-[background,color] duration-150" aria-hidden="true">{{ childrenInitials[index] }}</div>
                            <div class="flex-1 min-w-0">
                            <div class="text-[13px] font-medium text-[#1C1917] leading-[1.2]">{{ child.name }}</div>
                        </div>

                        <svg class="dd-check w-[14px] h-[14px] shrink-0 opacity-0 transition-opacity duration-150 text-[#78716C]" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </li>

                <hr class="border-none border-t border-[#E7E5E0] mt-1">

                <!-- Log out -->
                <button class="dd-logout-btn flex items-center gap-[9px] w-full pt-[10px] px-4 pb-[14px] bg-transparent border-none cursor-pointer font-sans text-[13px] text-[#78716C] transition-[color] duration-[120ms] text-left hover:text-[#1C1917]" aria-label="Log out of Adullam Academy">
                    <!-- Arrow-right-from-bracket icon -->
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