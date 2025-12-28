import { http, HttpResponse } from 'msw';
import { API_END_POINTS } from '../Constant';

export const handlers = [
  http.get(API_END_POINTS.USER, () => {
    return HttpResponse.json({
      name: 'Cron',
      memo: 'This is User Mock Data from MSW'
    });
  })
];
