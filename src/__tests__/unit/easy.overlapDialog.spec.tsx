import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { OverlapDialog } from '../../components/OverlapDialog';
import { Event, EventForm } from '../../types';

describe('OverlapDialog 컴포넌트 테스트', () => {
  const cancelRef: React.RefObject<HTMLButtonElement> = React.createRef<HTMLButtonElement>();
  const setIsOverlapDialogOpen: React.Dispatch<React.SetStateAction<boolean>> = vi.fn();
  const saveEvent: (eventData: Event | EventForm) => Promise<void> = vi.fn();
  const overlappingEvents: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2024-11-01',
      startTime: '10:00',
      endTime: '11:00',
      description: 'description',
      location: 'location',
      category: 'category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    },
  ];

  const renderOverlapDialog = () => {
    const defaultProps = {
      isOverlapDialogOpen: true,
      cancelRef,
      setIsOverlapDialogOpen,
      overlappingEvents,
      saveEvent,
    };

    return {
      ...render(
        <ChakraProvider>
          <OverlapDialog props={defaultProps} />
        </ChakraProvider>
      ),
    };
  };

  it('OverlapDialog가 정상적으로 렌더링된다', () => {
    renderOverlapDialog();

    expect(screen.getByText('일정 겹침 경고')).toBeInTheDocument();

    overlappingEvents.forEach((event) =>
      expect(
        screen.getByText(`${event.title} (${event.date} ${event.startTime}-${event.endTime})`)
      ).toBeInTheDocument()
    );
  });
});
