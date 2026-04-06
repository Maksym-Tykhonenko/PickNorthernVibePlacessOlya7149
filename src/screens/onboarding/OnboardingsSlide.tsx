import React, { useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  ImageSourcePropType,
  Platform,
  useWindowDimensions,
} from 'react-native';

type Props = {
  step: number;
  total: number;
  title: string;
  description: string;
  buttonLabel: string;
  image: ImageSourcePropType;
  onPress: () => void;
  onSkip: () => void;
};

export default function OnboardingSlide({
  step,
  total,
  title,
  description,
  buttonLabel,
  image,
  onPress,
  onSkip,
}: Props) {
  const { height, width } = useWindowDimensions();

  const isAndroid = Platform.OS === 'android';
  const isVerySmall = height < 700;
  const isSmall = height < 780;
  const isLastStep = step === total;

  const ui = useMemo(() => {
    return {
      titleTop: isAndroid ? (isVerySmall ? 34 : 46) : isVerySmall ? 10 : 18,
      imageHeight: isVerySmall ? height * 0.32 : isSmall ? height * 0.36 : height * 0.4,
      imageWidth: Math.min(width * 0.78, 360),
      cardMarginBottom: isAndroid ? (isVerySmall ? 34 : 52) : isVerySmall ? 18 : 28,
      cardPadding: isVerySmall ? 16 : 20,
      descSize: isVerySmall ? 12.5 : 13.5,
      descLine: isVerySmall ? 18 : 21,
      titleSize: isVerySmall ? 15 : 17,
      buttonHeight: isVerySmall ? 52 : 56,
      buttonText: isVerySmall ? 14 : 15,
      sidePadding: isVerySmall ? 14 : 16,
    };
  }, [height, width, isAndroid, isVerySmall, isSmall]);

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />

      <SafeAreaView style={s.safe}>
        <View
          style={[
            s.content,
            {
              paddingHorizontal: ui.sidePadding,
            },
          ]}
        >
          <View
            style={[
              s.titleWrap,
              {
                marginTop: ui.titleTop,
                paddingHorizontal: isVerySmall ? 20 : 24,
                paddingVertical: isVerySmall ? 9 : 10,
              },
            ]}
          >
            <Text
              style={[
                s.title,
                {
                  fontSize: ui.titleSize,
                },
              ]}
              numberOfLines={2}
            >
              {title}
            </Text>
          </View>

          <View
            style={[
              s.imageWrap,
              isAndroid && {
                paddingTop: isVerySmall ? 12 : 22,
              },
            ]}
          >
            <Image
              source={image}
              style={{
                width: ui.imageWidth,
                height: ui.imageHeight,
              }}
              resizeMode="contain"
            />
          </View>

          <View
            style={[
              s.card,
              {
                marginBottom: ui.cardMarginBottom,
                padding: ui.cardPadding,
                borderRadius: isVerySmall ? 18 : 20,
              },
            ]}
          >
            <Text
              style={[
                s.desc,
                {
                  fontSize: ui.descSize,
                  lineHeight: ui.descLine,
                },
              ]}
            >
              {description}
            </Text>

            <View style={s.dots}>
              {Array.from({ length: total }).map((_, index) => {
                const active = index + 1 === step;

                return (
                  <View
                    key={index}
                    style={[
                      s.dot,
                      active && s.dotActive,
                      isVerySmall && !active && { width: 7, height: 7, borderRadius: 3.5 },
                    ]}
                  />
                );
              })}
            </View>

            <View style={s.row}>
              <Pressable
                style={({ pressed }) => [
                  s.btn,
                  {
                    minHeight: ui.buttonHeight,
                    opacity: pressed ? 0.88 : 1,
                    transform: [{ scale: pressed ? 0.985 : 1 }],
                  },
                ]}
                onPress={onPress}
              >
                <Text
                  style={[
                    s.btnText,
                    {
                      fontSize: ui.buttonText,
                    },
                  ]}
                >
                  {buttonLabel}
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  s.skipWrap,
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
                onPress={onSkip}
              >
                <Text style={[s.skip, isVerySmall && { fontSize: 14 }]}>
                  {isLastStep ? 'DONE' : 'SKIP'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.58)',
  },

  safe: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  titleWrap: {
    alignSelf: 'center',
    backgroundColor: '#000000',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#333333',
    maxWidth: '92%',
  },

  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  imageWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: 'rgba(13, 27, 62, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 16,
  },

  desc: {
    color: '#D1D5DB',
    textAlign: 'center',
    fontWeight: '400',
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#334155',
  },

  dotActive: {
    width: 24,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#F5C518',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  btn: {
    flex: 1,
    backgroundColor: '#F5C518',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },

  btnText: {
    color: '#000000',
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  skipWrap: {
    minWidth: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },

  skip: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});