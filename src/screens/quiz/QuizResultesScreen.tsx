import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Share,
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

export default function QuizResultScreen({ navigation, route }: any) {
  const { score, total } = route.params;
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const percent = useMemo(() => {
    if (!total || total <= 0) return 0;
    return Math.round((score / total) * 100);
  }, [score, total]);

  const resultMeta = useMemo(() => {
    if (percent >= 90) {
      return {
        title: 'Excellent result',
        subtitle: 'You know this topic very well.',
      };
    }

    if (percent >= 70) {
      return {
        title: 'Great progress',
        subtitle: 'You have a strong result and good understanding.',
      };
    }

    if (percent >= 50) {
      return {
        title: 'Good attempt',
        subtitle: 'You completed the quiz and can improve even more.',
      };
    }

    return {
      title: 'Keep going',
      subtitle: 'Try again and strengthen your knowledge step by step.',
    };
  }, [percent]);

  const onShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score}/${total} (${percent}%) in the Northern Vibe Quiz!`,
      });
    } catch {}
  };

  const cardPadding = isVerySmall ? 14 : isSmall ? 16 : 24;
  const mainRadius = isVerySmall ? 16 : 20;
  const buttonRadius = isVerySmall ? 12 : 14;
  const buttonVertical = isVerySmall ? 11 : isSmall ? 12 : 16;

  return (
    <SafeAreaView style={s.container}>
      <View
        style={[
          s.headerWrap,
          {
            paddingTop: (isVerySmall ? 8 : isSmall ? 10 : 14) + topInset,
            paddingBottom: isVerySmall ? 8 : isSmall ? 10 : 14,
            paddingHorizontal: isVerySmall ? 12 : 16,
          },
        ]}
      >
        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 12.5 : isSmall ? 13.5 : 17,
              paddingHorizontal: isVerySmall ? 18 : isSmall ? 20 : 28,
              paddingVertical: isVerySmall ? 7 : isSmall ? 8 : 10,
            },
          ]}
          numberOfLines={2}
        >
          Northern Vibe Quiz
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.scrollContent,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingBottom: isVerySmall ? 30 : 40,
            paddingTop: isVerySmall ? 6 : 10,
          },
        ]}
      >
        <View
          style={[
            s.card,
            {
              borderRadius: mainRadius,
              padding: cardPadding,
              marginBottom: isVerySmall ? 40 : 56,
              gap: isVerySmall ? 8 : isSmall ? 10 : 14,
            },
          ]}
        >
          <Text
            style={[
              s.resultsLabel,
              {
                fontSize: isVerySmall ? 18 : isSmall ? 21 : 26,
              },
            ]}
          >
            Results
          </Text>

          <View style={s.scoreBox}>
            <Text
              style={[
                s.scoreMain,
                {
                  fontSize: isVerySmall ? 24 : isSmall ? 28 : 36,
                },
              ]}
            >
              {score}/{total}
            </Text>

            <Text
              style={[
                s.scorePercent,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              {percent}% correct
            </Text>
          </View>

          <Text
            style={[
              s.resultTitle,
              {
                fontSize: isVerySmall ? 14 : isSmall ? 15 : 18,
              },
            ]}
          >
            {resultMeta.title}
          </Text>

          <Text
            style={[
              s.scoreLabel,
              {
                fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
              },
            ]}
          >
            Correct answers: <Text style={s.scoreNumber}>{score}/{total}</Text>
          </Text>

          <Text
            style={[
              s.desc,
              {
                fontSize: isVerySmall ? 11 : isSmall ? 12 : 13,
                lineHeight: isVerySmall ? 17 : isSmall ? 18 : 20,
              },
            ]}
          >
            {resultMeta.subtitle} You can repeat the quiz to improve the result or return to the main sections and continue exploring the content.
          </Text>

          <Image
            source={require('../../assets/onboarding_5.png')}
            style={[
              s.resultImage,
              {
                width: isVerySmall ? 100 : isSmall ? 124 : 160,
                height: isVerySmall ? 100 : isSmall ? 124 : 160,
                marginVertical: isVerySmall ? 2 : 4,
              },
            ]}
            resizeMode="contain"
          />

          <View style={[s.progressTrack, { borderRadius: 999 }]}>
            <View
              style={[
                s.progressFill,
                {
                  width: `${percent}%`,
                  borderRadius: 999,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[
              s.btnYellow,
              {
                borderRadius: buttonRadius,
                paddingVertical: buttonVertical,
              },
            ]}
            activeOpacity={0.88}
            onPress={() => navigation.replace('QuizMain')}
          >
            <Text
              style={[
                s.btnYellowText,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              Try again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              s.btnPurple,
              {
                borderRadius: buttonRadius,
                paddingVertical: buttonVertical,
              },
            ]}
            activeOpacity={0.88}
            onPress={onShare}
          >
            <Text
              style={[
                s.btnPurpleText,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              s.btnOutline,
              {
                borderRadius: buttonRadius,
                paddingVertical: isVerySmall ? 10 : isSmall ? 11 : 14,
              },
            ]}
            activeOpacity={0.88}
            onPress={() => navigation.navigate('Locations')}
          >
            <Text
              style={[
                s.btnOutlineText,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              Back to places
            </Text>
          </TouchableOpacity>
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
    textAlign: 'center',
  },

  scrollContent: {
    flexGrow: 1,
  },

  card: {
    backgroundColor: '#4A0E35',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#6B1D4D',
  },

  resultsLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },

  scoreBox: {
    alignItems: 'center',
    gap: 4,
  },

  scoreMain: {
    color: '#F5C518',
    fontWeight: '800',
    textAlign: 'center',
  },

  scorePercent: {
    color: '#F3D7E5',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },

  resultTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },

  scoreLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },

  scoreNumber: {
    color: '#F5C518',
  },

  desc: {
    color: '#E2C4D8',
    textAlign: 'center',
  },

  resultImage: {},

  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#F5C518',
  },

  btnYellow: {
    backgroundColor: '#F5C518',
    alignItems: 'center',
    width: '100%',
  },

  btnYellowText: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  btnPurple: {
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    width: '100%',
  },

  btnPurpleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  btnOutline: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C084FC',
    backgroundColor: 'transparent',
  },

  btnOutlineText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});