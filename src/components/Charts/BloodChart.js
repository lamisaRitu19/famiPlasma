import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { AuthContext } from "../../context/AuthProvider";

const BloodChart = () => {
  const { bloodData } = useContext(AuthContext);
  const COLORS = [
    "#ff0000",
    "#e50000",
    "#cc0000",
    "#b20000",
    "#990000",
    "#7f0000",
    "#660000",
    "#4c0000",
  ];

  return (
    <ResponsiveContainer width="80%" height={400}>
      <PieChart width={500} height={400}>
        <Pie
          data={bloodData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          paddingAngle={2}
          legendType="circle"
        >
          {bloodData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip></Tooltip>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BloodChart;
