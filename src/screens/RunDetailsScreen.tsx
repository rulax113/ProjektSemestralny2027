import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { demoRoutes } from '../data/demoRoutes';
import { sampleRuns } from '../dev/sampleData';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RunDetails'>;

export default function RunDetailsScreen({ route }: Props) {
  const { runId } = route.params;
  const run = sampleRuns.find((item) => item.id === runId);

  if (!run) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <View style={styles.container}>
          <Text style={styles.emptyText}>Nie znaleziono biegu.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const runRoute = demoRoutes.find((item) => item.id === run.parentId);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Row label="TRASA" value={runRoute ? runRoute.name : 'Nieznana trasa'} />
          <Row label="DYSTANS TRASY" value={runRoute ? `${runRoute.distanceKm} km` : '—'} />
          <Row label="DATA" value={run.date} />
          <Row label="CZAS" value={`${run.durationMin} min`} />
          <Row label="UWAGI" value={run.notes ? run.notes : 'Brak uwag'} last />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last ? styles.rowLast : null]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f6f2' },
  container: { padding: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: '#e5eae4',
  },
  row: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#edf0ec' },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { color: '#728078', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  rowValue: { color: '#1d3427', fontSize: 18, fontWeight: '700', marginTop: 6 },
  emptyText: { color: '#8a958d', fontSize: 14, lineHeight: 21 },
});