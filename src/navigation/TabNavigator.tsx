import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationsStack from './LocationsStack';
import QuizStack from './QuizStack';
import MapScreen from '../screens/tabs/MapsScreen';
import SavedPlacesScreen from '../screens/tabs/SavedsPlacesScreen';
import FactsScreen from '../screens/tabs/FactsScreen';
import BlogScreen from '../screens/tabs/BlogesScreen';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, any> = {
  Locations: require('../assets/icons/tab_locations.png'),
  Map: require('../assets/icons/tab_map.png'),
  Saved: require('../assets/icons/tab_saved.png'),
  Facts: require('../assets/icons/tab_facts.png'),
  Blog: require('../assets/icons/tab_blog.png'),
  Quiz: require('../assets/icons/tab_quiz.png'),
};

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <View style={[s.iconWrap, focused && s.iconWrapActive]}>
      <Image
        source={ICONS[name]}
        style={[s.icon, focused && s.iconActive]}
        resizeMode="contain"
      />
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarLabel: () => null,
        tabBarStyle: s.tabBar,
        tabBarItemStyle: s.tabItem,
      })}
    >
      <Tab.Screen name="Locations" component={LocationsStack} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Saved" component={SavedPlacesScreen} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Quiz" component={QuizStack} />
    </Tab.Navigator>
  );
}

const TAB_HEIGHT = 58;

const s = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: Platform.OS === 'android' ? 50 : 20,
    height: TAB_HEIGHT,
    backgroundColor: '#0D1B2A',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#1E3A5F',
    paddingTop: 0,
    paddingBottom: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },

  tabItem: {
    height: TAB_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 0,
    marginHorizontal: -4,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  iconWrapActive: {
    borderColor: '#F5C518',
    backgroundColor: 'rgba(245,197,24,0.08)',
  },

  icon: {
    width: 21,
    height: 21,
    tintColor: '#475569',
  },

  iconActive: {
    tintColor: '#F5C518',
  },
});