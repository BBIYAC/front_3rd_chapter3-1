import { Event } from '../../src/types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '회의',
    date: '2024-09-01',
    startTime: '10:00',
    endTime: '11:00',
    description: '팀 미팅',
    location: '회의실',
    category: '업무',
    repeat: {
      type: 'none',
      interval: 0,
    },
    notificationTime: 30,
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
];
