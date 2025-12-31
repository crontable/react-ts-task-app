import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../../Constant';
import type { IDashboardResponse } from '../../Types';
import { TASK_SAMPLE } from '../database';

export const dashboardHandlers = [
  http.post(`${API_BASE_URL}${API_ENDPOINTS.DASHBOARD}`, async () => {
    return HttpResponse.json({
      numOfTask: TASK_SAMPLE.length,
      numOfRestTask: TASK_SAMPLE.filter((task) => task.status === 'TODO').length,
      numOfDoneTask: TASK_SAMPLE.filter((task) => task.status === 'DONE').length
    } as IDashboardResponse);
  })
];
