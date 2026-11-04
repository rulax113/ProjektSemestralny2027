import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const plannedSteps = ['Dodaj trasę', 'Zapisz bieg', 'Sprawdź swoje tempo'];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>TWÓJ DZIENNIK AKTYWNOŚCI</Text>
        <Text style={styles.title}>RunningDiary</Text>
        <Text style={styles.description}>
          Wszystkie Twoje trasy i biegi w jednym, uporządkowanym miejscu.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.cardLabel}>TWOJE PODSUMOWANIE</Text>
          <Text style={styles.emptyTitle}>Zaczynamy od pierwszego biegu</Text>
          <Text style={styles.emptyText}>
            Gdy dodasz bieg, zobaczysz tutaj pokonany dystans i średnie tempo.
          </Text>
          <View style={styles.metrics}>
            <Metric label="BIEGI" value="0" />
            <View style={styles.divider} />
            <Metric label="DYSTANS" value="0 km" />
            <View style={styles.divider} />
            <Metric label="TEMPO" value="—" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Plan aplikacji</Text>
        {plannedSteps.map((step, index) => (
          <View style={styles.step} key={step}>
            <Text style={styles.stepNumber}>0{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
        <Text style={styles.note}>To ekran startowy. Funkcje będziemy dodawać krok po kroku.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f6f2' },
  container: { padding: 24, paddingTop: 48, paddingBottom: 40 },
  eyebrow: { color: '#587462', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: '#172b21', fontSize: 36, fontWeight: '800', marginTop: 10 },
  description: { color: '#647269', fontSize: 16, lineHeight: 24, marginTop: 10, maxWidth: 330 },
  summaryCard: { backgroundColor: '#fff', borderRadius: 22, padding: 22, marginTop: 30, borderWidth: 1, borderColor: '#e5eae4' },
  cardLabel: { color: '#728078', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  emptyTitle: { color: '#1d3427', fontSize: 19, fontWeight: '700', marginTop: 16 },
  emptyText: { color: '#68766e', fontSize: 14, lineHeight: 21, marginTop: 7 },
  metrics: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingTop: 18, borderTopWidth: 1, borderTopColor: '#edf0ec' },
  metric: { flex: 1 },
  metricValue: { color: '#234a34', fontSize: 17, fontWeight: '700' },
  metricLabel: { color: '#89938c', fontSize: 9, fontWeight: '700', letterSpacing: 0.8, marginTop: 5 },
  divider: { width: 1, height: 30, backgroundColor: '#e8ece7', marginHorizontal: 9 },
  sectionTitle: { color: '#22372a', fontSize: 18, fontWeight: '700', marginTop: 30, marginBottom: 10 },
  step: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#e4e9e3' },
  stepNumber: { color: '#6f9179', fontSize: 12, fontWeight: '700', width: 38 },
  stepText: { color: '#36483c', fontSize: 15, fontWeight: '500' },
  note: { color: '#8a958d', fontSize: 12, lineHeight: 18, marginTop: 22 },
});
