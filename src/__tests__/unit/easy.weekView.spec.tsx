import { ChakraProvider } from '@chakra-ui/icons';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { WeekView } from '../../components/WeekView';
import { Event } from '../../types';

describe('WeekView 컴포넌트 테스트', () => {
  const renderWeekView = () => {
    const defaultProps = {
      currentDate: new Date('2024-11-01'),
      filteredEvents: [
        {
          id: '1',
          title: '이벤트 1',
          date: '2024-11-01',
        },
        {
          id: '2',
          title: '이벤트 2',
          date: '2024-11-02',
        },
      ] as Event[],
      notifiedEvents: ['1'],
    };

    return {
      ...render(
        <ChakraProvider>
          <WeekView props={defaultProps} />
        </ChakraProvider>
      ),
    };
  };

  it('WeekView 컴포넌트가 렌더링되어야 한다', () => {
    renderWeekView();

    expect(screen.getByText('2024년 10월 5주')).toBeInTheDocument();
  });

  it('주어진 날짜에 맞게 날짜가 표시되어야 한다', () => {
    renderWeekView();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('이벤트가 올바르게 렌더링되어야 한다', () => {
    renderWeekView();

    const event1 = screen.getByText('이벤트 1');
    const event2 = screen.getByText('이벤트 2');

    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });
});
