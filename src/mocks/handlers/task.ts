import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../../Constant';
import type { ITask } from '../../Types';

const TASK_SAMPLE: ITask[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1 + '',
  title: `Sample Task Title ${index + 1}`,
  memo: `This is a sample memo for task number ${index + 1}.`,
  status: index % 2 === 0 ? 'TODO' : 'DONE',
  registerDateTime: new Date().toISOString()
}));

const isValidTaskId = (id?: string): boolean => !id || Number(id) < 1 || Number(id) > TASK_SAMPLE.length;

export const taskHandlers = [
  // 로그인: JWT 토큰 발급
  http.get(`${API_BASE_URL}${API_ENDPOINTS.TASK}`, async () => {
    return HttpResponse.json(TASK_SAMPLE.map(({ id, title, memo, status }) => ({ id, title, memo, status })));
  }),

  http.get(`${API_BASE_URL}${API_ENDPOINTS.TASK}/:id`, async (request) => {
    const id = request.params?.id;

    if (typeof id === 'string' && isValidTaskId(id)) {
      return HttpResponse.json({ errorMessage: 'Task not found' }, { status: 404 });
    }

    return HttpResponse.json({ message: 'Success' });
  }),

  http.delete(`${API_BASE_URL}${API_ENDPOINTS.TASK}/:id`, async (request) => {
    const id = request.params?.id;

    if (typeof id === 'string' && isValidTaskId(id)) {
      return HttpResponse.json({ errorMessage: 'Task not found' }, { status: 404 });
    }

    return HttpResponse.json({ success: true }, { status: 200 });
  })
];
