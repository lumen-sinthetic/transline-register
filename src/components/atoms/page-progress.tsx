"use client";

import { AppProgressBar } from "next-nprogress-bar";

function PageProgress() {
  return (
    <AppProgressBar
      shallowRouting
      options={{ showSpinner: false }}
    />
  );
}

export default PageProgress;
