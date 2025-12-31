import { http, HttpResponse } from 'msw';
import type { HttpResponseResolver, PathParams } from 'msw';
import { API_BASE_URL, API_ENDPOINTS, TASK_LIST_PAGE_SIZE } from '../../Constant';
import { verifyToken } from '../utils/auth';
import { TASK_SAMPLE } from '../database';

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
    withAuth(async ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get('page')) || 1;
      const limit = TASK_LIST_PAGE_SIZE;

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const requestedTasks = TASK_SAMPLE.slice(startIndex, endIndex).map(({ id, title, memo, status }) => ({
        id,
        title,
        memo,
        status
      }));

      return HttpResponse.json(requestedTasks);
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
