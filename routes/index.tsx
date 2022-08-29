/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Head>
        <title>SVG Charts by NeTT</title>
        <meta name = "description" content="Generate SVG charts." />
        <meta name = "theme-color" content="#ff00c3" />
      </Head>
      <img
        src="/icon.webp"
        class={tw`w-12 h-12`}
        alt="Not the fresh logo"
      />
      <p class={tw`my-6`}>
        Front page WIP. Check out the below tho:
      </p>
      <div class = {tw`mt-6 w-full`}>
        <div class = {tw`flex flex-col space-y-8 mx-auto bg-gray-900 text-white p-1`}>
          <div><span>Content-Type: "application/json"</span></div>
          <table class = {tw`table-auto`}>
            <thead><th>Param</th><th>Description</th></thead>
            <tr><td>type</td><td>Type of chart. Either `line` or `scatter`.</td></tr>
            <tr><td>sent</td><td>`pair` if you are sending points in the format [x, y]. Leave blank if x[] and y[]</td></tr>
            <tr><td>points</td><td>Points in the format [x, y]. Leave blank if x[] and y[]</td></tr>
            <tr><td>x</td><td>Array of x axis points. Leave blank if you are using `body.points` instead.</td></tr>
            <tr><td>y</td><td>Array of y axis points. Leave blank if you are using `body.points` instead.</td></tr>
          </table>
        </div>
      </div>
      <a class = {tw`mt-6 block w-full`} href="https://github.com/retraigo/svg-charts">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
          </path>
        </svg>
      </a>
    </div>
  );
}
