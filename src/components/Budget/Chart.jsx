import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import themes from "daisyui/src/colors/themes";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ totalIncome, totalExpense, totalSaving }) => {
  const theme = useSelector((state) => state.theme.theme);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (theme) {
      const colors = themes[`[data-theme=${theme}]`];

      setData(() => ({
        labels: ["income", "expense", "saving"],
        datasets: [
          {
            label: "Budget statistics chart",
            data: [totalIncome, totalExpense, totalSaving],
            backgroundColor: [colors.success, colors.error, colors.info],
          },
        ],
      }));
    }
  }, [theme, totalIncome, totalExpense, totalSaving]);

  return data && <Pie data={data} />;
};

export default Chart;
