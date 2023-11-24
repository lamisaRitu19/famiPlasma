import React, { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthContext } from "../../context/AuthProvider";

const AgeChart = () => {
  const { ageData } = useContext(AuthContext);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={600} height={400} data={ageData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#d43535" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgeChart;
