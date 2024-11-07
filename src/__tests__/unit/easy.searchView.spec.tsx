import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { SearchView } from '../../components/SearchView';
import { Event } from '../../types';

describe('SearchView 컴포넌트 테스트', () => {
  const filteredEvents: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2024-11-01',
      startTime: '10:00',
      endTime: '11:00',
      description: 'Description of Event 1',
      location: 'Location 1',
      category: 'Category 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 1,
    },
    {
      id: '2',
      title: 'Event 2',
      date: '2024-11-02',
      startTime: '12:00',
      endTime: '13:00',
      description: 'Description of Event 2',
      location: 'Location 2',
      category: 'Category 2',
      repeat: { type: 'daily', interval: 1 },
      notificationTime: 60,
    },
  ];

  const notifiedEvents = ['1'];
  const searchTerm = '';
  const setSearchTerm = vi.fn();
  const editEvent = vi.fn();
  const deleteEvent = vi.fn();

  const defaultProps = {
    filteredEvents,
    notifiedEvents,
    searchTerm,
    setSearchTerm,
    editEvent,
    deleteEvent,
  };
  const renderSearchView = (props = defaultProps) => {
    return {
      ...render(
        <ChakraProvider>
          <SearchView {...{ props }} />
        </ChakraProvider>
      ),
    };
  };

  it('SearchView 컴포넌트가 정상적으로 렌더링된다', () => {
    renderSearchView();

    expect(screen.getByLabelText('일정 검색')).toBeInTheDocument();

    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('2024-11-01')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('2024-11-02')).toBeInTheDocument();
  });

  it('검색어 입력 시 setSearchTerm 함수가 호출된다', () => {
    renderSearchView();

    const searchInput = screen.getByLabelText('일정 검색');
    fireEvent.change(searchInput, { target: { value: 'Event 1' } });

    expect(setSearchTerm).toHaveBeenCalledWith('Event 1');
  });

  it('삭제 버튼 클릭 시 deleteEvent 함수가 호출된다', async () => {
    renderSearchView();

    const deleteButton = screen.getAllByLabelText('Delete event')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteEvent).toHaveBeenCalledWith('1'));
  });

  it('수정 버튼 클릭 시 editEvent 함수가 호출된다', async () => {
    renderSearchView();

    const editButton = screen.getAllByLabelText('Edit event')[0];
    fireEvent.click(editButton);

    await waitFor(() => expect(editEvent).toHaveBeenCalledWith(filteredEvents[0]));
  });

  it('검색 결과가 없을 때 "검색 결과가 없습니다."가 표시된다', () => {
    const emptyProps = {
      filteredEvents: [],
      notifiedEvents,
      searchTerm,
      setSearchTerm,
      editEvent,
      deleteEvent,
    };

    renderSearchView(emptyProps);

    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
  });
});
