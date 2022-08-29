# SVG Charts

Generate SVG charts

## Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## Via fetch

### Params

| Param    | Description                                                                       |
| -------- | --------------------------------------------------------------------------------- |
| `type`   | Type of chart. Either `line` or `scatter`.                                        |
| `sent`   | `pair` if you are sending points in the format [x, y]. Leave blank if x[] and y[] |
| `points` | Points in the format [x, y]. Leave blank if x[] and y[]                           |
| `x`      | Array of x axis points. Leave blank if you are using `body.points` instead.       |
| `y`      | Array of y axis points. Leave blank if you are using `body.points` instead.       |
| `res`    | Returns SVG file directly if set to `svg`                                         |

```ts
import { useCubicBezier } from "https://deno.land/x/denouse@v0.0.2/mod.ts";

// Let's visualize a cubic bezier
const points = useCubicBezier(4000, 0.5, 0.7, 0.19, 0.96).map((x) => [
    x[0] * 100,
    x[1] * 100,
]);

const res = await fetch("http://svgcharts.deno.dev/chart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points, sent: "pairs", type: "line" }),
});

if (res.status === 200) {
    // response.body.svg is a string containing SVG code.
    console.log(await res.json().then((x) => x.svg));
} else console.log(res.status, res.statusText);
```

## Response

```ts
interface Res {
    size: number;
    viewbox: string;
    paths: [string]; // might have more paths in the future.
    svg: string; // entire SVG string.
}
```

### Available charts

-   scatter
-   line
