import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const mockEvents: Event[] = [
  {
    id: '1',
    title: '회의',
    date: '2024-10-01',
    startTime: '10:00',
    endTime: '11:00',
    description: '팀 미팅',
    location: '회의실',
    category: '업무',
    repeat: {
      type: 'none',
      interval: 0,
    },
    notificationTime: 30, // 30분 전 알림
  },
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
    notificationTime: 10, // 10분 전 알림
  },
  {
    id: '3',
    title: '개발 회의',
    date: '2024-10-02',
    startTime: '14:00',
    endTime: '15:00',
    description: '프로젝트 회의',
    location: '사무실',
    category: '업무',
    repeat: {
      type: 'weekly',
      interval: 1, // 매주 반복
      endDate: '2024-12-31', // 반복 종료 날짜
    },
    notificationTime: 15, // 15분 전 알림
  },
];

describe('useSearch', () => {
  it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'month'));

    expect(result.current.filteredEvents).toEqual(mockEvents);
  });

  it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toEqual([
      mockEvents[0], // '회의'에 해당하는 이벤트
      mockEvents[2], // '개발 회의'에 해당하는 이벤트
    ]);
  });

  it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('식당');
    });

    expect(result.current.filteredEvents).toEqual([mockEvents[1]]); // '식당'에 해당하는 이벤트
  });

  it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'week'));

    // Week view이므로 한 주의 이벤트만 포함
    expect(result.current.filteredEvents).toEqual(
      mockEvents.filter(
        (event) =>
          new Date(event.date) >= new Date('2024-09-30') &&
          new Date(event.date) < new Date('2024-10-07')
      )
    );
  });

  it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
    const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-10-01'), 'month'));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toEqual([
      mockEvents[0], // '회의'에 해당하는 이벤트
      mockEvents[2], // '개발 회의'에 해당하는 이벤트
    ]);

    act(() => {
      result.current.setSearchTerm('점심');
    });

    expect(result.current.filteredEvents).toEqual([mockEvents[1]]); // '점심'에 해당하는 이벤트
  });
});
