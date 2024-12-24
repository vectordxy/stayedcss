![stayedcss](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FccWzLp%2FbtsLiB8N2zD%2FzpDz5HKEHjlXrhGlZ4GBJK%2Fimg.png)

<div align="center">

![version](<https://img.shields.io/badge/npm-0.0.2(beta)-blue>)

</div>

<br/>

# Unlock the Full Potential of Next.js Apps With a CSS Library Designed for Simplicity and Performance 🚀


> StayedCSS - beta version

StayedCSS is a static CSS library designed for **Next.js App Router**, offering full support for both server and client components. With a simple syntax similar to basic CSS, it enables efficient styling and aims to be the next-generation CSS library for the Next.js App Router.

Currently in its beta version, StayedCSS is rapidly improving in optimization and stability. It will continue to evolve to deliver a better styling experience for your projects.

## Why StayedCSS?

1. Simplifies complex styling tasks.
2. Optimized for the Next.js App Router.
3. Provides a modern, developer-friendly approach to CSS.

## Key Features

- **Flicker-Free Dark Mode Transitions**: Ensure smooth, visually appealing, and flicker-free transitions when toggling dark mode.
- **Server and Client Component Support**: Apply styles seamlessly to server and client components in the Next.js App Router environment.
- **Simple Syntax**: Write clean and maintainable CSS code with powerful features.
- **Media Queries**: Effortlessly create responsive designs with built-in media query support.
- **Pseudo-Classes and Elements**: Utilize CSS commands such as `:hover`, `::after`, and `~ p` for advanced styling.

 # 🎉 **Start Using StayedCSS Today!** 🎉

Experience the future of styling with a library built for developers who love simplicity! 

## Getting Started

**Installation**

```bash
npm install stayedcss
# or
yarn add stayedcss
```

**Usage Example**

```jsx
import { useStyle } from "stayedcss";
const styles = useStyle({
  componentId: "components/example",
  container: {
    backgroundColor: "black",
    padding: "20px",
  },
});
```

For more details, check out the [documentation](https://stayedcss.vercel.app/docs/getting-started/introduction).

## Limitations (Beta Version)

- As this libraryis currently in **beta version**, stability is not guaranteed.
- Any code, sturcture or function can be changed. Features may be modified, added, or removed as I continue to improve and stabilize it.

## Contribution

StayedCSS is an open-source project. Feel free to submit bug reports or feature requests on Issues. Your feedback is important for StayedCSS from a beta version to a stable and robust library.

## License

MIT
