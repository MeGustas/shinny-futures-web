export default (accessor_rsi, plot, plotMixin) => () => {
  // Closure function
  const // Container for private, direct access mixed in variables
    p = {};

  const rsiLine = plot.pathLine();

  class rsi {
    constructor(g) {
      const group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'middle');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'rsi');

      rsi.refresh(g);
    }

    static refresh(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, rsiLine);
    }
  }

  function binder() {
    rsiLine.init(p.accessor.d, p.xScale, p.accessor.r, p.yScale);
  }

  // Mixin 'superclass' methods and variables
  plotMixin(rsi, p).plot(accessor_rsi(), binder).dataSelector(plotMixin.dataMapper.array);
  binder();

  return rsi;
};

function refresh(selection, accessor, x, y, plot, rsiLine) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  selection.select('path.middle').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.m, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  selection.select('path.rsi').attr('d', rsiLine);
}
