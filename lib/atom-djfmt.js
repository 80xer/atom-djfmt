'use babel';

import AtomDjfmtView from './atom-djfmt-view';
import { CompositeDisposable } from 'atom';

export default {

  atomDjfmtView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomDjfmtView = new AtomDjfmtView(state.atomDjfmtViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDjfmtView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-djfmt:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDjfmtView.destroy();
  },

  serialize() {
    return {
      atomDjfmtViewState: this.atomDjfmtView.serialize()
    };
  },

  toggle() {
    console.log('AtomDjfmt was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
