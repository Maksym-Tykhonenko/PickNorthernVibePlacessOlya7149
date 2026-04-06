import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  useWindowDimensions,
  Share,
} from 'react-native';
import { LOCATIONS, Location } from '../../data/locations';

type Category = 'Coast' | 'Forest' | 'Urban';
const CATEGORIES: Category[] = ['Coast', 'Forest', 'Urban'];

type Props = {
  navigation: any;
};

export default function LocationsScreen({ navigation }: Props) {
  const [active, setActive] = React.useState<Category>('Coast');
  const { height } = useWindowDimensions();

  const isVerySmall = height < 700;
  const isSmall = height < 780;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const filtered = useMemo(() => {
    return LOCATIONS.filter((item: Location) => item.category === active);
  }, [active]);

  const openDetails = useCallback(
    (item: Location) => {
      navigation.navigate('LocationDetail', { location: item });
    },
    [navigation]
  );

  const handleShare = useCallback(async (item: Location) => {
    try {
      await Share.share({
        message: `${item.title}\n\n${item.description}\n\nLocation: ${item.lat}, ${item.lng}`,
      });
    } catch {}
  }, []);

  const renderCategoryButton = (cat: Category) => {
    const selected = active === cat;

    return (
      <TouchableOpacity
        key={cat}
        activeOpacity={0.88}
        onPress={() => setActive(cat)}
        style={[
          s.catBtn,
          selected && s.catBtnActive,
          isVerySmall && s.catBtnSmall,
        ]}
      >
        <Text
          style={[
            s.catText,
            selected && s.catTextActive,
            isVerySmall && s.catTextSmall,
          ]}
        >
          {cat}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      activeOpacity={0.92}
      style={[s.card, isVerySmall && s.cardSmall]}
      onPress={() => openDetails(item)}
    >
      <Image
        source={item.image}
        style={[
          s.cardImage,
          {
            height: isVerySmall ? 140 : isSmall ? 152 : 164,
          },
        ]}
      />

      <View
        style={[
          s.cardBody,
          {
            padding: isVerySmall ? 12 : 14,
            gap: isVerySmall ? 6 : 8,
          },
        ]}
      >
        <Text style={[s.cardTitle, isVerySmall && { fontSize: 14 }]}>
          {item.title}
        </Text>

        <Text style={[s.cardCoords, isVerySmall && { fontSize: 11.5 }]}>
          {item.lat}, {item.lng}
        </Text>

        <Text
          numberOfLines={3}
          style={[
            s.cardDesc,
            isVerySmall && { fontSize: 11.5, lineHeight: 17 },
          ]}
        >
          {item.description}
        </Text>

        <View style={[s.cardBtns, isVerySmall && { gap: 8, marginTop: 2 }]}>
          <TouchableOpacity
            style={[s.btnPrimary, isVerySmall && s.btnSmall]}
            onPress={() => openDetails(item)}
            activeOpacity={0.9}
          >
            <Text style={[s.btnPrimaryText, isVerySmall && s.btnTextSmall]}>
              Open more
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.btnSecondary, isVerySmall && s.btnSmall]}
            onPress={() => handleShare(item)}
            activeOpacity={0.9}
          >
            <Text style={[s.btnSecondaryText, isVerySmall && s.btnTextSmall]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      <View style={[s.headerWrap, { paddingTop: 16 + topInset }]}>
        <Text
          style={[
            s.headerTitle,
            isVerySmall && {
              fontSize: 15,
              paddingHorizontal: 20,
              paddingVertical: 9,
            },
          ]}
        >
          Places
        </Text>
      </View>

      <View style={[s.catWrap, isVerySmall && { marginTop: 4 }]}>
        <Text style={s.catLabel}>Categories</Text>

        <View style={s.catOuter}>
          <View
            style={[
              s.catRow,
              isVerySmall && {
                paddingVertical: 10,
                paddingHorizontal: 10,
                gap: 6,
              },
            ]}
          >
            {CATEGORIES.map(renderCategoryButton)}
          </View>
        </View>
      </View>
    </View>
  );

  const ListEmpty = () => (
    <View style={s.emptyWrap}>
      <Text style={s.emptyTitle}>No places found</Text>
      <Text style={s.emptyText}>Try another category.</Text>
    </View>
  );

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.list,
          {
            paddingBottom: 120 + (isSmall ? 20 : 0),
            paddingTop: 0,
          },
        ]}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },

  list: {
    paddingHorizontal: 16,
    gap: 16,
  },

  headerWrap: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },

  catWrap: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  catLabel: {
    color: '#94A3B8',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  catOuter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  catRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#0F2744',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  catBtn: {
    minWidth: 94,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#122B47',
  },
  catBtnSmall: {
    minWidth: 88,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  catBtnActive: {
    backgroundColor: '#F5C518',
    borderColor: '#F5C518',
  },
  catText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  catTextSmall: {
    fontSize: 12,
  },
  catTextActive: {
    color: '#000000',
  },

  card: {
    backgroundColor: '#0F2744',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#183656',
  },
  cardSmall: {
    borderRadius: 14,
  },
  cardImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  cardBody: {
    minHeight: 126,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardCoords: {
    color: '#F5C518',
    fontSize: 12,
  },
  cardDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },

  cardBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },

  btnPrimary: {
    flex: 1,
    backgroundColor: '#F5C518',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  btnSecondary: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  btnSmall: {
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  btnTextSmall: {
    fontSize: 11,
  },

  emptyWrap: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
  },
});