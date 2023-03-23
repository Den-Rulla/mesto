export class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => {
      const renderItem = this._renderer(item);
      this._containerSelector.append(renderItem);
    });
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }
}
