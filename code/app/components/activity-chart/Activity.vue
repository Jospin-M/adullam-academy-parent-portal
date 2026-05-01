<script setup>
    import { ref, computed, watch } from "vue";
    import VueApexCharts from "vue3-apexcharts";

    const activityData = {
      "2026-04-01": { quizzes: 2, lessons: 3, challenges: 1 },
      "2026-04-02": { quizzes: 4, lessons: 5, challenges: 2 },
      "2026-04-03": { quizzes: 1, lessons: 2, challenges: 0 },
      "2026-04-04": { quizzes: 5, lessons: 6, challenges: 3 },
      "2026-04-05": { quizzes: 3, lessons: 4, challenges: 2 },
      "2026-04-06": { quizzes: 0, lessons: 1, challenges: 0 },
      "2026-04-07": { quizzes: 2, lessons: 3, challenges: 1 },
      "2026-04-08": { quizzes: 4, lessons: 7, challenges: 3 },
      "2026-04-09": { quizzes: 3, lessons: 5, challenges: 2 },
      "2026-04-10": { quizzes: 1, lessons: 2, challenges: 1 },
      "2026-04-11": { quizzes: 2, lessons: 4, challenges: 2 },
      "2026-04-12": { quizzes: 6, lessons: 8, challenges: 4 },
      "2026-04-13": { quizzes: 2, lessons: 3, challenges: 1 },
      "2026-04-14": { quizzes: 4, lessons: 6, challenges: 2 },
      "2026-04-15": { quizzes: 1, lessons: 2, challenges: 0 },
      "2026-04-16": { quizzes: 3, lessons: 5, challenges: 2 },
      "2026-04-17": { quizzes: 2, lessons: 3, challenges: 1 },
      "2026-04-18": { quizzes: 5, lessons: 7, challenges: 3 },
      "2026-04-19": { quizzes: 3, lessons: 4, challenges: 2 },
      "2026-04-20": { quizzes: 1, lessons: 2, challenges: 1 },
      "2026-04-21": { quizzes: 4, lessons: 5, challenges: 2 },
      "2026-04-22": { quizzes: 2, lessons: 3, challenges: 1 },
      "2026-04-23": { quizzes: 3, lessons: 5, challenges: 2 },
      "2026-04-24": { quizzes: 6, lessons: 8, challenges: 4 },
      "2026-04-25": { quizzes: 2, lessons: 4, challenges: 2 },
      "2026-04-26": { quizzes: 1, lessons: 3, challenges: 1 },
      "2026-04-27": { quizzes: 4, lessons: 5, challenges: 2 },
      "2026-04-28": { quizzes: 2, lessons: 3, challenges: 1 },
      "2026-04-29": { quizzes: 5, lessons: 6, challenges: 3 },
      "2026-04-30": { quizzes: 3, lessons: 4, challenges: 2 },
    };

    function toKey(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    function totalInteractions(entry) {
        if (!entry) return 0;
        
        return entry.quizzes + entry.lessons + entry.challenges;
    }

  const activeRange = ref("7d");

  function getDateList(range) {
      const today = new Date();
      return Array.from({ length: range === "7d" ? 7 : 30 }, (_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (range === "7d" ? 6 : 29) + i);
          return d;
      });
  }

  const chartData = computed(() => {
      return getDateList(activeRange.value).map((date) => {
          const key = toKey(date);
          const entry = activityData[key] ?? { quizzes: 0, lessons: 0, challenges: 0 };
          return { date, key, ...entry, total: totalInteractions(entry) };
      });
  });

  const series = computed(() => [
      {
          name: "Interactions",
          data: chartData.value.map((d) => d.total),
      },
  ]);

  const tooltip = ref({
      visible: false,
      label: "",
      quizzes: 0,
      lessons: 0,
      challenges: 0,
      total: 0,
  });

  const tooltipPos = ref({ x: 0, y: 0 });
  const lastSelectedIndex = ref(null);

  function showTooltip(event, chartContext, i) {
      const current = chartData.value;
      if (i < 0 || i >= current.length) return;

      const d = current[i];

      const wrapper = chartContext.el.closest(".chart-wrapper");
      if (!wrapper) return;

      const wrapRect = wrapper.getBoundingClientRect();
      const chartRect = chartContext.el.getBoundingClientRect();
      const tooltipWidth = 170;

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      let x = clientX - wrapRect.left - tooltipWidth / 2;
      if (x + tooltipWidth > wrapRect.width) x = wrapRect.width - tooltipWidth - 4;
      if (x < 0) x = 0;

      const y = chartRect.top - wrapRect.top + 4;

      tooltipPos.value = { x, y };
      tooltip.value = {
          visible: true,
          label: d.date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
          }),
          quizzes: d.quizzes,
          lessons: d.lessons,
          challenges: d.challenges,
          total: d.total,
      };
  }

  const options = computed(() => {
      const is7d = activeRange.value === "7d";
      const data = chartData.value;

      return {
          chart: {
              type: "bar",
              height: 142,
              toolbar: { show: false },
              animations: { enabled: true, speed: 200 },
              selection: { enabled: false },
              events: {
                  // fires on both mouse click and touch tap
                  dataPointSelection(event, chartContext, config) {
                      const i = config.dataPointIndex;

                      // tap same bar again → hide
                      if (lastSelectedIndex.value === i && tooltip.value.visible) {
                          tooltip.value.visible = false;
                          lastSelectedIndex.value = null;
                          return;
                      }

                      lastSelectedIndex.value = i;
                      showTooltip(event, chartContext, i);
                  },
                  // desktop hover — show on enter
                  dataPointMouseEnter(event, chartContext, config) {
                      const i = config.dataPointIndex;
                      lastSelectedIndex.value = i;
                      showTooltip(event, chartContext, i);
                  },
                  // desktop hover — hide on leave
                  dataPointMouseLeave() {
                      tooltip.value.visible = false;
                      lastSelectedIndex.value = null;
                  },
                  mouseMove(event, chartContext, config) {
                      if (!tooltip.value.visible) return;
                      const i = config.dataPointIndex;
                      if (i < 0 || i >= chartData.value.length) {
                          tooltip.value.visible = false;
                          return;
                      }

                      const wrapper = chartContext.el.closest(".chart-wrapper");
                      if (!wrapper) return;

                      const wrapRect = wrapper.getBoundingClientRect();
                      const chartRect = chartContext.el.getBoundingClientRect();
                      const tooltipWidth = 170;

                      let x = event.clientX - wrapRect.left - tooltipWidth / 2;
                      if (x + tooltipWidth > wrapRect.width) x = wrapRect.width - tooltipWidth - 4;
                      if (x < 0) x = 0;

                      tooltipPos.value = { x, y: chartRect.top - wrapRect.top + 4 };
                  },
              },
          },
          plotOptions: {
              bar: {
                  borderRadius: 2,
                  columnWidth: is7d ? "60%" : "80%",
              },
          },
          dataLabels: { enabled: false },
          fill: { opacity: 0.6 },
          colors: ["#A8A29E"],
          grid: {
              borderColor: "#E7E5E0",
              xaxis: { lines: { show: false } },
              yaxis: { lines: { show: true } },
              padding: { left: 0, right: 0, top: 0, bottom: 0 },
          },
          xaxis: {
              categories: data.map((d, i) => {
                  if (is7d) {
                      return d.date.toLocaleDateString("en-US", { weekday: "short" });
                  }
                  return i % 5 === 0
                      ? d.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      : "";
              }),
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                  style: {
                      colors: "#78716C",
                      fontSize: "9px",
                      fontFamily: "DM Sans, sans-serif",
                  },
              },
              tooltip: { enabled: false },
          },
          yaxis: {
              labels: {
                  style: {
                      colors: "#78716C",
                      fontSize: "9px",
                      fontFamily: "DM Sans, sans-serif",
                  },
              },
              tickAmount: 2,
          },
          states: {
              hover: { filter: { type: "none" } },
              active: { filter: { type: "none" } },
              normal: { filter: { type: "none" } },
          },
          tooltip: { enabled: false },
      };
  });

  function setRange(range) {
      activeRange.value = range;
      tooltip.value = { ...tooltip.value, visible: false };
      lastSelectedIndex.value = null;
  }

  watch(activeRange, () => {
      tooltip.value = { ...tooltip.value, visible: false };
      lastSelectedIndex.value = null;
  });
