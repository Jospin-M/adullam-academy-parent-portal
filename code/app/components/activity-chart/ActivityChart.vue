<template>
    <div class="border-t border-[#E7E5E0] pt-10">
      <div class="flex items-center justify-between mb-5">
        <span class="text-[11px] font-medium tracking-[0.09em] uppercase text-[#78716C]">Weekly activity</span>
          <div class="flex border border-[#E7E5E0] rounded-[6px] overflow-hidden" role="group" aria-label="Chart time range">
            <button class="toggle-btn text-[12px] font-medium font-['DM_Sans',system-ui,sans-serif] py-[5px] px-[14px] border-none bg-transparent text-[#78716C] cursor-pointer transition-[background,color] duration-[140ms] active" onclick="setToggle(this,'7d')" aria-pressed="true">7 days</button>
            <button class="toggle-btn text-[12px] font-medium font-['DM_Sans',system-ui,sans-serif] py-[5px] px-[14px] border-none bg-transparent text-[#78716C] cursor-pointer transition-[background,color] duration-[140ms]" onclick="setToggle(this,'30d')" aria-pressed="false">30 days</button>
          </div>
      </div>
    </div>
</template>