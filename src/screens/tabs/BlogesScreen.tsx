import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { BLOG_POSTS, BlogPost } from '../../data/blog';

export default function BlogScreen() {
  const [index, setIndex] = useState(0);
  const post: BlogPost = BLOG_POSTS[index];

  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const total = BLOG_POSTS.length;

  const progress = useMemo(() => {
    return ((index + 1) / total) * 100;
  }, [index, total]);

  const onNext = () => {
    if (index < total - 1) setIndex(i => i + 1);
  };

  const onPrev = () => {
    if (index > 0) setIndex(i => i - 1);
  };

  const onRestart = () => setIndex(0);

  const onShare = async () => {
    try {
      await Share.share({
        message: `${post.title}\n\n${post.description}\n\n(${index + 1}/${total})`,
      });
    } catch {}
  };

  return (
    <SafeAreaView style={s.container}>

      <View
        style={[
          s.headerWrap,
          { paddingTop: 12 + topInset },
        ]}
      >
        <Text style={s.headerTitle}>Blog</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.scroll,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingBottom: 120,
          },
        ]}
      >
   
        <View style={s.progressWrap}>
          <Text style={s.counterText}>
            {index + 1} / {total}
          </Text>

          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>


        <View style={s.card}>
          <Image
            source={post.image}
            style={[
              s.cardImage,
              { height: isVerySmall ? 160 : isSmall ? 190 : 240 },
            ]}
          />

          <View style={s.cardBody}>
            <Text style={s.cardTitle}>{post.title}</Text>

            <Text style={s.cardDesc}>
              {post.description}
            </Text>
          </View>

          <View style={s.actions}>
            <TouchableOpacity style={s.btnPurple} onPress={onShare}>
              <Text style={s.btnPurpleText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.btnDark, index === 0 && s.disabled]}
              onPress={onPrev}
              disabled={index === 0}
            >
              <Text style={s.btnDarkText}>←</Text>
            </TouchableOpacity>

            {index < total - 1 ? (
              <TouchableOpacity style={s.btnYellow} onPress={onNext}>
                <Text style={s.btnYellowText}>Next →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={s.btnYellow} onPress={onRestart}>
                <Text style={s.btnYellowText}>Restart</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>


        <View style={s.dots}>
          {BLOG_POSTS.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setIndex(i)}>
              <View style={[s.dot, i === index && s.dotActive]} />
            </TouchableOpacity>
          ))}
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

  headerWrap: {
    alignItems: 'center',
    paddingBottom: 10,
  },

  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
  },

  scroll: {
    gap: 16,
  },

  progressWrap: {
    gap: 6,
  },

  counterText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
  },

  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#203A59',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#F5C518',
  },

  card: {
    backgroundColor: '#0F2744',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#183656',
  },

  cardImage: {
    width: '100%',
  },

  cardBody: {
    padding: 16,
    gap: 10,
  },

  cardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  cardDesc: {
    color: '#CBD5E1',
    lineHeight: 20,
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
  },

  btnPurple: {
    flex: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  btnPurpleText: {
    color: '#fff',
    fontWeight: '700',
  },

  btnDark: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  btnDarkText: {
    color: '#94A3B8',
    fontWeight: '700',
  },

  btnYellow: {
    flex: 1,
    backgroundColor: '#F5C518',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  btnYellowText: {
    color: '#000',
    fontWeight: '700',
  },

  disabled: {
    opacity: 0.4,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#334155',
  },

  dotActive: {
    width: 20,
    backgroundColor: '#F5C518',
  },
});