<script setup>
    const average = 83;
</script>

<template>
    <div class="flex flex-col gap-[3px]">
        <span class="font-['Lora',Georgia,serif] text-[26px] font-normal leading-none text-[#B45309]" aria-label="Quiz average: 78 percent, below threshold">{{ average }}%</span>
        <span class="text-[12px] text-[#78716C] font-normal">Quiz average</span>
    </div>
</template>