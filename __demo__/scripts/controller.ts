import * as dat from 'dat-gui';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

Scrollbar.use(OverscrollPlugin);

const options = {
  damping: 0.1,
  thumbMinSize: 20,
  renderByPixels: !('ontouchstart' in document),
  alwaysShowTracks: true,
  continuousScrolling: true,
  customizeOptions: {
    contentWidth: 1000,
    contentHeight: 4000,
    xAxisSize: 20,
    yAxisSize: 20,
    xAxisColor: 'gray',
    yAxisColor: 'gray',
    xThumbColor: 'black',
    yThumbColor: 'black',
    innerOffset: 0,
  },
};

const optionsInner = {
  damping: 0.1,
  thumbMinSize: 20,
  renderByPixels: !('ontouchstart' in document),
  alwaysShowTracks: true,
  continuousScrolling: true,
  customizeOptions: {
    contentWidth: 400,
    contentHeight: 300,
    xAxisSize: 20,
    yAxisSize: 20,
    xAxisColor: 'gray',
    yAxisColor: 'gray',
    xThumbColor: 'black',
    yThumbColor: 'black',
    innerOffset: 0,
  },
};

const overscrollOptions = {
  enable: true,
  effect: navigator.userAgent.match(/Android/) ? 'glow' : 'bounce',
  damping: 0.2,
  maxOverscroll: 150,
  glowColor: '#222a2d',
};

const scrollbars = [
  Scrollbar.init(document.getElementById('main-scrollbar') as HTMLElement, {
    wheelEventTarget: document,
    ...options,
    plugins: {
      overscroll: { ...overscrollOptions },
    },
  }),
  Scrollbar.init(document.getElementById('inner-scrollbar') as HTMLElement, {
    ...optionsInner,
    plugins: {
      overscroll: { ...overscrollOptions },
    },
  }),
];
const controller = new dat.GUI();

function updateMainScrollbar() {
  let s0 = scrollbars[0];

  // real-time options for main-scrollbar
  Object.assign(s0.options, options);
  s0.updatePluginOptions('overscroll', {
    ...overscrollOptions,
    effect: overscrollOptions.enable ? overscrollOptions.effect : undefined,
  });

  if (options.alwaysShowTracks) {
    s0.track.xAxis.show();
    s0.track.yAxis.show();
  } else {
    s0.track.xAxis.hide();
    s0.track.yAxis.hide();
  }
}

function updateMainStyles( ctrl ) {
  let property = ctrl.property;
  let value = ctrl.getValue();
  let s0 = scrollbars[0];

  switch ( property ) {
    case 'contentWidth':
      s0.setContentSize( { width: value, height: null } );
      break;
    case 'contentHeight':
      s0.setContentSize( { width: null, height: value } );
      break;
    case 'xAxisSize': s0.setXAxisSize(value);break;
    case 'yAxisSize': s0.setYAxisSize(value);break;
    case 'xAxisColor': s0.setXAxisColor(value);break;
    case 'yAxisColor': s0.setYAxisColor(value);break;
    case 'xThumbColor': s0.setXThumbColor(value);break;
    case 'yThumbColor': s0.setYThumbColor(value);break;
    case 'innerOffset': s0.setInnerOffset(value);break;
  }
}

function updateInnerStyles( ctrl ) {
  let property = ctrl.property;
  let value = ctrl.getValue();
  let s1 = scrollbars[1];

  switch ( property ) {
    case 'contentWidth':
      s1.setContentSize( { width: value, height: null } );
      break;
    case 'contentHeight':
      s1.setContentSize( { width: null, height: value } );
      break;
    case 'xAxisSize': s1.setXAxisSize(value);break;
    case 'yAxisSize': s1.setYAxisSize(value);break;
    case 'xAxisColor': s1.setXAxisColor(value);break;
    case 'yAxisColor': s1.setYAxisColor(value);break;
    case 'xThumbColor': s1.setXThumbColor(value);break;
    case 'yThumbColor': s1.setYThumbColor(value);break;
    case 'innerOffset': s1.setInnerOffset(value);break;
  }
}

const f1 = controller.addFolder('Scrollbar Options');
f1.open();

[
  f1.add(options, 'damping', 0.01, 1),
  f1.add(options, 'thumbMinSize', 0, 100),
  f1.add(options, 'renderByPixels'),
  f1.add(options, 'alwaysShowTracks'),
  f1.add(options, 'continuousScrolling'),
].forEach((ctrl) => {
  ctrl.onChange(updateMainScrollbar);
});

const f2 = controller.addFolder('Overscroll Plugin Options');
[
  f2.add(overscrollOptions, 'enable'),
  f2.add(overscrollOptions, 'effect', ['bounce', 'glow']),
  f2.add(overscrollOptions, 'damping', 0.01, 1),
  f2.add(overscrollOptions, 'maxOverscroll', 30, 300),
  f2.addColor(overscrollOptions, 'glowColor'),
].forEach((ctrl) => {
  ctrl.onChange(updateMainScrollbar);
});

const f3 = controller.addFolder( 'Main Scrollbar Customization' );
f3.open();

[
  f3.add( options.customizeOptions, 'contentWidth' ),
  f3.add( options.customizeOptions, 'contentHeight' ),
  f3.add( options.customizeOptions, 'xAxisSize' ),
  f3.add( options.customizeOptions, 'yAxisSize' ),
  f3.add( options.customizeOptions, 'xAxisColor' ),
  f3.add( options.customizeOptions, 'yAxisColor' ),
  f3.add( options.customizeOptions, 'xThumbColor' ),
  f3.add( options.customizeOptions, 'yThumbColor' ),
  f3.add( options.customizeOptions, 'innerOffset' ),
].forEach((ctrl) => {
  let controller = ctrl;
  ctrl.onChange(() => {
    updateMainStyles(controller);
  });
});

const f4 = controller.addFolder( 'Inner Scrollbar Customization' );
f4.open();

[
  f4.add( optionsInner.customizeOptions, 'contentWidth' ),
  f4.add( optionsInner.customizeOptions, 'contentHeight' ),
  f4.add( optionsInner.customizeOptions, 'xAxisSize' ),
  f4.add( optionsInner.customizeOptions, 'yAxisSize' ),
  f4.add( optionsInner.customizeOptions, 'xAxisColor' ),
  f4.add( optionsInner.customizeOptions, 'yAxisColor' ),
  f4.add( optionsInner.customizeOptions, 'xThumbColor' ),
  f4.add( optionsInner.customizeOptions, 'yThumbColor' ),
  f4.add( optionsInner.customizeOptions, 'innerOffset' ),
].forEach((ctrl) => {
  let controller = ctrl;
  ctrl.onChange(() => {
    updateInnerStyles(controller);
  });
});

const el = document.getElementById('controller');

if (el) {
  el.appendChild(controller.domElement);
}

if (window.innerWidth < 600) {
  controller.close();
}

export { controller };
