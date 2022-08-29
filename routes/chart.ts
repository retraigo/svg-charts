import { HandlerContext } from "$fresh/server.ts";

interface SVGData {
    size: number;
    viewbox: string;
    paths: [string];
}

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
    if(req.headers.get("Content-Type") !== "application/json") return new Response(null, {
        status: 400,
        statusText:
          "Wrong content type.",
      });
  const body = await req.json() as Record<string, unknown>;

  if (!body.type) {
    return new Response(null, {
      status: 400,
      statusText: "Missing `type` property.",
    });
  }
  const data = validateBody(body)
  if(data instanceof Response) return data;

  const res: SVGData = {
    size: Math.max(...data.size),
    viewbox: `0 0 ${data.size[0]} ${data.size[1]}`,
    paths: [`M 0 0 L 0 ${data.size[1]} L ${data.size[0]} ${data.size[1]} L ${data.size[0]} 0 L 0 0 M ${data.x[0]} ${data.size[1]}`],
  };
  let i = 0;
  while(i < data.x.length) {
    if(body.type === "scatter") res.paths[0] += ` M ${data.x[i]} ${data.size[1] - data.y[i]} l 0.5 0.5 l -1 -1 l 0.5 0.5 l 0.5 -0.5 l -1 1`
     else res.paths[0] += ` L ${data.x[i]} ${data.size[1] - data.y[i]}`
      i+=1;
  }
  const response = {
    ...res,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="${res.viewbox}" fill="white" stroke="black" stroke-width="0.5">${res.paths.map(x => `<path d = "${x}" />`).join("")}</svg>` 
  }
  return body.res === "svg" ? new Response(response.svg) : new Response(JSON.stringify(response));
};

function validateBody(body: Record<string, unknown>): {size: [number, number], x: number[], y: number[]} | Response {
    if (body.sent === "pairs") {
        console.log(body)
        if (
          !body.points || !Array.isArray(body.points) || body.points.some((x) =>
            !Array.isArray(x)
          ) || body.points.some((x) => x.some((y: unknown) => !isFinite(Number(y)))) ||
          body.points.some((x) => x.length !== 2)
        ) {
          return new Response(null, {
            status: 400,
            statusText:
              "If `body.sent` is set to `pairs`, `body.points` should be an array of points in the format `[x, y]`.",
          });
        }
        if(body.points.length > 5000) return new Response(null, {
            status: 400,
            statusText:
              "Cannot visualize more than 5000 points.",
          });
        const size = [
          Math.max(
            ...body.points.map((x) => x[0]).reduce((acc, val) => [...acc, val], []),
          ),
          Math.max(
            ...body.points.map((x) => x[1]).reduce((acc, val) => [...acc, val], []),
          ),
        ];
        return {
            size: size as [number, number],
            x: body.points.map(x => x[0]),
            y: body.points.map(x => x[1])
        }
      } else {
        if (!body.x || !Array.isArray(body.x) || body.x.some((x) => !isFinite(Number(x)))) {
          return new Response(null, {
            status: 400,
            statusText:
              "If `body.sent` is not set to `pairs`, `body.x` should be an array of numbers equal in length to `body.y`.",
          });
        }
        if (
          !body.y || !Array.isArray(body.y) || body.y.some((x) => !isFinite(Number(x))) ||
          body.x.length !== body.y.length
        ) {
            console.log(Array.isArray(body.y)? body.y : 0)
          return new Response(null, {
            status: 400,
            statusText:
              "If `body.sent` is not set to `pairs`, `body.y` should be an array of numbers equal in length to `body.x`.",
          });
        }
      }
      if(body.x.length > 5000) return new Response(null, {
        status: 400,
        statusText:
          "Cannot visualize more than 5000 points.",
      });
      const size = [
        Math.max(
          ...body.x.reduce((acc, val) => [...acc, val], []),
        ),
        Math.max(
          ...body.x.reduce((acc, val) => [...acc, val], []),
        ),
      ];
      return {
          size: size as [number, number],
          x:body.x,
          y: body.y
      }
}