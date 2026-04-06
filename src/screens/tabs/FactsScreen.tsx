import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
 Image,
  Share,
  Platform,
  useWindowDimensions,
  TextInput,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { FACTS } from '../../data/facts';

export default function FactsScreen() {
  const { height } = useWindowDimensions();
  const [query, setQuery] = useState('');

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const filteredFacts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return FACTS;

    return FACTS.filter(item =>
      item.text.toLowerCase().includes(normalized),
    );
  }, [query]);

  const onShare = useCallback(async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch {}
  }, []);

  const onCopy = useCallback((text: string) => {
    try {
      Clipboard.setString(text);
      Alert.alert('Copied', 'Fact copied to clipboard');
    } catch {}
  }, []);

  const renderHeader = () => (
    <View>
      <View
        style={[
          s.headerWrap,
          {
            paddingTop: (isVerySmall ? 8 : isSmall ? 10 : 14) + topInset,
            paddingBottom: isVerySmall ? 8 : isSmall ? 10 : 14,
          },
        ]}
      >
        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 12.5 : isSmall ? 13 : 17,
              paddingHorizontal: isVerySmall ? 18 : isSmall ? 20 : 28,
              paddingVertical: isVerySmall ? 7 : isSmall ? 8 : 10,
            },
          ]}
        >
          Northern Facts
        </Text>
      </View>

      <View
        style={[
          s.leiaBanner,
          {
            borderRadius: isVerySmall ? 14 : 16,
            padding: isVerySmall ? 10 : isSmall ? 12 : 14,
            marginBottom: isVerySmall ? 10 : isSmall ? 12 : 16,
            gap: isVerySmall ? 8 : 10,
          },
        ]}
      >
        <View style={s.leiaText}>
          <Text
            style={[
              s.leiaName,
              {
                fontSize: isVerySmall ? 11.5 : isSmall ? 12 : 14,
                marginBottom: isVerySmall ? 3 : 4,
              },
            ]}
          >
            Leia:
          </Text>
          <Text
            style={[
              s.leiaDesc,
              {
                fontSize: isVerySmall ? 9.5 : isSmall ? 10 : 12,
                lineHeight: isVerySmall ? 14 : isSmall ? 15 : 18,
              },
            ]}
          >
            Here I have collected short facts about Canada and its nature. They help
            you better understand what you are seeing and notice details that are easy to miss.
          </Text>
        </View>

        <Image
          source={require('../../assets/onboarding_1.png')}
          style={[
            s.leiaImage,
            {
              width: isVerySmall ? 52 : isSmall ? 56 : 70,
              height: isVerySmall ? 60 : isSmall ? 64 : 80,
            },
          ]}
          resizeMode="cover"
        />
      </View>

      <View style={[s.searchWrap, { marginBottom: isVerySmall ? 10 : 12 }]}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search facts..."
          placeholderTextColor="#64748B"
          style={[
            s.searchInput,
            {
              fontSize: isVerySmall ? 12 : 13,
              paddingVertical: isVerySmall ? 10 : 12,
            },
          ]}
        />
      </View>

      <View style={s.countWrap}>
        <Text style={[s.countText, { fontSize: isVerySmall ? 11 : 12 }]}>
          {filteredFacts.length} fact{filteredFacts.length === 1 ? '' : 's'} found
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={s.emptyWrap}>
      <Text style={s.emptyTitle}>No facts found</Text>
      <Text style={s.emptyText}>Try another keyword.</Text>
    </View>
  );

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={filteredFacts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.list,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingTop: isVerySmall ? 2 : 4,
            paddingBottom: isVerySmall ? 120 : 140,
            gap: isVerySmall ? 10 : isSmall ? 10 : 12,
          },
        ]}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={() => (
          <View style={{ height: isVerySmall ? 20 : 32 }} />
        )}
        renderItem={({ item, index }) => (
          <View
            style={[
              s.card,
              {
                borderRadius: isVerySmall ? 14 : 16,
                padding: isVerySmall ? 12 : isSmall ? 14 : 20,
                gap: isVerySmall ? 7 : isSmall ? 8 : 12,
              },
            ]}
          >
            <View style={s.cardTopRow}>
              <Text
                style={[
                  s.cardIcon,
                  { fontSize: isVerySmall ? 20 : isSmall ? 22 : 28 },
                ]}
              >
                💡
              </Text>
              <Text style={[s.factIndex, { fontSize: isVerySmall ? 10 : 11 }]}>
                Fact {index + 1}
              </Text>
            </View>

            <Text
              style={[
                s.cardText,
                {
                  fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                  lineHeight: isVerySmall ? 16 : isSmall ? 17 : 20,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={[s.actionRow, { gap: isVerySmall ? 8 : 10 }]}>
              <TouchableOpacity
                style={[
                  s.shareBtn,
                  {
                    borderRadius: isVerySmall ? 10 : 12,
                    paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 12,
                  },
                ]}
                onPress={() => onShare(item.text)}
              >
                <Text
                  style={[
                    s.shareBtnText,
                    {
                      fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
                    },
                  ]}
                >
                  Share
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  s.copyBtn,
                  {
                    borderRadius: isVerySmall ? 10 : 12,
                    paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 12,
                  },
                ]}
                onPress={() => onCopy(item.text)}
              >
                <Text
                  style={[
                    s.copyBtnText,
                    {
                      fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
                    },
                  ]}
                >
                  Copy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },

  list: {},

  headerWrap: {
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: '#000000',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },

  leiaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2744',
    borderWidth: 1,
    borderColor: '#183656',
  },

  leiaText: {
    flex: 1,
  },

  leiaName: {
    color: '#F5C518',
    fontWeight: '700',
  },

  leiaDesc: {
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },

  leiaImage: {
    borderRadius: 10,
    marginLeft: 10,
  },

  searchWrap: {},

  searchInput: {
    backgroundColor: '#0F2744',
    borderWidth: 1,
    borderColor: '#183656',
    borderRadius: 14,
    color: '#FFFFFF',
    paddingHorizontal: 14,
  },

  countWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },

  countText: {
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  card: {
    backgroundColor: '#4A0E35',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6A1B4D',
  },

  cardTopRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardIcon: {},

  factIndex: {
    color: '#F5C518',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  cardText: {
    color: '#F1E6EE',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '500',
  },

  actionRow: {
    flexDirection: 'row',
    width: '100%',
  },

  shareBtn: {
    flex: 1,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
  },

  shareBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  copyBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },

  copyBtnText: {
    color: '#CBD5E1',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  emptyWrap: {
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
  },
});