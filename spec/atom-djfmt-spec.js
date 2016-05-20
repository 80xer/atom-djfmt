'use babel';

import AtomDjfmt from '../lib/atom-djfmt';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomDjfmt', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-djfmt');
  });

  describe('when the atom-djfmt:pythonToQuery event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-djfmt')).not.toExist();

      waitsForPromise(() => {
        return activationPromise;
      });


      // runs(() => {
      //   expect(workspaceElement.querySelector('.atom-djfmt')).toExist();
      //
      //   let atomDjfmtElement = workspaceElement.querySelector('.atom-djfmt');
      //   expect(atomDjfmtElement).toExist();
      //
      //   let atomDjfmtPanel = atom.workspace.panelForItem(atomDjfmtElement);
      //   atom.commands.dispatch(workspaceElement, 'atom-djfmt:pythonToQuery');
      //   expect(atomDjfmtPanel.isVisible()).toBe(true);
      //   setTimeout(function() {
      //     expect(atomDjfmtPanel.isVisible()).toBe(false);
      //   }, 2000);
      // });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.atom-djfmt')).not.toExist();

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        atom.commands.dispatch(workspaceElement, 'atom-djfmt:pythonToQuery');
        let atomDjfmtElement = workspaceElement.querySelector('.atom-djfmt');
        expect(atomDjfmtElement).toBeVisible();
        setTimeout(function() {
          atom.commands.dispatch(workspaceElement, 'atom-djfmt:pythonToQuery');
          expect(atomDjfmtElement).not.toBeVisible();
        }, 2000);
      });
    });
  });
});
