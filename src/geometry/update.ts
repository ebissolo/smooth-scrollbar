import {
  Scrollbar,
} from '../interfaces/';

export function update(scrollbar: Scrollbar) {
  const newSize = scrollbar.getSize();

  const limit = {
    x: Math.max(newSize.content.width - newSize.container.width, 0),
    y: Math.max(newSize.content.height - newSize.container.height, 0),
  };

  // metrics
  const containerBounding = scrollbar.containerEl.getBoundingClientRect();

  const bounding = {
    top: Math.max(containerBounding.top, 0),
    right: Math.min(containerBounding.right, window.innerWidth),
    bottom: Math.min(containerBounding.bottom, window.innerHeight),
    left: Math.max(containerBounding.left, 0),
  };

  /**
   * @param  {object} options
   */
  function updateScrollbarStyles( options ) {
    let renderMask = scrollbar.getRenderMask();
    let renderFlags = scrollbar.getRenderFlags();

    if ( ( renderMask & renderFlags.contentSize ) && ( options.contentWidth != null ) ) {
      scrollbar.contentEl.style.width = options.contentWidth + 'px';
    }

    if ( ( renderMask & renderFlags.contentSize ) && ( options.contentHeight != null ) ) {
      scrollbar.contentEl.style.height = options.contentHeight + 'px';
    }

    if ( ( renderMask & renderFlags.xAxisSize ) && ( options.xAxisSize != null ) ) {
      scrollbar.track.xAxis.element.style.height = options.xAxisSize + 'px';
      scrollbar.track.xAxis.thumb.element.style.height = options.xAxisSize + 'px';
    }

    if ( ( renderMask & renderFlags.yAxisSize ) && ( options.yAxisSize != null ) ) {
      scrollbar.track.yAxis.element.style.width = options.yAxisSize + 'px';
      scrollbar.track.yAxis.thumb.element.style.width = options.yAxisSize + 'px';
    }

    if ( ( renderMask & renderFlags.xAxisColor ) && ( options.xAxisColor != null ) ) {
      scrollbar.track.xAxis.element.style.backgroundColor = options.xAxisColor;
    }

    if ( ( renderMask & renderFlags.yAxisColor ) && ( options.yAxisColor != null ) ) {
      scrollbar.track.yAxis.element.style.backgroundColor = options.yAxisColor;
    }

    if ( ( renderMask & renderFlags.xThumbColor ) && ( options.xThumbColor != null ) ) {
      scrollbar.track.xAxis.thumb.element.style.backgroundColor = options.xThumbColor;
    }

    if ( ( renderMask & renderFlags.yThumbColor ) && ( options.yThumbColor != null ) ) {
      scrollbar.track.yAxis.thumb.element.style.backgroundColor = options.yThumbColor;
    }

    scrollbar.setRenderMask( 0 );
  }

  // assign props
  scrollbar.size = newSize;
  scrollbar.limit = limit;
  scrollbar.bounding = bounding;

  // modifies content size if properties for customization object are defined
  let customizeOptions = scrollbar.options.customizeOptions;
  if ( customizeOptions != null ) {
    updateScrollbarStyles( customizeOptions );
  }

  // update tracks
  scrollbar.track.update();

  // re-positioning
  scrollbar.setPosition();
}
