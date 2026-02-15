import React, { useContext, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { AuthContext } from "../context/AuthContext";
import { getEntries } from "../api/journal";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

function MoodChart() {
  const { user } = useContext(AuthContext);
  const entries = user ? getEntries(user.email) : [];

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [entries]);

  if (!entries.length) {
    return (
      <p className="text-center text-muted">No mood scores recorded yet.</p>
    );
  }

  const chartData = {
    labels: sortedEntries.map((entry) =>
      new Date(entry.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
    ),
    datasets: [
      {
        label: "Mood Score",
        data: sortedEntries.map((entry) => entry.score),
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,

        pointBackgroundColor: sortedEntries.map((entry) => {
          if (entry.score <= 4) return "rgb(220, 53, 69)";
          if (entry.score <= 7) return "rgb(255, 193, 7)";
          return "rgb(25, 135, 84)";
        }),

        pointBorderColor: sortedEntries.map((entry) => {
          if (entry.score <= 4) return "rgb(220, 53, 69)";
          if (entry.score <= 7) return "rgb(255, 193, 7)";
          return "rgb(25, 135, 84)";
        }),

        segment: {
          borderColor: (ctx) => {
            const value = ctx.p1.parsed.y;

            if (value <= 4) return "rgb(220, 53, 69)";
            if (value <= 7) return "rgb(255, 193, 7)";
            return "rgb(25, 135, 84)";
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            const fullDate = new Date(sortedEntries[index].date);

            return fullDate.toLocaleString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          },
          label: function (context) {
            return `Score: ${context.raw}/10`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Mood Score",
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default MoodChart;
