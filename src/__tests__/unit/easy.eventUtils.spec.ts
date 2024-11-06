import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

const events: Event[] = [
  {
    id: '1',
    title: '이벤트 1',
    date: '2024-06-30',
    startTime: '10:00',
    endTime: '11:00',
    description: 'event',
    location: '장소 1',
    category: '카테고리 1',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 30,
  },
  {
    id: '2',
    title: '이벤트 2',
    date: '2024-07-01',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Event',
    location: '장소 2',
    category: '카테고리 2',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 30,
  },
  {
    id: '3',
    title: '이벤트 3',
    date: '2024-07-02',
    startTime: '14:00',
    endTime: '15:00',
    description: 'evenT',
    location: '장소 3',
    category: '카테고리 3',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 30,
  },
];

describe('getFilteredEvents', () => {
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const filteredEvents = getFilteredEvents(events, '이벤트 2', new Date('2024-07-01'), 'month');

    expect(filteredEvents).toHaveLength(1);
    expect(filteredEvents[0].title).toBe('이벤트 2');
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');

    expect(filteredEvents).toHaveLength(3);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');

    expect(filteredEvents).toHaveLength(2);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const filteredEvents = getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week');

    expect(filteredEvents).toHaveLength(3);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');

    expect(filteredEvents).toHaveLength(2);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const filteredEvents = getFilteredEvents(events, 'event', new Date('2024-07-01'), 'month');

    expect(filteredEvents).toHaveLength(2);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링하여 7월 이벤트 2개만 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');

    expect(filteredEvents).toHaveLength(2);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const filteredEvents = getFilteredEvents([], '', new Date(), 'month');

    expect(filteredEvents).toHaveLength(0);
  });
});
