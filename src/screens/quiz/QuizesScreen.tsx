import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { QUIZ_QUESTIONS } from '../../data/quiz';

const LABELS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ navigation }: any) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const question = QUIZ_QUESTIONS[current];
  const total = QUIZ_QUESTIONS.length;

  const progressPercent = useMemo(() => {
    return ((current + 1) / total) * 100;
  }, [current, total]);

  const isAnswerCorrect = selected === question.correct;

  const onSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
  };

  const onNext = () => {
    if (selected === null) return;

    const nextScore = isAnswerCorrect ? score + 1 : score;

    if (current + 1 >= total) {
      navigation.replace('QuizResult', {
        score: nextScore,
        total,
      });
      return;
    }

    setScore(nextScore);
    setCurrent((prev) => prev + 1);
    setSelected(null);
  };

  const onRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
  };

  const getOptionContainerStyle = (index: number) => {
    if (selected === null) return s.optionDefault;
    if (index === question.correct) return s.optionCorrect;
    if (index === selected && index !== question.correct) return s.optionWrong;
    return s.optionMuted;
  };

  const getOptionTextStyle = (index: number) => {
    if (selected === null) return s.optionTextDefault;
    if (index === question.correct) return s.optionTextLight;
    if (index === selected && index !== question.correct) return s.optionTextLight;
    return s.optionTextMuted;
  };

  const feedbackTitle =
    selected === null
      ? ''
      : isAnswerCorrect
      ? 'Correct answer'
      : 'Wrong answer';

  const feedbackText =
    selected === null
      ? ''
      : isAnswerCorrect
      ? 'Great choice. You selected the right option.'
      : `The correct answer is ${LABELS[question.correct]}.`;

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
        <TouchableOpacity
          style={s.backBtn}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <Text style={[s.backBtnText, isVerySmall && { fontSize: 18 }]}>←</Text>
        </TouchableOpacity>

        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 12.5 : isSmall ? 13 : 17,
              paddingHorizontal: isVerySmall ? 18 : isSmall ? 20 : 28,
              paddingVertical: isVerySmall ? 7 : isSmall ? 8 : 10,
            },
          ]}
          numberOfLines={1}
        >
          Northern Vibe Quiz
        </Text>

        <TouchableOpacity
          style={s.restartBtn}
          activeOpacity={0.85}
          onPress={onRestart}
        >
          <Text style={[s.restartBtnText, isVerySmall && { fontSize: 10.5 }]}>
            Restart
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.scroll,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingTop: isVerySmall ? 12 : 16,
            paddingBottom: isVerySmall ? 120 : 140,
            gap: isVerySmall ? 10 : 14,
          },
        ]}
      >
        <View
          style={[
            s.progressWrap,
            {
              borderRadius: isVerySmall ? 12 : 14,
              padding: isVerySmall ? 10 : 12,
            },
          ]}
        >
          <View style={s.progressTopRow}>
            <Text style={[s.progressLabel, isVerySmall && { fontSize: 11 }]}>
              Question {current + 1} of {total}
            </Text>
            <Text style={[s.progressLabel, isVerySmall && { fontSize: 11 }]}>
              {Math.round(progressPercent)}%
            </Text>
          </View>

          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        <View
          style={[
            s.leiaBanner,
            {
              borderRadius: isVerySmall ? 14 : 16,
              padding: isVerySmall ? 10 : 14,
              gap: isVerySmall ? 8 : 10,
            },
          ]}
        >
          <View style={s.leiaText}>
            <Text
              style={[
                s.leiaName,
                { fontSize: isVerySmall ? 11.5 : isSmall ? 12 : 14 },
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
              Here are 20 questions about places in Canada. Choose the best answer
              and see how well you know the locations.
            </Text>
          </View>

          <Image
            source={require('../../assets/onboarding_5.png')}
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

        <View
          style={[
            s.questionCard,
            {
              borderRadius: isVerySmall ? 14 : 16,
              padding: isVerySmall ? 12 : isSmall ? 14 : 18,
              gap: isVerySmall ? 6 : isSmall ? 7 : 10,
            },
          ]}
        >
          <Text
            style={[
              s.questionNum,
              {
                fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
              },
            ]}
          >
            Question {current + 1}/{total}
          </Text>

          <Text
            style={[
              s.questionText,
              {
                fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
                lineHeight: isVerySmall ? 16 : isSmall ? 18 : 22,
              },
            ]}
          >
            {question.question}
          </Text>
        </View>

        <View style={[s.options, { gap: isVerySmall ? 7 : isSmall ? 8 : 10 }]}>
          {question.options.map((option: string, index: number) => {
            const locked = selected !== null;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  s.option,
                  getOptionContainerStyle(index),
                  {
                    borderRadius: isVerySmall ? 12 : 14,
                    padding: isVerySmall ? 11 : isSmall ? 12 : 16,
                    opacity: locked && index !== selected && index !== question.correct ? 0.72 : 1,
                  },
                ]}
                activeOpacity={0.85}
                disabled={locked}
                onPress={() => onSelect(index)}
              >
                <Text
                  style={[
                    s.optionText,
                    getOptionTextStyle(index),
                    {
                      fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                    },
                  ]}
                >
                  {LABELS[index]}. {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selected !== null && (
          <View
            style={[
              s.feedbackCard,
              isAnswerCorrect ? s.feedbackCardSuccess : s.feedbackCardError,
              {
                borderRadius: isVerySmall ? 12 : 14,
                padding: isVerySmall ? 12 : 14,
                gap: 4,
              },
            ]}
          >
            <Text
              style={[
                s.feedbackTitle,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              {feedbackTitle}
            </Text>

            <Text
              style={[
                s.feedbackText,
                {
                  fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                  lineHeight: isVerySmall ? 15 : isSmall ? 16 : 18,
                },
              ]}
            >
              {feedbackText}
            </Text>
          </View>
        )}

        {selected !== null && (
          <TouchableOpacity
            style={[
              s.nextBtn,
              {
                borderRadius: isVerySmall ? 12 : 14,
                paddingVertical: isVerySmall ? 11 : isSmall ? 12 : 16,
                marginTop: isVerySmall ? 2 : isSmall ? 4 : 6,
              },
            ]}
            activeOpacity={0.88}
            onPress={onNext}
          >
            <Text
              style={[
                s.nextBtnText,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              {current + 1 >= total ? 'See results' : 'Next question'}
            </Text>
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backBtn: {
    width: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  backBtnText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  restartBtn: {
    width: 56,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  restartBtnText: {
    color: '#F5C518',
    fontSize: 11.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: '#000000',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#333333',
    marginHorizontal: 8,
    overflow: 'hidden',
  },

  scroll: {},

  progressWrap: {
    backgroundColor: '#10253F',
    borderWidth: 1,
    borderColor: '#1E3A5F',
    gap: 8,
  },

  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressLabel: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#203A59',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#F5C518',
    borderRadius: 999,
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

  questionCard: {
    backgroundColor: '#4A0E35',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7A2858',
  },

  questionNum: {
    color: '#F5C518',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  questionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  options: {},

  option: {
    alignItems: 'center',
    borderWidth: 1,
  },

  optionDefault: {
    backgroundColor: '#F5C518',
    borderColor: '#F5C518',
  },

  optionCorrect: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },

  optionWrong: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },

  optionMuted: {
    backgroundColor: '#203449',
    borderColor: '#2E4861',
  },

  optionText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  optionTextDefault: {
    color: '#000000',
  },

  optionTextLight: {
    color: '#FFFFFF',
  },

  optionTextMuted: {
    color: '#B6C2CF',
  },

  feedbackCard: {
    borderWidth: 1,
  },

  feedbackCardSuccess: {
    backgroundColor: 'rgba(22,163,74,0.16)',
    borderColor: '#16A34A',
  },

  feedbackCardError: {
    backgroundColor: 'rgba(220,38,38,0.16)',
    borderColor: '#DC2626',
  },

  feedbackTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  feedbackText: {
    color: '#E2E8F0',
    fontWeight: '500',
  },

  nextBtn: {
    backgroundColor: '#F5C518',
    alignItems: 'center',
  },

  nextBtnText: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});