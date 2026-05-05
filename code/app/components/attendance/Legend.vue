<template>
    <div
        class="flex flex-wrap gap-x-4 gap-y-[6px] text-[10px] body-text mt-4 pt-[12px] items-center"
        style="color: var(--text-muted); border-top: 1px solid rgba(69,71,76,0.08);"
    >
        <!-- Present (class) -->
        <div class="flex items-center gap-[5px]">
            <span
                class="w-2 h-2 rounded-full shrink-0"
                style="background: var(--navy-900); opacity: 0.7;"
            ></span>
            <span>Present (class)</span>
        </div>

        <!-- Present (help) -->
        <div class="flex items-center gap-[5px]">
            <span
                class="w-2 h-2 rounded-full shrink-0"
                style="background: var(--navy-900); opacity: 0.25; border: 1px solid rgba(15, 23, 42, 0.25);"
            ></span>
            <span>Present (help)</span>
        </div>

        <!-- Absent (class only) -->
        <div class="flex items-center gap-[5px]">
            <span
                class="w-2 h-2 rounded-full shrink-0 bg-transparent"
                style="border: 1.5px solid var(--alert);"
            ></span>
            <span>Absent</span>
        </div>

        <!-- No session -->
        <div class="flex items-center gap-[5px]">
            <span
                class="w-2 h-2 rounded-full shrink-0 bg-transparent"
                style="border: 1.5px solid rgba(69,71,76,0.2); opacity: 0.5;"
            ></span>
            <span>No session</span>
        </div>
    </div>
</template>