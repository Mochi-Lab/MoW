export function parseBalance(_balanceWei, _decimals) {
  if (!_balanceWei) {
    return 0;
  }
  if (!_decimals) {
    _decimals = 18;
  }
  _decimals = parseInt(_decimals);
  let afterDecimal;
  const weiString = _balanceWei.toString();
  const trailingZeros = /0+$/u;

  const beforeDecimal =
    weiString.length > _decimals ? weiString.slice(0, weiString.length - _decimals) : '0';
  afterDecimal = ('0'.repeat(_decimals) + _balanceWei).slice(-_decimals).replace(trailingZeros, '');
  if (afterDecimal === '') {
    afterDecimal = '0';
  } else if (afterDecimal.length > 3) {
    afterDecimal = afterDecimal.slice(0, 3);
  }
  return parseFloat(`${beforeDecimal}.${afterDecimal}`);
}
