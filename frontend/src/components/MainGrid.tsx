import { Box, Heading, SimpleGrid, Text, Card } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface StatCardProps {
  title: string;
  value: string;
  interval: string;
  trend?: "up" | "down" | "neutral";
  chartData?: number[];
}

const data: StatCardProps[] = [
    {
      title: "On-Time Submissions",
      value: "95%",
      interval: "Last 5 Assignments",
      trend: "up",
      chartData: [75, 80, 85, 90, 95],
    },
    {
      title: "Class Participation",
      value: "78%",
      interval: "Last 5 Sessions",
      trend: "down",
      chartData: [70, 75, 78, 80, 65],
    },
    {
      title: "Quiz Performance",
      value: "88%",
      interval: "Last 5 Quizzes",
      trend: "up",
      chartData: [65, 68, 78, 80, 88],
    },
    {
      title: "Number of Teachers",
      value: "12",
      interval: "Across All Classes",
    },
    {
      title: "Number of Students",
      value: "240",
      interval: "Across All Classes",
    },
    {
      title: "Number of Classes",
      value: "8",
      interval: "Active This Semester",
    },
  ];
  

const StatCard: React.FC<StatCardProps> = ({ title, value, interval, trend, chartData }) => {
  const borderColor = trend === "up" ? "green.400" : trend === "down" ? "red.400" : "black";
  const lineChartData = chartData
    ? {
        labels: Array.from({ length: chartData.length }, (_, i) => i + 1),
        datasets: [
          {
            data: chartData,
            borderColor,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      }
    : null;
  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
    maintainAspectRatio: false,
  };

  return (
    <Card
      p={4}
      shadow="md"
      borderWidth={1}
      borderColor={borderColor}
      transition="all 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)", shadow: "xl" }}
    >
      <Heading size="sm">{title}</Heading>
      <Text fontSize="2xl" fontWeight="bold">{value}</Text>
      <Text fontSize="sm" color="gray.500">{interval}</Text>
      {lineChartData && (
        <Box height={20} width="100%">
          <Line data={lineChartData} options={chartOptions} />
        </Box>
      )}
    </Card>
  );
};

const MainGrid: React.FC = () => {
  return (
    <Box width="100%" maxWidth={{ sm: "100%", md: "1700px" }}>
      <Heading as="h2" size="md" mb={4}>
        Overview
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={4} mb={4}>
        {data.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default MainGrid;
