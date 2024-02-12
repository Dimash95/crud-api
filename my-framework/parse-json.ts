export function middleware(req: any, res: any) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.send = (data: any) => {
    res.end(JSON.stringify(data));
  };
}
