import {
  TrackController,
} from './track';

import { Data2d } from './data-2d';

export type Customizations = {
  contentWidth: number | null,
  contentHeight: number | null,
  xAxisSize: number | null,
  yAxisSize: number | null,
  xAxisColor: string | null,
  yAxisColor: string | null,
  xThumbColor: string | null,
  yThumbColor: string | null,
  innerOffset: number
};

// Scrollbar.options
export type ScrollbarOptions = {
  damping: number,
  thumbMinSize: number,
  renderByPixels: boolean,
  alwaysShowTracks: boolean,
  continuousScrolling: boolean,
  wheelEventTarget: EventTarget | null,
  plugins: any,
  customizeOptions: Customizations,
};

// Scrollbar.size
export type Metrics = {
  width: number,
  height: number,
};

export type Size = {
  width: number | null,
  height: number | null
};

export type ScrollbarSize = {
  container: Metrics,
  content: Metrics,
};

// Scrollbar.bounding
export type ScrollbarBounding = {
  top: number,
  right: number,
  bottom: number,
  left: number,
};

// Scrolling Listener
export type ScrollStatus = {
  offset: Data2d,
  limit: Data2d,
};

export interface ScrollListener {
  (this: Scrollbar, status: ScrollStatus): void;
}

// `scrollTo` options
export type ScrollToOptions = {
  callback: (this: Scrollbar) => void,
  easing: (percent: number) => number,
};

// `setPosition` options
export type SetPositionOptions = {
  withoutCallbacks: boolean,
};

// `scrollIntoView` options
export type ScrollIntoViewOptions = {
  alignToTop: boolean,
  onlyScrollIfNeeded: boolean,
  offsetTop: number,
  offsetLeft: number,
  offsetBottom: number,
};

export type ScrollRender = {
  contentSize: number,
  xAxisSize: number,
  yAxisSize: number,
  xAxisColor: number,
  yAxisColor: number,
  xThumbColor: number,
  yThumbColor: number,
  innerOffset: number
};
export interface AddTransformableMomentumCallback {
  (this: Scrollbar, willScroll: boolean): void;
}

// Scrollbar Class
export interface Scrollbar {
  readonly parent: Scrollbar | null;

  readonly containerEl: HTMLElement;
  readonly contentEl: HTMLElement;

  readonly track: TrackController;

  readonly options: ScrollbarOptions;

  bounding: ScrollbarBounding;
  size: ScrollbarSize;

  offset: Data2d;
  limit: Data2d;

  scrollTop: number;
  scrollLeft: number;

  destroy(): void;

  update(): void;
  getSize(): ScrollbarSize;
  getRenderMask(): number;
  getRenderFlags(): ScrollRender;
  isVisible(elem: HTMLElement): boolean;

  setRenderMask( value: number ): void;
  setContentSize( size: Size ): void;
  setXAxisSize( size: number ): void;
  setYAxisSize( size: number ): void;
  setXAxisColor( color: string ): void;
  setYAxisColor( color: string ): void;
  setXThumbColor( color: string ): void;
  setYThumbColor( color: string ): void;

  addListener(fn: ScrollListener): void;
  removeListener(fn: ScrollListener): void;

  addTransformableMomentum(x: number, y: number, fromEvent: Event, callback?: AddTransformableMomentumCallback): void;
  addMomentum(x: number, y: number): void;
  setMomentum(x: number, y: number): void;

  scrollTo(x?: number, y?: number, duration?: number, options?: Partial<ScrollToOptions>): void;
  setPosition(x?: number, y?: number, options?: Partial<SetPositionOptions>): void;
  scrollIntoView(elem: HTMLElement, options?: Partial<ScrollIntoViewOptions>): void;

  updatePluginOptions(pluginName: string, options?: any): void;
}
