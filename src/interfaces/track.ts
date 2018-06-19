export interface ScrollbarThumb {
  readonly element: HTMLElement;
  displaySize: number;
  realSize: number;
  offset: number;

  attachTo(track: HTMLElement): void;
  setColor( color: string ): void;
  update(scrollOffset: number, containerSize: number, pageSize: number): void;
}

export interface ScrollbarTrack {
  readonly element: HTMLElement;
  readonly thumb: ScrollbarThumb;
  readonly direction: string;

  attachTo(container: HTMLElement): void;
  show(): void;
  hide(): void;
  setSize( size: number ): void;
  setColor( color: string ): void;
  update(scrollOffset: number, containerSize: number, pageSize: number): void;
}

export interface TrackController {
  readonly xAxis: ScrollbarTrack;
  readonly yAxis: ScrollbarTrack;

  update(): void;
  autoHideOnIdle(): void;
}
