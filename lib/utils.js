export function getEventPath(evt) {
  return evt.path || (evt.composedPath && evt.composedPath()) || '';
}
