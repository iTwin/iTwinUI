/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export interface Action {
  type: string;
  value: any;
}

/** The Backstop test definition. See https://github.com/garris/BackstopJS#advanced-scenarios */
export interface Scenario {
  [key: string]: any; // Allow for custom properties.
  /**
   * Import cookies in JSON format.
   */
  cookiePath?: string;
  /**
   * Wait for x milliseconds.
   */
  delay?: number;
  /**
   * Use with selectorExpansion true to expect number of results found.
   */
  expect?: number;
  /**
   * Selectors set to visibility: hidden.
   */
  hideSelectors?: string[];
  /**
   * Tag saved with your reference images.
   */
  label: string;
  /**
   * Percentage of different pixels allowed to pass test.
   */
  misMatchThreshold?: number;
  /**
   * Used to set up browser state e.g. cookies.
   */
  onBeforeScript?: string;
  /**
   * Used to modify UI state prior to screenshots e.g. hovers, clicks etc.
   */
  onReadyScript?: string;
  /**
   * Wait for selector (ms) after interacting with hover or click.
   */
  postInteractionWait?: number;
  /**
   * Wait until this string has been logged to the console.
   */
  readyEvent?: string;
  /**
   * Wait until this selector exists before continuing.
   */
  readySelector?: string;
  /**
   * Specify a different state or environment when creating reference.
   */
  referenceUrl?: string;
  /**
   * Selectors set to display: none.
   */
  removeSelectors?: string[];
  /**
   * If true, any change in selector size will trigger a failure.
   */
  requireSameDimensions?: boolean;
  /**
   * Selectors to capture.
   */
  selectors?: string[];
  /**
   * If true, take screenshots of all matching selector instances.
   */
  selectorExpansion?: boolean;
  /**
   * Scroll the specified DOM element into view prior to screenshots.
   */
  scrollToSelector?: string;
  /**
   * The url of your app state.
   */
  url: string;
  /**
   * Override global viewports.
   */
  viewports?: Viewport[];
  /**
   * List of actions that will be performed e.g. click, hover.
   */
  actions?: Action[];
}

export type Viewport = ViewportNext | ViewportLegacy;

export interface ViewportNext {
  label: string;
  width: number;
  height: number;
}

// Create a Viewport version that uses `name` for legacy support.
// https://github.com/garris/BackstopJS/blob/aa7de8ee059074f947768cfd04db1776348e1a7a/core/util/createBitmaps.js#L25
export interface ViewportLegacy {
  name: 'phone' | 'tablet' | 'desktop';
  width: number;
  height: number;
}

/**
 * Creates test scenario.
 * @param testCase Name of the test case
 * @param options Custom options
 */
export declare function scenario(
  testCase: string,
  options: Scenario = {},
): Scenario;

/**
 * Performs click on element with provided selector.
 * @param selector CSS selector
 */
export declare function click(selector: string): Action;

/**
 * Hovers over element with provided selector.
 * @param selector CSS selector
 */
export declare function hover(selector: string): Action;

/**
 * Focuses element with provided selector.
 * @param selector CSS selector
 */
export declare function focus(selector: string): Action;

/**
 * Performs key presses on element with provided selector.
 * @param selector CSS selector
 * @param keys Key clicks to be pressed
 */
export declare function keyPress(selector: string, keys: string): Action;
