import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const formatStarStats = (starStats: Map<string, number> ) => {
    return Array.from({ length: 10 }, (_, i) => {
      const star = (i + 1).toString();
      return {
        star,
        count: starStats instanceof Map ? starStats.get(star) || 0 : starStats[star] || 0,
      };
    });
  };

  
export default function StarHistogram({ starStats }: { starStats: Map<string, number> }) {
  const data = formatStarStats(starStats);

  return (
    <div className="h-full w-full bg-secondary-600 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
        data={data} 
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          
          <XAxis dataKey="star" 
          label={{ value: "Ratings", position: "insideBottom", offset: -5, fill: 'var(--color-primary-600)' }} 
          tick={{ fill: 'var(--color-primary-600)', fontSize: 12 }}/>
          <YAxis
            hide={true}

            />
          <Tooltip />
          <Bar dataKey="count" 
            fill="var(--color-primary-500)"
            radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
