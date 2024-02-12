import http from "http";
import EventEmitter from "events";

export class Application {
  private emitter: EventEmitter;
  private server: http.Server;
  private middlewares: any[];

  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    this.middlewares.push(middleware);
  }

  listen(port: number | string, callback?: () => void) {
    this.server.listen(port, callback);
  }

  addRouter(router: any) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoints = router.endpoints[path];
      Object.keys(endpoints).forEach((method) => {
        this.emitter.on(this._getRouterMask(path, method), (req, res) => {
          const handler = endpoints[method];
          this.middlewares.forEach((middleware) => {
            middleware(req, res);
          });
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req: any, res: any) => {
      let body = "";

      req.on("data", (chunk: any) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          req.body = JSON.parse(body);
        }
        const emitted = this.emitter.emit(this._getRouterMask(req.url, req.method), req, res);
        if (!emitted) {
          res.statusCode = 404;
          res.end("Not Found");
        }
      });
    });
  }
  _getRouterMask(path: string, method: string) {
    return `[${path}]:[${method}]`;
  }
}
