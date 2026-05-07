import { useMemo } from 'react';
import type { TimerPhase, ThemeColors } from '../types';

const lightThemes: Record<TimerPhase, ThemeColors> = {
  idle: { text: '#FFF', border: '#F05B56', bg: '#F05B56', muted: '#F26C67' },
  working: { text: '#FFF', border: '#F05B56', bg: '#FF4A77', muted: '#CF6679' },
  break: { text: '#333333', border: '#3E7476', bg: '#6ED4BF', muted: '#8CD1C3' },
  complete: { text: '#424242', border: '#00A97F', bg: '#15D6A6', muted: '#00D09C' },
};

const darkThemes: Record<TimerPhase, ThemeColors> = {
  idle: { text: '#BB86FC', border: '#121212', bg: '#121212', muted: '#333333' },
  working: { text: '#6200EE', border: '#121212', bg: '#121212', muted: '#333333' },
  break: { text: '#03DAC5', border: '#121212', bg: '#121212', muted: '#333333' },
  complete: { text: '#CF6679', border: '#FF0266', bg: '#251A1C', muted: '#333333' },
};

export function useTheme(isDark: boolean, phase: TimerPhase): ThemeColors {
  return useMemo(() => {
    return isDark ? darkThemes[phase] : lightThemes[phase];
  }, [isDark, phase]);
}
