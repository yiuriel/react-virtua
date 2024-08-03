import { BrowserInfo, BrowserName } from "../types";
import { browserMaxHeights } from "./constants";

export const detectBrowser = (): BrowserInfo => {
  const userAgent = navigator.userAgent;

  let browserName = BrowserName.unknown;

  if (/chrome|crios|crmo/i.test(userAgent) && !/edg/i.test(userAgent)) {
    browserName = BrowserName.chrome;
  } else if (/firefox|fxios/i.test(userAgent)) {
    browserName = BrowserName.firefox;
  } else if (
    /safari/i.test(userAgent) &&
    !/chrome|crios|crmo|edg/i.test(userAgent)
  ) {
    browserName = BrowserName.safari;
  } else if (/edg/i.test(userAgent)) {
    browserName = BrowserName.edge;
  }

  return {
    name: browserName,
    maxPixels: browserMaxHeights[browserName as BrowserName],
  };
};
