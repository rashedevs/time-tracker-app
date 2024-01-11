import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/chart/pie";

const PieChart = ({ projects }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Count the number of projects for each title
    const projectCounts = projects.reduce((acc, [_, project]) => {
      const title = project.title || "Unknown Title";
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for the pie chart
    const pieData = Object.entries(projectCounts).map(([title, count]) => ({
      name: title,
      value: count,
    }));

    const options = {
      title: {
        text: "Project Counts by Title",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} projects ({d}%)",
      },
      series: [
        {
          name: "Projects",
          type: "pie",
          radius: "50%",
          data: pieData,
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

export default PieChart;
