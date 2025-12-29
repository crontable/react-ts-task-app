import { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import * as S from './Dashboard.styles';
import { dashboardAPI } from '../api/dashboard.api';
import type { IDashboardResponse } from '../Types';

interface DashboardStats {
  label: string;
  value: number;
}

function Dashboard() {
  const [stats, setStats] = useState<IDashboardResponse>({
    numOfTask: 0,
    numOfRestTask: 0,
    numOfDoneTask: 0
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await dashboardAPI.fetchDashboardStats();
        console.log('Dashboard stats fetched:', data);

        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  const statItems: DashboardStats[] = [
    { label: '일', value: stats.numOfTask },
    { label: '해야할 일', value: stats.numOfRestTask },
    { label: '한 일', value: stats.numOfDoneTask }
  ];

  return (
    <S.Container>
      <S.Title>대시보드</S.Title>
      <S.StatsGrid>
        {statItems.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </S.StatsGrid>
    </S.Container>
  );
}

export default Dashboard;
