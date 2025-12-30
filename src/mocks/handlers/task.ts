import { http, HttpResponse } from 'msw';
import type { HttpResponseResolver, PathParams } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../../Constant';
import type { ITask } from '../../Types';
import { verifyToken } from '../utils/auth';

const TASK_SAMPLE: ITask[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1 + '',
  title: `Sample Task Title ${index + 1}`,
  memo: `This is a sample memo for task number ${index + 1}.`,
  status: index % 2 === 0 ? 'TODO' : 'DONE',
  registerDateTime: new Date().toISOString()
}));

const isValidTaskId = (id?: string): boolean => !id || Number(id) < 1 || Number(id) > TASK_SAMPLE.length;

const createNotFoundResponse = () => HttpResponse.json({ errorMessage: 'Task not found' }, { status: 404 });
const createUnauthorizedResponse = () => HttpResponse.json({ errorMessage: 'Unauthorized' }, { status: 401 });

const withAuth =
  <Params extends PathParams>(handler: HttpResponseResolver<Params>): HttpResponseResolver<Params> =>
  async (info) => {
    try {
      await verifyToken(info.request);
    } catch {
      return createUnauthorizedResponse();
    }
    return handler(info);
  };

export const taskHandlers = [
  http.get(
    `${API_BASE_URL}${API_ENDPOINTS.TASK}`,
    withAuth(async () => {
      return HttpResponse.json(TASK_SAMPLE.map(({ id, title, memo, status }) => ({ id, title, memo, status })));
    })
  ),

  http.get(
    `${API_BASE_URL}${API_ENDPOINTS.TASK}/:id`,
    withAuth(async ({ params }) => {
      const id = params?.id as string;

      if (isValidTaskId(id)) {
        return createNotFoundResponse();
      }

      const task = TASK_SAMPLE.find((task) => task.id === id);

      return HttpResponse.json(task);
    })
  ),

  http.delete(
    `${API_BASE_URL}${API_ENDPOINTS.TASK}/:id`,
    withAuth(async ({ params }) => {
      const id = params?.id as string;

      if (isValidTaskId(id)) {
        return createNotFoundResponse();
      }

      TASK_SAMPLE.splice(
        TASK_SAMPLE.findIndex((task) => task.id === id),
        1
      );

      return HttpResponse.json({ success: true }, { status: 200 });
    })
  )
];
