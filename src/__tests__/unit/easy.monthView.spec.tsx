import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { MonthView } from '../../components/MonthView';
import { Event } from '../../types';

describe('MonthView 컴포넌트 테스트', () => {
  const renderMonthView = () => {
    const defaultProps = {
      currentDate: new Date('2024-11-01'),
      holidays: {
        '2024-11-01': '한글날',
      },
      filteredEvents: [
        {
          id: '1',
          title: '이벤트 1',
          date: '2024-11-01',
        },
        {
          id: '2',
          title: '이벤트 2',
          date: '2024-11-01',
        },
      ] as Event[],
      notifiedEvents: ['1'],
    };

    return {
      ...render(
        <ChakraProvider>
          <MonthView props={defaultProps} />
        </ChakraProvider>
      ),
    };
  };

  it('MonthView 컴포넌트가 렌더링되어야 한다', () => {
    renderMonthView();

    expect(screen.getByText('2024년 11월')).toBeInTheDocument();
  });

  it('주어진 날짜에 맞게 공휴일이 표시되어야 한다', () => {
    renderMonthView();

    const holidayText = screen.getByText('한글날');
    expect(holidayText).toBeInTheDocument();
  });

  it('해당 월에 존재하는 이벤트가 올바르게 렌더링되어야 한다', () => {
    renderMonthView();

    const event1 = screen.getByText('이벤트 1');
    const event2 = screen.getByText('이벤트 2');

    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });
});
