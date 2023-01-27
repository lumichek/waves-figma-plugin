import {generate, appendCircles} from "../utils";

figma.showUI(__html__, {width: 648, height: 320});

figma.on('selectionchange', () => {
  const { selection } = figma.currentPage;

  if (selection.length) {
    const [frameNode] = selection;

    if (frameNode.type !== 'FRAME') {
      figma.ui.postMessage({ type: 'item-not-selected' });

      return;
    }

    figma.ui.postMessage({ type: 'generate-random' });
    figma.ui.postMessage({ type: 'item-selected' });
  } else {
    figma.ui.postMessage({ type: 'item-not-selected' });
  }
});

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-random') {
    const {selection} = figma.currentPage;
    const [frameNode] = selection;

    if (frameNode?.type !== 'FRAME') {
      figma.ui.postMessage({ type: 'ITEM_NOT_SELECTED' });

      return;
    }

    const {
      width: containerWidth,
      height: containerHeight
    } = frameNode;

    const generatedData = generate(containerWidth, containerHeight);

    appendCircles(frameNode, generatedData);

    figma.ui.postMessage({
      type: 'generated',
      data: generatedData
    });
  }

  if (msg.type === 'generate') {
    const {selection} = figma.currentPage;
    const [frameNode] = selection;

    if (frameNode?.type !== 'FRAME') {
      figma.ui.postMessage({ type: 'ITEM_NOT_SELECTED' });

      return;
    }

    appendCircles(frameNode, msg.data);
  }

  // figma.closePlugin();
};
