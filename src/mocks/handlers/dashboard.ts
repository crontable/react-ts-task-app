import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../../Constant';
import type { IDashboardResponse } from '../../Types';

export const dashboardHandlers = [
  http.post(`${API_BASE_URL}${API_ENDPOINTS.DASHBOARD}`, async () => {
    return HttpResponse.json({
      numOfTask: 1,
      numOfRestTask: 2,
      numOfDoneTask: 3
    } as IDashboardResponse);
  })
];