</script>

<template>
    <div class="border-t border-[#E7E5E0] pt-10">
        <div class="flex items-center justify-between mb-5">
            <span class="text-[11px] font-medium tracking-[0.09em] uppercase text-[#78716C]">Activity</span>

            <div
                class="flex border border-[#E7E5E0] rounded-[6px] overflow-hidden"
                role="group"
                aria-label="Chart time range"
            >
                <button
                    class="text-[12px] font-medium font-['DM_Sans',system-ui,sans-serif] py-[5px] px-[14px] border-none cursor-pointer transition-[background,color] duration-[140ms]"
                    :class="activeRange === '7d' ? 'bg-[#1C1917] text-white' : 'bg-transparent text-[#78716C]'"
                    @click="setRange('7d')"
                    :aria-pressed="activeRange === '7d'"
                >
                    Last 7 days
                </button>
                <button
                    class="text-[12px] font-medium font-['DM_Sans',system-ui,sans-serif] py-[5px] px-[14px] border-none cursor-pointer transition-[background,color] duration-[140ms]"
                    :class="activeRange === '30d' ? 'bg-[#1C1917] text-white' : 'bg-transparent text-[#78716C]'"
                    @click="setRange('30d')"
                    :aria-pressed="activeRange === '30d'"
                >
                    Last 30 days
                </button>
            </div>
        </div>

        <div class="chart-wrapper" style="position: relative; width: 100%">
            <VueApexCharts
                type="bar"
                height="142"
                :options="options"
                :series="series"
            />

            <div
                v-if="tooltip.visible"
                :style="{
                    position: 'absolute',
                    left: tooltipPos.x + 'px',
                    top: tooltipPos.y + 'px',
                    pointerEvents: 'none',
                    zIndex: 50,
                }"
                style="
                    background: #fff;
                    border: 1px solid #e7e5e0;
                    border-radius: 6px;
                    padding: 6px 10px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 11px;
                    min-width: 170px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                "
            >
                <div style="font-weight: 600; font-size: 11px; color: #1c1917; margin-bottom: 5px; padding-bottom: 4px; border-bottom: 1px solid #e7e5e0;">
                    {{ tooltip.label }}
                </div>
                <div style="display: flex; flex-direction: column; gap: 3px">
                    <div style="display: flex; justify-content: space-between; gap: 12px">
                        <span style="color: #78716c">Quizzes completed</span>
                        <span style="font-weight: 600; color: #1c1917">{{ tooltip.quizzes }}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 12px">
                        <span style="color: #78716c">Lessons watched</span>
                        <span style="font-weight: 600; color: #1c1917">{{ tooltip.lessons }}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 12px">
                        <span style="color: #78716c">Coding challenges</span>
                        <span style="font-weight: 600; color: #1c1917">{{ tooltip.challenges }}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 12px; padding-top: 4px; border-top: 1px solid #e7e5e0;">
                        <span style="color: #78716c">Total interactions</span>
                        <span style="font-weight: 600; color: #1c1917">{{ tooltip.total }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.apexcharts-bar-area) {
    filter: none !important;
    transition: none !important;
}

:deep(.apexcharts-bar-area:hover) {
    filter: none !important;
}

:deep(.apexcharts-series path) {
    filter: none !important;
}

:deep(.apexcharts-tooltip) {
    display: none !important;
}

:deep(.apexcharts-xaxistooltip) {
    display: none !important;
}

:deep(.apexcharts-yaxistooltip) {
    display: none !important;
}
</style>