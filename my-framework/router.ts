import http from "http";

export class Router {
  private endpoints: { [key: string]: { [method: string]: Function } };

  constructor() {
    this.endpoints = {};
  }

  request(
    method = "GET",
    path: string,
    handler: (req: http.IncomingMessage, res: http.ServerResponse) => void
  ) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`Method ${method} already defined for path ${path}`);
    }

    endpoint[method] = handler;
  }

  get(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    this.request("GET", path, handler);
  }
  post(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    this.request("POST", path, handler);
  }
  put(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    this.request("PUT", path, handler);
  }
  delete(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    this.request("DELETE", path, handler);
  }
}
