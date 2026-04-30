<script setup lang="ts">
  import Header from './components/header/Header.vue';
  import Activity from './components/activity-chart/Activity.vue';
  import Perfomance from './components/performance/Perfomance.vue';
  import LessonProgress from './components/progress/LessonProgress.vue';
  import Suggestions from "./components/practice-suggestions/Suggestions.vue";
 
  const lastUpdated = '3 hours ago';
</script>

<template>
  <Header />
    
  <div class="two-col-grid grid [grid-template-columns:58fr_42fr] max-[700px]:grid-cols-1 max-w-[1200px] mx-auto px-10 sm:px-10">
    <div class="pt-8 sm:pt-12 pr-0 sm:pr-12 pb-8 sm:pb-[60px] border-r-0 sm:border-r border-b border-[#E7E5E0] max-[700px]:border-b max-[700px]:border-[#E7E5E0]">
        <ActionItems />

        <hr class="border-none border-t border-[#E7E5E0] my-4">

        <Todos />
    </div>

    <div class="pt-8 sm:pt-12 pl-0 sm:pl-10 sm:pb-[60px]">
      <Perfomance />

      <hr class="border-none border-t border-[#E7E5E0] my-[22px]">

      <LessonProgress />

      <hr class="border-none border-t border-[#E7E5E0] my-[22px]">

      <Attendance />
    </div>
  </div>

  <div class="max-w-[1200px] mx-auto px-5 sm:px-10">
    <Activity />
    <Suggestions />
  </div>

  <div class="border-t border-[#E7E5E0] py-4 px-5 sm:px-10 max-w-[1200px] mx-auto flex justify-end">
    <span class="text-[12px] text-[#78716C]">Last updated {{ lastUpdated }}</span>
  </div>
</template>