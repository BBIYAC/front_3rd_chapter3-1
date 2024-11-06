import { act, renderHook } from '@testing-library/react';

import { mockEvents } from '../../__mocks__/mockEvents.ts';
import { useSearch } from '../../hooks/useSearch.ts';

it('검색어가 비어있을 때 현재 뷰(월간)에 해당하는 모든 이벤트를 반환해야 한다', () => {
  const testEvents = [...mockEvents];
  const { result } = renderHook(() => useSearch(testEvents, new Date('2024-10-01'), 'month'));

  expect(result.current.searchTerm).toBe('');
  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      title: '점심',
      date: '2024-10-01',
      startTime: '12:00',
      endTime: '13:00',
      description: '점심 약속',
      location: '식당',
      category: '사교',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 10,
    },
    {
      id: '3',
      title: '개발 회의',
      date: '2024-10-08',
      startTime: '14:00',
      endTime: '15:00',
      description: '프로젝트 회의',
      location: '사무실',
      category: '업무',
      repeat: {
        type: 'weekly',
        interval: 1,
      },
      notificationTime: 15,
    },
  ]);
});

it('검색어가 포함된 이벤트만 필터링해야 한다', () => {
  const testEvents = [...mockEvents];
  const { result } = renderHook(() => useSearch(testEvents, new Date('2024-10-01'), 'month'));

  act(() => {
    result.current.setSearchTerm('회의');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '3',
      title: '개발 회의',
      date: '2024-10-08',
      startTime: '14:00',
      endTime: '15:00',
      description: '프로젝트 회의',
      location: '사무실',
      category: '업무',
      repeat: {
        type: 'weekly',
        interval: 1,
      },
      notificationTime: 15,
    },
  ]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const testEvents = [...mockEvents];
  const { result } = renderHook(() => useSearch(testEvents, new Date('2024-10-01'), 'month'));

  act(() => {
    result.current.setSearchTerm('식당');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      title: '점심',
      date: '2024-10-01',
      startTime: '12:00',
      endTime: '13:00',
      description: '점심 약속',
      location: '식당',
      category: '사교',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 10,
    },
  ]);
});

it('현재 뷰(주간)에 해당하는 이벤트만 반환해야 한다', () => {
  const testEvents = [...mockEvents];
  const { result } = renderHook(() => useSearch(testEvents, new Date('2024-10-01'), 'week'));

  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      title: '점심',
      date: '2024-10-01',
      startTime: '12:00',
      endTime: '13:00',
      description: '점심 약속',
      location: '식당',
      category: '사교',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 10,
    },
  ]);
});

it('현재 뷰(월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const testEvents = [...mockEvents];
  const { result } = renderHook(() => useSearch(testEvents, new Date('2024-10-01'), 'month'));

  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      title: '점심',
      date: '2024-10-01',
      startTime: '12:00',
      endTime: '13:00',
      description: '점심 약속',
      location: '식당',
      category: '사교',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 10,
    },
    {
      id: '3',
      title: '개발 회의',
      date: '2024-10-08',
      startTime: '14:00',
      endTime: '15:00',
      description: '프로젝트 회의',
      location: '사무실',
      category: '업무',
      repeat: {
        type: 'weekly',
        interval: 1,
      },
      notificationTime: 15,
    },
  ]);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const testEvents = [...mockEvents];
  const { result } = renderHook(() => useSearch(testEvents, new Date('2024-10-01'), 'month'));

  act(() => {
    result.current.setSearchTerm('회의');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '3',
      title: '개발 회의',
      date: '2024-10-08',
      startTime: '14:00',
      endTime: '15:00',
      description: '프로젝트 회의',
      location: '사무실',
      category: '업무',
      repeat: {
        type: 'weekly',
        interval: 1,
      },
      notificationTime: 15,
    },
  ]);

  act(() => {
    result.current.setSearchTerm('점심');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      title: '점심',
      date: '2024-10-01',
      startTime: '12:00',
      endTime: '13:00',
      description: '점심 약속',
      location: '식당',
      category: '사교',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 10,
    },
  ]);
});
