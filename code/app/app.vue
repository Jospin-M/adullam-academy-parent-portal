<template>
  <Topbar />
    
  <div class="two-col-grid grid max-w-[1200px] mx-auto px-5 sm:px-10 max-[700px]:grid-cols-1">
    <div class="pt-8 sm:pt-12 pr-0 sm:pr-12 pb-8 sm:pb-[60px] border-r-0 sm:border-r border-b border-[#E7E5E0] max-[700px]:border-b max-[700px]:border-[#E7E5E0]">
        <ActionItems />

        <hr class="border-none border-t border-[#E7E5E0] my-8">

        <Todos />
    </div>
  </div>
</template>
