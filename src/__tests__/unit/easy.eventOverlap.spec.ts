import { mockEvents } from '../../__mocks__/mockEvents';
import { Event, EventForm } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const date = '2024-07-01';
    const time = '14:30';
    const parsedDateTime = parseDateTime(date, time);

    expect(parsedDateTime).toEqual(new Date('2024-07-01 14:30'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const date = '2024-07-32';
    const time = '14:30';
    const parsedDateTime = parseDateTime(date, time);

    expect(parsedDateTime.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const date = '2024-07-01';
    const time = '14:60';
    const parsedDateTime = parseDateTime(date, time);

    expect(parsedDateTime.toString()).toBe('Invalid Date');
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const date = '';
    const time = '14:30';
    const parsedDateTime = parseDateTime(date, time);

    expect(parsedDateTime.toString()).toBe('Invalid Date');
  });

  it('시간 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const date = '2024-07-01';
    const time = '';
    const parsedDateTime = parseDateTime(date, time);

    expect(parsedDateTime.toString()).toBe('Invalid Date');
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const testEvent: Event = { ...mockEvents[0] };
    const convertdEventToDateRange = convertEventToDateRange(testEvent);

    expect(convertdEventToDateRange).toEqual({
      start: new Date('2024-09-01 10:00'),
      end: new Date('2024-09-01 11:00'),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const testEvent: EventForm = {
      title: 'Invalid Event',
      date: '2024-07-32',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Event description',
      location: 'Event location',
      category: 'Event category',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const convertdEventToDateRange = convertEventToDateRange(testEvent);

    expect(convertdEventToDateRange.start.toString()).toBe('Invalid Date');
    expect(convertdEventToDateRange.end.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const testEvent: EventForm = {
      title: 'Invalid Time Event',
      date: '2024-07-01',
      startTime: '14:60',
      endTime: '15:300',
      description: 'Event description',
      location: 'Event location',
      category: 'Event category',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const convertdEventToDateRange = convertEventToDateRange(testEvent);

    expect(convertdEventToDateRange.start.toString()).toBe('Invalid Date');
    expect(convertdEventToDateRange.end.toString()).toBe('Invalid Date');
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1: EventForm = {
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Description 1',
      location: 'Location 1',
      category: 'Category 1',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const event2: EventForm = {
      title: 'Event 2',
      date: '2024-07-01',
      startTime: '15:00',
      endTime: '16:00',
      description: 'Description 2',
      location: 'Location 2',
      category: 'Category 2',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const isOverlappingResult = isOverlapping(event1, event2);

    expect(isOverlappingResult).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1: EventForm = {
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Description 1',
      location: 'Location 1',
      category: 'Category 1',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const event2: EventForm = {
      title: 'Event 2',
      date: '2024-07-01',
      startTime: '15:30',
      endTime: '16:30',
      description: 'Description 2',
      location: 'Location 2',
      category: 'Category 2',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const isOverlappingResult = isOverlapping(event1, event2);

    expect(isOverlappingResult).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent: EventForm = {
      title: '새로운 이벤트',
      date: '2024-10-01',
      startTime: '10:00',
      endTime: '20:00',
      description: 'Description',
      location: 'Location',
      category: 'Category',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const overlappingEvents = findOverlappingEvents(newEvent, mockEvents);

    expect(overlappingEvents).toHaveLength(1);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent: EventForm = {
      title: '새로운 이벤트',
      date: '2024-10-01',
      startTime: '19:00',
      endTime: '20:00',
      description: 'Description',
      location: 'Location',
      category: 'Category',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const overlappingEvents = findOverlappingEvents(newEvent, mockEvents);

    expect(overlappingEvents).toHaveLength(0);
  });
});
