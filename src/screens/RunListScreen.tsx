import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routeNameById, sampleRuns } from '../dev/sampleData';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RunList'>;

export default function RunListScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={sampleRuns}
        keyExtractor={(run) => run.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>TWÓJ DZIENNIK AKTYWNOŚCI</Text>
            <Text style={styles.title}>RunningDiary</Text>
            <Text style={styles.description}>
              Wszystkie Twoje trasy i biegi w jednym, uporządkowanym miejscu.
            </Text>
            <Text style={styles.sectionTitle}>Twoje biegi</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Brak biegów. Dodaj pierwszy bieg przyciskiem poniżej.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('RunDetails', { runId: item.id })}
          >
            <Text style={styles.cardTitle}>{routeNameById(item.parentId)}</Text>
            <Text style={styles.cardMeta}>
              {item.date} · {item.durationMin} min
            </Text>
          </Pressable>
        )}
      />
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('RunForm')}>
          <Text style={styles.buttonText}>Dodaj bieg</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f6f2' },
  container: { padding: 24, paddingTop: 32, paddingBottom: 16 },
  eyebrow: { color: '#587462', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: '#172b21', fontSize: 36, fontWeight: '800', marginTop: 10 },
  description: { color: '#647269', fontSize: 16, lineHeight: 24, marginTop: 10, maxWidth: 330 },
  sectionTitle: { color: '#22372a', fontSize: 18, fontWeight: '700', marginTop: 30, marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5eae4',
  },
  cardTitle: { color: '#1d3427', fontSize: 17, fontWeight: '700' },
  cardMeta: { color: '#68766e', fontSize: 14, marginTop: 6 },
  emptyText: { color: '#8a958d', fontSize: 14, lineHeight: 21 },
  footer: {
    padding: 16,
    backgroundColor: '#f4f6f2',
    borderTopWidth: 1,
    borderTopColor: '#e4e9e3',
  },
  button: { backgroundColor: '#234a34', borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});