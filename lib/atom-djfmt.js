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
      'atom-djfmt:pythonToQuery': () => this.pythonToQuery()
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

  pythonToQuery() {
    // atom.workspace.getActiveTextEditor().selectLinesContainingCursors();
    text = atom.workspace.getActiveTextEditor().getSelectedText();
    if (text === '') return;
    text = text.split(/\r\n|\r|\n/g);
    for (var i = 0; i < text.length; i++) {
      text[i] = text[i].trim();
      if (text[i].charAt(0) === '"') text[i] = text[i].substr(1).replace(/\" \\/,'');
      if (text[i].slice(-1) === '"') text[i] = text[i].substring(0, text[i].length - 1);
    }
    result = text.join('\n');
    console.log(result);
    atom.clipboard.write(result);
    this.modalPanel.show();
    that = this;
    setTimeout(function() {
      that.modalPanel.hide();
    }, 3000);
    // console.log(text.join();
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
