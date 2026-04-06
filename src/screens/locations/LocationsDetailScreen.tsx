import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Share,
  Platform,
  useWindowDimensions,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location } from '../../data/locations';
import { useSaved } from '../../context/SavedContext';

export default function LocationDetailScreen({ navigation, route }: any) {
  const location: Location = route.params.location;

  const { toggleSaved, isSaved } = useSaved();
  const saved = isSaved(location.id);

  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<MapView>(null);

  const { height } = useWindowDimensions();
  const isVerySmall = height < 700;
  const isSmall = height < 780;
  const topInset = Platform.OS === 'android' ? 20 : 0;



  const onShare = async () => {
    try {
      await Share.share({
        message: `${location.title}\n\nLocation: ${location.lat}, ${location.lng}\n\n${location.description}`,
      });
    } catch {}
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    Linking.openURL(url);
  };

  const toggleMap = () => {
    setShowMap(prev => !prev);

    setTimeout(() => {
      mapRef.current?.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }, 600);
    }, 200);
  };



  return (
    <SafeAreaView style={s.container}>
      

      <View style={[s.header, { paddingTop: 12 + topInset }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={s.titleWrap}>
          <Text style={s.title}>{location.title}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        

        <Image
          source={location.image}
          style={[
            s.image,
            { height: isVerySmall ? 200 : isSmall ? 220 : 240 }
          ]}
        />

        <View style={[s.body, { padding: isVerySmall ? 14 : 18 }]}>

          <Text style={s.coords}>
            📍 {location.lat}, {location.lng}
          </Text>

          <Text style={s.desc}>
            {location.description}
          </Text>

          <View style={s.actions}>

            <TouchableOpacity style={s.mainBtn} onPress={onShare}>
              <Text style={s.mainBtnText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.iconBtn} onPress={toggleMap}>
              <Text style={s.icon}>🗺️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.iconBtn, saved && s.savedActive]}
              onPress={() => toggleSaved(location)}
            >
              <Text style={s.icon}>{saved ? '🔖' : '📌'}</Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity style={s.routeBtn} onPress={openInMaps}>
            <Text style={s.routeText}>Open in Maps</Text>
          </TouchableOpacity>

  
          {saved && (
            <View style={s.savedBadge}>
              <Text style={s.savedText}>Saved</Text>
            </View>
          )}

          {showMap && (
            <View style={s.mapWrap}>
              <MapView
                ref={mapRef}
                style={s.map}
                initialRegion={{
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5,
                }}
              >
                <Marker coordinate={{ latitude: location.lat, longitude: location.lng }} />
              </MapView>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  backBtn: {
    marginRight: 10,
  },

  backArrow: {
    color: '#fff',
    fontSize: 22,
  },

  titleWrap: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 8,
  },

  title: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },

  image: {
    width: '100%',
  },

  body: {
    gap: 16,
  },

  coords: {
    color: '#F5C518',
    fontWeight: '600',
  },

  desc: {
    color: '#CBD5E1',
    lineHeight: 22,
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
  },

  mainBtn: {
    flex: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  mainBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  iconBtn: {
    backgroundColor: '#0F2744',
    padding: 14,
    borderRadius: 12,
  },

  icon: {
    fontSize: 18,
  },

  savedActive: {
    borderColor: '#F5C518',
    borderWidth: 1,
  },

  routeBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  routeText: {
    color: '#fff',
    fontWeight: '600',
  },

  savedBadge: {
    backgroundColor: '#14532d',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  savedText: {
    color: '#4ade80',
    fontWeight: '600',
  },

  mapWrap: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
  },

  map: {
    flex: 1,
  },
});