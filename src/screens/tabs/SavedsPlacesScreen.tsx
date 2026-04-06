import React, { useCallback, useMemo, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useSaved } from '../../context/SavedContext';
import { Location } from '../../data/locations';

type Category = 'Coast' | 'Forest' | 'Urban';
const CATEGORIES: Category[] = ['Coast', 'Forest', 'Urban'];

export default function SavedPlacesScreen() {
  const { saved, toggleSaved } = useSaved();
  const navigation = useNavigation<any>();
  const [active, setActive] = useState<Category>('Coast');
  const [query, setQuery] = useState('');

  const { height } = useWindowDimensions();
  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const normalizedQuery = query.trim().toLowerCase();

  const categoryCounts = useMemo(() => {
    return {
      Coast: saved.filter(item => item.category === 'Coast').length,
      Forest: saved.filter(item => item.category === 'Forest').length,
      Urban: saved.filter(item => item.category === 'Urban').length,
    };
  }, [saved]);

  const filtered = useMemo(() => {
    return saved.filter(item => {
      const matchesCategory = item.category === active;
      const matchesQuery =
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [saved, active, normalizedQuery]);

  const onShare = useCallback(async (item: Location) => {
    try {
      await Share.share({
        message: `${item.title}\n\n📍 ${item.lat}, ${item.lng}\n\n${item.description}`,
      });
    } catch {}
  }, []);

  const onRemove = useCallback(
    (item: Location) => {
      Alert.alert(
        'Remove place',
        `Remove "${item.title}" from saved places?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => toggleSaved(item),
          },
        ]
      );
    },
    [toggleSaved]
  );

  const openDetails = useCallback(
    (item: Location) => {
      navigation.navigate('Locations', {
        screen: 'LocationDetail',
        params: { location: item },
      });
    },
    [navigation]
  );

  const Header = () => (
    <View>
      <View
        style={[
          s.headerWrap,
          {
            paddingTop: (isVerySmall ? 8 : 14) + topInset,
            paddingBottom: isVerySmall ? 10 : 14,
          },
        ]}
      >
        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 14 : isSmall ? 15 : 17,
              paddingHorizontal: isVerySmall ? 20 : 28,
              paddingVertical: isVerySmall ? 8 : 10,
            },
          ]}
        >
          Saved Places
        </Text>
      </View>

      <View
        style={[
          s.leiaBanner,
          {
            marginHorizontal: isVerySmall ? 12 : 16,
            borderRadius: isVerySmall ? 14 : 16,
            padding: isVerySmall ? 12 : 14,
            marginBottom: isVerySmall ? 10 : 12,
            gap: isVerySmall ? 8 : 10,
          },
        ]}
      >
        <View style={s.leiaText}>
          <Text style={[s.leiaName, { fontSize: isVerySmall ? 13 : 14 }]}>
            Leia:
          </Text>
          <Text
            style={[
              s.leiaDesc,
              {
                fontSize: isVerySmall ? 11 : 12,
                lineHeight: isVerySmall ? 16 : 18,
              },
            ]}
          >
            Here are the places you've decided to keep for yourself. You can return to them at any time, review the details, or simply relive their atmosphere.
          </Text>
        </View>

        <Image
          source={require('../../assets/onboarding_5.png')}
          style={[
            s.leiaImage,
            {
              width: isVerySmall ? 58 : 70,
              height: isVerySmall ? 68 : 80,
            },
          ]}
          resizeMode="cover"
        />
      </View>

      <View
        style={[
          s.quickActions,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            gap: isVerySmall ? 10 : 12,
            marginBottom: isVerySmall ? 10 : 12,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            s.btnYellow,
            {
              borderRadius: isVerySmall ? 12 : 14,
              paddingVertical: isVerySmall ? 12 : 14,
            },
          ]}
          activeOpacity={0.88}
          onPress={() => navigation.navigate('Locations')}
        >
          <Text
            style={[
              s.btnYellowText,
              { fontSize: isVerySmall ? 12.5 : 14 },
            ]}
          >
            See all places
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            s.btnDark,
            {
              borderRadius: isVerySmall ? 12 : 14,
              paddingVertical: isVerySmall ? 12 : 14,
            },
          ]}
          activeOpacity={0.88}
          onPress={() => navigation.navigate('Map')}
        >
          <Text
            style={[
              s.btnDarkText,
              { fontSize: isVerySmall ? 12.5 : 14 },
            ]}
          >
            Open map
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          s.searchWrap,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            marginBottom: isVerySmall ? 10 : 12,
          },
        ]}
      >
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search saved places..."
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

      <View
        style={[
          s.statsWrap,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            marginBottom: isVerySmall ? 10 : 12,
          },
        ]}
      >
        <Text style={[s.statsText, { fontSize: isVerySmall ? 11 : 12 }]}>
          Total saved: {saved.length}
        </Text>
        <Text style={[s.statsText, { fontSize: isVerySmall ? 11 : 12 }]}>
          Showing: {filtered.length}
        </Text>
      </View>

      <View
        style={[
          s.catWrap,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            marginBottom: isVerySmall ? 10 : 12,
          },
        ]}
      >
        <Text
          style={[
            s.catLabel,
            {
              fontSize: isVerySmall ? 11 : 12,
              marginBottom: isVerySmall ? 8 : 10,
              textAlign: 'center',
            },
          ]}
        >
          Categories
        </Text>

        <View style={s.catOuter}>
          <View
            style={[
              s.catRow,
              {
                gap: isVerySmall ? 6 : 8,
                paddingVertical: isVerySmall ? 10 : 12,
                paddingHorizontal: isVerySmall ? 10 : 12,
                borderRadius: isVerySmall ? 22 : 24,
              },
            ]}
          >
            {CATEGORIES.map(cat => {
              const count = categoryCounts[cat];
              const selected = active === cat;

              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    s.catBtn,
                    selected && s.catBtnActive,
                    {
                      paddingHorizontal: isVerySmall ? 14 : 20,
                      paddingVertical: isVerySmall ? 8 : 10,
                      minWidth: isVerySmall ? 84 : 94,
                    },
                  ]}
                  activeOpacity={0.88}
                  onPress={() => setActive(cat)}
                >
                  <Text
                    style={[
                      s.catText,
                      selected && s.catTextActive,
                      { fontSize: isVerySmall ? 12 : 13 },
                    ]}
                  >
                    {cat}
                  </Text>
                  <Text
                    style={[
                      s.catCount,
                      selected && s.catCountActive,
                      { fontSize: isVerySmall ? 10 : 11 },
                    ]}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {saved.length === 0 && (
        <View
          style={[
            s.emptyGlobalWrap,
            {
              marginHorizontal: isVerySmall ? 12 : 16,
              borderRadius: isVerySmall ? 14 : 16,
              padding: isVerySmall ? 16 : 20,
              marginBottom: isVerySmall ? 12 : 16,
            },
          ]}
        >
          <Text style={[s.emptyGlobalTitle, { fontSize: isVerySmall ? 14 : 16 }]}>
            No saved places yet
          </Text>
          <Text
            style={[
              s.emptyGlobalText,
              {
                fontSize: isVerySmall ? 11.5 : 13,
                lineHeight: isVerySmall ? 17 : 20,
              },
            ]}
          >
            Save any place to make it appear here.
          </Text>
        </View>
      )}
    </View>
  );

  const EmptyCategory = () => (
    <View style={s.emptyCategory}>
      <Text
        style={[
          s.emptyCategoryTitle,
          { fontSize: isVerySmall ? 14 : 15 },
        ]}
      >
        No saved {active} places
      </Text>
      <Text
        style={[
          s.emptyCategoryText,
          {
            fontSize: isVerySmall ? 11.5 : 13,
            lineHeight: isVerySmall ? 17 : 20,
          },
        ]}
      >
        {query.trim()
          ? 'Try another search request or switch category.'
          : 'Save a place in this category and it will appear here.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={saved.length === 0 ? [] : filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Header}
        ListEmptyComponent={saved.length === 0 ? null : EmptyCategory}
        contentContainerStyle={[
          s.list,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingBottom: isVerySmall ? 110 : 130,
            gap: isVerySmall ? 12 : 14,
          },
        ]}
        renderItem={({ item }) => (
          <View style={[s.card, { borderRadius: isVerySmall ? 14 : 16 }]}>
            <Image
              source={item.image}
              style={[
                s.cardImage,
                {
                  height: isVerySmall ? 118 : isSmall ? 124 : 130,
                },
              ]}
            />

            <View
              style={[
                s.cardBody,
                {
                  padding: isVerySmall ? 11 : 12,
                  gap: isVerySmall ? 4 : 5,
                },
              ]}
            >
              <Text
                style={[
                  s.cardTitle,
                  { fontSize: isVerySmall ? 13 : 14 },
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  s.cardCoords,
                  { fontSize: isVerySmall ? 11 : 12 },
                ]}
              >
                📍 {item.lat}, {item.lng}
              </Text>

              <Text
                style={[
                  s.cardDesc,
                  {
                    fontSize: isVerySmall ? 11 : 12,
                    lineHeight: isVerySmall ? 16 : 18,
                  },
                ]}
                numberOfLines={3}
              >
                {item.description}
              </Text>

              <View
                style={[
                  s.cardBtns,
                  {
                    gap: isVerySmall ? 6 : 8,
                    marginTop: isVerySmall ? 5 : 6,
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    s.btnOpen,
                    {
                      borderRadius: isVerySmall ? 9 : 10,
                      paddingVertical: isVerySmall ? 9 : 10,
                    },
                  ]}
                  activeOpacity={0.88}
                  onPress={() => openDetails(item)}
                >
                  <Text
                    style={[
                      s.btnOpenText,
                      { fontSize: isVerySmall ? 11 : 12 },
                    ]}
                  >
                    Open more
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    s.btnShare,
                    {
                      borderRadius: isVerySmall ? 9 : 10,
                      paddingVertical: isVerySmall ? 9 : 10,
                    },
                  ]}
                  activeOpacity={0.88}
                  onPress={() => onShare(item)}
                >
                  <Text
                    style={[
                      s.btnShareText,
                      { fontSize: isVerySmall ? 11 : 12 },
                    ]}
                  >
                    Share
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    s.btnRemove,
                    {
                      borderRadius: isVerySmall ? 9 : 10,
                      paddingVertical: isVerySmall ? 9 : 10,
                      paddingHorizontal: isVerySmall ? 12 : 14,
                    },
                  ]}
                  activeOpacity={0.88}
                  onPress={() => onRemove(item)}
                >
                  <Text
                    style={[
                      s.btnRemoveText,
                      { fontSize: isVerySmall ? 14 : 16 },
                    ]}
                  >
                    🗑
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={<View style={{ height: isVerySmall ? 16 : 24 }} />}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },

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
    borderColor: '#1E3A5F',
  },

  leiaText: {
    flex: 1,
  },

  leiaName: {
    color: '#F5C518',
    fontWeight: '700',
    marginBottom: 4,
  },

  leiaDesc: {
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },

  leiaImage: {
    borderRadius: 10,
    marginLeft: 10,
  },

  quickActions: {
    flexDirection: 'row',
  },

  btnYellow: {
    flex: 1,
    backgroundColor: '#F5C518',
    alignItems: 'center',
  },

  btnYellowText: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  btnDark: {
    flex: 1,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },

  btnDarkText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  searchWrap: {},

  searchInput: {
    backgroundColor: '#0F2744',
    borderWidth: 1,
    borderColor: '#1E3A5F',
    borderRadius: 14,
    color: '#FFFFFF',
    paddingHorizontal: 14,
  },

  statsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statsText: {
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  catWrap: {},

  catLabel: {
    color: '#94A3B8',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
  },

  catOuter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  catRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#0F2744',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },

  catBtn: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#122B47',
  },

  catBtnActive: {
    backgroundColor: '#F5C518',
    borderColor: '#F5C518',
  },

  catText: {
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  catTextActive: {
    color: '#000000',
  },

  catCount: {
    color: '#64748B',
    fontWeight: '700',
    marginTop: 2,
  },

  catCountActive: {
    color: '#000000',
  },

  emptyGlobalWrap: {
    backgroundColor: '#0F2744',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },

  emptyGlobalTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 6,
    textAlign: 'center',
  },

  emptyGlobalText: {
    color: '#94A3B8',
    textAlign: 'center',
  },

  emptyCategory: {
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyCategoryTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 6,
    textAlign: 'center',
  },

  emptyCategoryText: {
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  list: {},

  card: {
    backgroundColor: '#0F2744',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#183656',
  },

  cardImage: {
    width: '100%',
    resizeMode: 'cover',
  },

  cardBody: {},

  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  cardCoords: {
    color: '#F5C518',
  },

  cardDesc: {
    color: '#94A3B8',
  },

  cardBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnOpen: {
    flex: 1,
    backgroundColor: '#F5C518',
    alignItems: 'center',
  },

  btnOpenText: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  btnShare: {
    flex: 1,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
  },

  btnShareText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  btnRemove: {
    backgroundColor: '#1E3A5F',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },

  btnRemoveText: {},
});