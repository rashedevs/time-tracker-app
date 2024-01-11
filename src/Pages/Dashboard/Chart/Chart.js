import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/chart/bar";

const Chart = ({ projects }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Calculate total hours for each project
    const projectHoursData = projects.map(([_, project]) => ({
      title: project.title || "Unknown Title",
      totalHours: parseFloat(project.hours) || 0,
    }));

    // Prepare data for the bar chart
    const xAxisData = projectHoursData.map((project) => project.title);
    const yAxisData = projectHoursData.map((project) => project.totalHours);

    const options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: "{b}: {c} hours",
      },
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      yAxis: {
        type: "value",
        name: "Total Hours",
      },
      series: [
        {
          data: yAxisData,
          type: "bar",
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [projects]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
};

export default Chart;
