import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const now = new Date('2024-11-04T10:00:00');
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-11-04',
        startTime: '10:05:00',
        endTime: '11:00:00',
        description: '설명 1',
        location: '장소 1',
        category: '카테고리 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 5,
      },
      {
        id: '2',
        title: '이벤트 2',
        date: '2024-11-04',
        startTime: '10:15:00',
        endTime: '11:00:00',
        description: '설명 2',
        location: '장소 2',
        category: '카테고리 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];

    const notifiedEvents: string[] = [];
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([events[0]]); // 알림 시간이 정확히 도래한 이벤트 1만 반환해야 함
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const now = new Date('2024-11-04T10:00:00');
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-11-04',
        startTime: '10:05:00',
        endTime: '11:00:00',
        description: '설명 1',
        location: '장소 1',
        category: '카테고리 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 5,
      },
    ];

    const notifiedEvents: string[] = ['1']; // 이미 알림을 보낸 이벤트 ID
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]); // 알림이 간 이벤트는 반환되지 않아야 함
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-11-04T10:00:00');
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-11-04',
        startTime: '10:10:00',
        endTime: '11:00:00',
        description: '설명 1',
        location: '장소 1',
        category: '카테고리 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 5,
      },
    ];

    const notifiedEvents: string[] = [];
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]); // 알림 시간이 아직 도래하지 않으므로 반환되지 않아야 함
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-11-04T10:10:00');
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-11-04',
        startTime: '10:00:00',
        endTime: '11:00:00',
        description: '설명 1',
        location: '장소 1',
        category: '카테고리 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 5,
      },
    ];

    const notifiedEvents: string[] = [];
    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]); // 알림 시간이 지난 이벤트는 반환되지 않아야 함
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: '이벤트 1',
      date: '2024-11-04',
      startTime: '10:00:00',
      endTime: '11:00:00',
      description: '설명 1',
      location: '장소 1',
      category: '카테고리 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    const message = createNotificationMessage(event);
    expect(message).toBe('10분 후 이벤트 1 일정이 시작됩니다.'); // 생성된 메시지가 올바른지 확인
  });
});
