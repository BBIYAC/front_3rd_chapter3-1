import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Select, VStack } from '@chakra-ui/react';
import React from 'react';

import { IMonthView, MonthView } from './MonthView';
import { IWeekView, WeekView } from './WeekView';
import { Event } from '../types';

export interface ICalendarView {
  currentDate: Date;
  holidays: {
    [key: string]: string;
  };
  filteredEvents: Event[];
  notifiedEvents: string[];
  navigate: (direction: 'prev' | 'next') => void;
  view: 'week' | 'month';
  setView: React.Dispatch<React.SetStateAction<'week' | 'month'>>;
}

interface ICalendarViewProps {
  props: ICalendarView;
}

export function CalendarView({
  props: { currentDate, holidays, filteredEvents, notifiedEvents, navigate, view, setView },
}: ICalendarViewProps) {
  const weekViewProps: IWeekView = {
    currentDate,
    filteredEvents,
    notifiedEvents,
  };

  const monthViewProps: IMonthView = {
    currentDate,
    holidays,
    filteredEvents,
    notifiedEvents,
  };

  return (
    <VStack flex={1} spacing={5} align="stretch">
      <Heading>일정 보기</Heading>

      <HStack mx="auto" justifyContent="space-between">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate('prev')}
        />
        <Select
          aria-label="view"
          value={view}
          onChange={(e) => setView(e.target.value as 'week' | 'month')}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Select>
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={() => navigate('next')}
        />
      </HStack>

      {view === 'week' && <WeekView props={weekViewProps} />}
      {view === 'month' && <MonthView props={monthViewProps} />}
    </VStack>
  );
}
