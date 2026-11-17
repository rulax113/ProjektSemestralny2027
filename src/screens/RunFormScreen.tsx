import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hasErrors, RunFormErrors, RunFormInput } from '../domain/validation';
import { RootStackParamList } from '../navigation/types';
import { useDiary } from '../state/DiaryContext';

type Props = NativeStackScreenProps<RootStackParamList, 'RunForm'>;

export default function RunFormScreen({ navigation }: Props) {
  const { routes, addRun } = useDiary();
  const [input, setInput] = useState<RunFormInput>({
    parentId: '',
    date: '',
    durationMin: '',
    notes: '',
  });
  const [errors, setErrors] = useState<RunFormErrors>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Zmienia jedno pole formularza.
  function update(field: keyof RunFormInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  async function handleSave() {
    if (saving) {
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      const found = await addRun(input);
      setErrors(found);
      if (!hasErrors(found)) {
        navigation.goBack();
      }
    } catch {
      setSaveError('Nie udało się zapisać biegu. Spróbuj ponownie.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>TRASA</Text>
        {routes.length === 0 ? (
          <Text style={styles.hint}>Brak tras do wyboru.</Text>
        ) : (
          <View style={styles.chips}>
            {routes.map((route) => {
              const selected = input.parentId === route.id;
              return (
                <Pressable
                  key={route.id}
                  style={[styles.chip, selected ? styles.chipSelected : null]}
                  onPress={() => update('parentId', route.id)}
                >
                  <Text style={[styles.chipText, selected ? styles.chipTextSelected : null]}>
                    {route.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
        {errors.parentId ? <Text style={styles.error}>{errors.parentId}</Text> : null}

        <Text style={styles.label}>DATA</Text>
        <TextInput
          style={styles.input}
          placeholder="RRRR-MM-DD"
          placeholderTextColor="#9aa59d"
          value={input.date}
          onChangeText={(text) => update('date', text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.date ? <Text style={styles.error}>{errors.date}</Text> : null}

        <Text style={styles.label}>CZAS (MIN)</Text>
        <TextInput
          style={styles.input}
          placeholder="np. 32,5"
          placeholderTextColor="#9aa59d"
          value={input.durationMin}
          onChangeText={(text) => update('durationMin', text)}
          keyboardType="decimal-pad"
        />
        {errors.durationMin ? <Text style={styles.error}>{errors.durationMin}</Text> : null}

        <Text style={styles.label}>UWAGI (OPCJONALNE)</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="np. lekki bieg po pracy"
          placeholderTextColor="#9aa59d"
          value={input.notes}
          onChangeText={(text) => update('notes', text)}
          multiline
        />

        <Pressable
          style={[styles.button, saving ? styles.buttonDisabled : null]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.buttonText}>{saving ? 'Zapisywanie…' : 'Zapisz'}</Text>
        </Pressable>
        {saveError ? <Text style={styles.error}>{saveError}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f6f2' },
  container: { padding: 24, paddingBottom: 40 },
  label: {
    color: '#728078',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 22,
    marginBottom: 8,
  },
  hint: { color: '#8a958d', fontSize: 14 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e5eae4',
  },
  chipSelected: { backgroundColor: '#234a34', borderColor: '#234a34' },
  chipText: { color: '#36483c', fontSize: 15, fontWeight: '500' },
  chipTextSelected: { color: '#fff' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5eae4',
    paddingVertical: 13,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#1d3427',
  },
  inputMultiline: { minHeight: 90, textAlignVertical: 'top' },
  error: { color: '#b3402f', fontSize: 13, marginTop: 6 },
  button: {
    backgroundColor: '#234a34',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});