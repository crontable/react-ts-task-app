import * as S from './StatCard.styles';

interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <S.Card>
      <S.Label>{label}</S.Label>
      <S.Value>{value}</S.Value>
    </S.Card>
  );
}
