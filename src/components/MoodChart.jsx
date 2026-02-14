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

  const chartData = useMemo(() => {
    const sorted = [...entries].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    return {
      labels: sorted.map((entry) => entry.date),
      datasets: [
        {
          label: "Mood Score",
          data: sorted.map((entry) => entry.score),
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: false,

          // Dynamic POINT colors (keep your working logic)
          pointBackgroundColor: sorted.map((entry) => {
            if (entry.score <= 4) return "rgb(220, 53, 69)"; // red
            if (entry.score <= 7) return "rgb(255, 193, 7)"; // yellow
            return "rgb(25, 135, 84)"; // green
          }),

          pointBorderColor: sorted.map((entry) => {
            if (entry.score <= 4) return "rgb(220, 53, 69)";
            if (entry.score <= 7) return "rgb(255, 193, 7)";
            return "rgb(25, 135, 84)";
          }),

          // 🔥 Dynamic LINE segment coloring
          segment: {
            borderColor: (ctx) => {
              const value = ctx.p1.parsed.y; // next point value

              if (value <= 4) return "rgb(220, 53, 69)";
              if (value <= 7) return "rgb(255, 193, 7)";
              return "rgb(25, 135, 84)";
            },
          },
        },
      ],
    };
  }, [entries]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
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
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  if (!entries.length) {
    return <p>No mood scores recorded yet.</p>;
  }

  return (
    <div style={{ width: "1000px", margin: "50px 250px", padding: "5px" }}>
      <h4 style={{ textAlign: "center" }}>Mood Score Trend</h4>
      <Line
        data={chartData}
        options={options}
        style={{ border: "1px solid black", padding: "5px" }}
      />
    </div>
  );
}

export default MoodChart;
