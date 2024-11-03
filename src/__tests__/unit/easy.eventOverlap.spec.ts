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
    const expectedDate = new Date('2024-07-01 14:30'); // 기대하는 결과
    expect(parseDateTime(date, time)).toEqual(expectedDate); // 함수의 결과가 기대하는 결과와 같은지 확인
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const date = '2024-07-32'; // 유효하지 않은 날짜
    const time = '14:30';
    expect(parseDateTime(date, time).toString()).toBe('Invalid Date'); // Invalid Date인지 확인
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const date = '2024-07-01';
    const time = '14:60'; // 유효하지 않은 분
    expect(parseDateTime(date, time).toString()).toBe('Invalid Date'); // Invalid Date인지 확인
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const date = ''; // 비어 있는 날짜
    const time = '14:30';
    expect(parseDateTime(date, time).toString()).toBe('Invalid Date'); // Invalid Date인지 확인
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event: EventForm = {
      title: 'Sample Event',
      date: '2024-07-01',
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
    const expectedRange = {
      start: new Date('2024-07-01T14:30'),
      end: new Date('2024-07-01T15:30'),
    };
    expect(convertEventToDateRange(event)).toEqual(expectedRange); // 변환된 결과가 기대한 객체와 같은지 확인
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: EventForm = {
      title: 'Invalid Event',
      date: '2024-07-32', // 유효하지 않은 날짜
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
    const result = convertEventToDateRange(event);
    expect(result.start.toString()).toBe('Invalid Date'); // 시작 시간이 Invalid Date인지 확인
    expect(result.end.toString()).toBe('Invalid Date'); // 종료 시간이 Invalid Date인지 확인
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: EventForm = {
      title: 'Invalid Time Event',
      date: '2024-07-01',
      startTime: '14:60', // 유효하지 않은 분
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
    const result = convertEventToDateRange(event);
    expect(result.start.toString()).toBe('Invalid Date'); // 시작 시간이 Invalid Date인지 확인
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1: EventForm = {
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'First event',
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
      description: 'Second event',
      location: 'Location 2',
      category: 'Category 2',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    expect(isOverlapping(event1, event2)).toBe(true); // 겹치는 경우 true인지 확인
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1: EventForm = {
      title: 'Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'First event',
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
      description: 'Second event',
      location: 'Location 2',
      category: 'Category 2',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    expect(isOverlapping(event1, event2)).toBe(false); // 겹치지 않는 경우 false인지 확인
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const existingEvents: Event[] = [
      {
        id: '1',
        title: 'Event 1',
        date: '2024-07-01',
        startTime: '14:00',
        endTime: '14:30',
        description: 'First event',
        location: 'Location 1',
        category: 'Category 1',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 30,
      },
      {
        id: '2',
        title: 'Event 2',
        date: '2024-07-01',
        startTime: '14:15',
        endTime: '15:00',
        description: 'Second event',
        location: 'Location 2',
        category: 'Category 2',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 30,
      },
      {
        id: '3',
        title: 'Event 3',
        date: '2024-07-01',
        startTime: '15:00',
        endTime: '16:00',
        description: 'Third event',
        location: 'Location 3',
        category: 'Category 3',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 30,
      },
    ];
    const newEvent: EventForm = {
      title: 'New Event',
      date: '2024-07-01',
      startTime: '14:25',
      endTime: '15:30',
      description: 'Newly added event',
      location: 'Location 4',
      category: 'Category 4',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const overlappingEvents = findOverlappingEvents(newEvent, existingEvents);
    expect(overlappingEvents).toHaveLength(3);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const existingEvents: Event[] = [
      {
        id: '1',
        title: 'Event 1',
        date: '2024-07-01',
        startTime: '14:00',
        endTime: '14:30',
        description: 'First event',
        location: 'Location 1',
        category: 'Category 1',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 30,
      },
      {
        id: '2',
        title: 'Event 2',
        date: '2024-07-01',
        startTime: '15:00',
        endTime: '16:00',
        description: 'Second event',
        location: 'Location 2',
        category: 'Category 2',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 30,
      },
    ];
    const newEvent: EventForm = {
      title: 'New Event',
      date: '2024-07-01',
      startTime: '16:30', // 기존 이벤트들과 겹치지 않음
      endTime: '17:30',
      description: 'Newly added event',
      location: 'Location 4',
      category: 'Category 4',
      repeat: {
        type: 'none',
        interval: 0,
      },
      notificationTime: 30,
    };
    const overlappingEvents = findOverlappingEvents(newEvent, existingEvents);
    expect(overlappingEvents).toHaveLength(0); // 겹치는 이벤트가 없으므로 빈 배열인지 확인
  });
});
