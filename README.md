![stayedcss](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrisCI%2FbtsLjdzo8oK%2FoYm0E4Q9KXFjcR5qeOQoZK%2Fimg.png)

<div align="center">

![version](<https://img.shields.io/badge/npm-0.0.1(beta)-blue>)

StayedCSS: The CSS library for Next.js App Router

</div>

<br/>

## Introduction

> StayedCSS - beta version

StayedCSS is a static CSS library designed for **Next.js App Router**, offering full support for both server and client components. With a simple syntax similar to basic CSS, it enables efficient styling and aims to be the next-generation CSS library for the Next.js App Router.

Currently in its beta version, StayedCSS is rapidly improving in optimization and stability. It will continue to evolve to deliver a better styling experience for your projects.

## Main Features

- **Server and Client Component Support**: Apply styles seamlessly to server and client components in the Next.js App Router environment.
- **Various Styling Options**: Supports various CSS styles such as `:hover`, `::after`, and `~ p`.
- **Media Queries**: Simplify responsive design implementation.
- **Dark Mode**: Offers flicker-free dark mode transitions.

## Getting Started

**Installation**

```bash
npm install stayedcss
# or
yarn add stayedcss
```

**Usage Example**

```jsx
import { st } from "stayedcss";
const styles = st({
  componentId: "components/example",
  container: {
    backgroundColor: "black",
    padding: "20px",
  },
});
```

For more details, check out the [documentation](https://stayedcss.vercel.app/docs/getting-started/introduction).

## Limitations (Beta Version)

- StayedCSS is currently only compatible with the **Next.js App Router** environment.
- As this is a beta release, stability is not guaranteed. It is recommended to thoroughly test before integrating it into your project.

## Contribution

StayedCSS is an open-source project. Feel free to submit bug reports or feature requests on [GitHub Issues]. Your feedback will play a vital role in evolving StayedCSS from a beta version to a stable and robust library.
