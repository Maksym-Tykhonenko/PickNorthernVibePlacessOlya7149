import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Modal,
  Platform,
  useWindowDimensions,
  TextInput,
  Share,
  Linking,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { LOCATIONS, Location } from '../../data/locations';

const INITIAL_REGION: Region = {
  latitude: 56.0,
  longitude: -96.0,
  latitudeDelta: 45,
  longitudeDelta: 45,
};

export default function MapScreen() {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);

  const [selected, setSelected] = useState<Location | null>(null);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const cardAnim = useRef(new Animated.Value(0)).current;
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const filteredLocations = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return LOCATIONS;

    return LOCATIONS.filter(item =>
      item.title.toLowerCase().includes(normalized) ||
      item.description.toLowerCase().includes(normalized)
    );
  }, [query]);

  const animateToLocation = (location: Location) => {
    mapRef.current?.animateToRegion(
      {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 6,
        longitudeDelta: 6,
      },
      500
    );
  };

  const showCard = (location: Location) => {
    setSelected(location);
    setActiveId(location.id);
    animateToLocation(location);

    cardAnim.setValue(0);
    Animated.spring(cardAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 55,
      friction: 8,
    }).start();
  };

  const hideCard = () => {
    Animated.timing(cardAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setSelected(null);
      setActiveId(null);
    });
  };

  const zoomIn = async () => {
    const cam = await mapRef.current?.getCamera();
    if (!cam) return;

    mapRef.current?.animateCamera({
      ...cam,
      altitude: (cam.altitude ?? 1000000) / 2,
      zoom: (cam.zoom ?? 5) + 1,
    });
  };

  const zoomOut = async () => {
    const cam = await mapRef.current?.getCamera();
    if (!cam) return;

    mapRef.current?.animateCamera({
      ...cam,
      altitude: (cam.altitude ?? 1000000) * 2,
      zoom: (cam.zoom ?? 5) - 1,
    });
  };

  const fitAll = () => {
    const coords = LOCATIONS.map(item => ({
      latitude: item.lat,
      longitude: item.lng,
    }));

    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: {
        top: isSmall ? 28 : 40,
        right: 24,
        bottom: isSmall ? 28 : 40,
        left: 24,
      },
      animated: true,
    });
  };

  const resetMap = () => {
    hideCard();
    setQuery('');
    mapRef.current?.animateToRegion(INITIAL_REGION, 500);
  };

  const onShare = async () => {
    if (!selected) return;

    try {
      await Share.share({
        message: `${selected.title}\n\n${selected.description}\n\n📍 ${selected.lat}, ${selected.lng}`,
      });
    } catch {}
  };

  const onOpenInMaps = async () => {
    if (!selected) return;

    const url = `https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`;

    try {
      await Linking.openURL(url);
    } catch {}
  };

  const onSearchFirst = () => {
    if (filteredLocations.length === 0) return;
    showCard(filteredLocations[0]);
  };

  const cardScale = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.88, 1],
  });

  const cardTranslateY = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  return (
    <SafeAreaView style={s.container}>
      <View
        style={[
          s.headerWrap,
          {
            paddingTop: (isSmall ? 8 : 12) + topInset,
            paddingBottom: isSmall ? 8 : 12,
            paddingHorizontal: isVerySmall ? 12 : 16,
          },
        ]}
      >
        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 13 : isSmall ? 14 : 17,
              paddingVertical: isVerySmall ? 7 : isSmall ? 8 : 10,
              paddingHorizontal: isVerySmall ? 18 : 24,
            },
          ]}
        >
          Location Map
        </Text>
      </View>

      <View
        style={[
          s.searchRow,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            gap: isVerySmall ? 8 : 10,
            marginBottom: isVerySmall ? 8 : 10,
          },
        ]}
      >
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search place..."
          placeholderTextColor="#64748B"
          style={[
            s.searchInput,
            {
              fontSize: isVerySmall ? 12 : 13,
              height: isVerySmall ? 42 : 46,
            },
          ]}
        />

        <TouchableOpacity
          style={[s.searchBtn, { height: isVerySmall ? 42 : 46 }]}
          onPress={onSearchFirst}
          activeOpacity={0.88}
        >
          <Text style={[s.searchBtnText, isVerySmall && { fontSize: 11.5 }]}>
            Find
          </Text>
        </TouchableOpacity>
      </View>

      {!isSmall && (
        <View style={s.leiaBanner}>
          <View style={s.leiaText}>
            <Text style={s.leiaName}>Leia:</Text>
            <Text style={s.leiaDesc}>
              I've marked all the places worth seeing on the map. Tap any pin to open details or search for a place above.
            </Text>
          </View>
          <Image
            source={require('../../assets/onboarding_5.png')}
            style={s.leiaImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View
        style={[
          s.mapContainer,
          {
            marginHorizontal: isVerySmall ? 12 : 16,
            marginBottom: isVerySmall ? 92 : isSmall ? 104 : 112,
            borderRadius: isVerySmall ? 14 : 16,
          },
        ]}
      >
        <MapView
          ref={mapRef}
          style={s.map}
          initialRegion={INITIAL_REGION}
          onPress={() => {
            if (selected) hideCard();
          }}
        >
          {filteredLocations.map(loc => (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.lat, longitude: loc.lng }}
              pinColor={activeId === loc.id ? '#7C3AED' : '#F5C518'}
              onPress={e => {
                e.stopPropagation();
                showCard(loc);
              }}
            />
          ))}
        </MapView>

        <View
          style={[
            s.controls,
            {
              right: isVerySmall ? 8 : 10,
              top: isVerySmall ? 8 : 10,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              s.controlBtn,
              {
                width: isVerySmall ? 32 : isSmall ? 34 : 40,
                height: isVerySmall ? 32 : isSmall ? 34 : 40,
              },
            ]}
            onPress={zoomIn}
          >
            <Text style={[s.controlText, { fontSize: isVerySmall ? 15 : isSmall ? 16 : 20 }]}>
              +
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              s.controlBtn,
              {
                width: isVerySmall ? 32 : isSmall ? 34 : 40,
                height: isVerySmall ? 32 : isSmall ? 34 : 40,
              },
            ]}
            onPress={zoomOut}
          >
            <Text style={[s.controlText, { fontSize: isVerySmall ? 15 : isSmall ? 16 : 20 }]}>
              −
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              s.controlBtn,
              {
                width: isVerySmall ? 32 : isSmall ? 34 : 40,
                height: isVerySmall ? 32 : isSmall ? 34 : 40,
              },
            ]}
            onPress={fitAll}
          >
            <Text style={[s.controlText, { fontSize: isVerySmall ? 15 : isSmall ? 16 : 18 }]}>
              ⊙
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              s.controlBtn,
              {
                width: isVerySmall ? 32 : isSmall ? 34 : 40,
                height: isVerySmall ? 32 : isSmall ? 34 : 40,
              },
            ]}
            onPress={resetMap}
          >
            <Text style={[s.controlText, { fontSize: isVerySmall ? 12 : isSmall ? 13 : 14 }]}>
              ↺
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={selected !== null}
        transparent
        animationType="none"
        onRequestClose={hideCard}
      >
        <TouchableOpacity
          style={[
            s.modalOverlay,
            { paddingHorizontal: isVerySmall ? 16 : 24 },
          ]}
          activeOpacity={1}
          onPress={hideCard}
        >
          <Animated.View
            style={[
              s.card,
              {
                maxWidth: isVerySmall ? 340 : 380,
                opacity: cardAnim,
                transform: [{ scale: cardScale }, { translateY: cardTranslateY }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <TouchableOpacity style={s.cardClose} onPress={hideCard}>
                <Text style={s.cardCloseText}>✕</Text>
              </TouchableOpacity>

              {selected && (
                <>
                  <Image
                    source={selected.image}
                    style={[
                      s.cardImage,
                      { height: isVerySmall ? 128 : isSmall ? 140 : 180 },
                    ]}
                  />

                  <View
                    style={[
                      s.cardBody,
                      {
                        padding: isVerySmall ? 12 : isSmall ? 14 : 16,
                        gap: isVerySmall ? 6 : isSmall ? 7 : 9,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        s.cardTitle,
                        { fontSize: isVerySmall ? 13 : isSmall ? 14 : 16 },
                      ]}
                      numberOfLines={1}
                    >
                      {selected.title}
                    </Text>

                    <Text
                      style={[
                        s.cardCoords,
                        { fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 12 },
                      ]}
                    >
                      📍 {selected.lat}, {selected.lng}
                    </Text>

                    <Text
                      style={[
                        s.cardDesc,
                        {
                          fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                          lineHeight: isVerySmall ? 15 : isSmall ? 16 : 19,
                        },
                      ]}
                      numberOfLines={3}
                    >
                      {selected.description}
                    </Text>

                    <View style={[s.cardBtnRow, { gap: isVerySmall ? 8 : 10 }]}>
                      <TouchableOpacity
                        style={s.secondaryBtn}
                        onPress={onShare}
                        activeOpacity={0.88}
                      >
                        <Text style={[s.secondaryBtnText, isVerySmall && { fontSize: 11 }]}>
                          Share
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={s.secondaryBtn}
                        onPress={onOpenInMaps}
                        activeOpacity={0.88}
                      >
                        <Text style={[s.secondaryBtnText, isVerySmall && { fontSize: 11 }]}>
                          Route
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={[
                        s.openBtn,
                        {
                          paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 14,
                          marginTop: isVerySmall ? 2 : 4,
                        },
                      ]}
                      onPress={() => {
                        const currentSelected = selected;
                        hideCard();
                        navigation.navigate('Locations', {
                          screen: 'LocationDetail',
                          params: { location: currentSelected },
                        });
                      }}
                    >
                      <Text
                        style={[
                          s.openBtnText,
                          { fontSize: isVerySmall ? 11.5 : isSmall ? 12 : 14 },
                        ]}
                      >
                        Open more
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    backgroundColor: '#0F2744',
    borderWidth: 1,
    borderColor: '#1E3A5F',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 14,
  },

  searchBtn: {
    minWidth: 84,
    backgroundColor: '#F5C518',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },

  searchBtnText: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  leiaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2744',
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },

  leiaText: {
    flex: 1,
  },

  leiaName: {
    color: '#F5C518',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },

  leiaDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 16,
  },

  leiaImage: {
    width: 60,
    height: 70,
    borderRadius: 10,
  },

  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },

  map: {
    flex: 1,
  },

  controls: {
    position: 'absolute',
    gap: 6,
  },

  controlBtn: {
    backgroundColor: '#0D1B2A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },

  controlText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: '#0F2744',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },

  cardClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardCloseText: {
    color: '#FFFFFF',
    fontSize: 13,
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

  cardBtnRow: {
    flexDirection: 'row',
    width: '100%',
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },

  secondaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  openBtn: {
    backgroundColor: '#F5C518',
    borderRadius: 12,
    alignItems: 'center',
  },

  openBtnText: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});