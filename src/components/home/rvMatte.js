
export function buildMatteData(art) {
  const data = JSON.parse(JSON.stringify(art));
  const comp = data.assets.find((a) => a.layers);
  const board = comp.layers.find((l) => l.nm === "Crane");
  if (!board) throw new Error("buildMatteData: board layer 'Crane' not found");

  const letters = findGroup(board.shapes, "RV Logo Text");
  if (!letters) throw new Error("buildMatteData: group 'RV Logo Text' not found");

  const contours = [];
  collectPaths(letters.it, contours);

  const size = 8000; // far larger than anything the camera ever sees
  const cx = 266;
  const cy = 360;
  const sheet = {
    ty: "sh",
    nm: "Sheet",
    ks: {
      a: 0,
      k: {
        c: true,
        v: [[cx - size, cy - size], [cx + size, cy - size], [cx + size, cy + size], [cx - size, cy + size]],
        i: [[0, 0], [0, 0], [0, 0], [0, 0]],
        o: [[0, 0], [0, 0], [0, 0], [0, 0]],
      },
    },
  };

  const group = {
    ty: "gr",
    nm: "Matte",
    it: [
      sheet,
      ...contours,
      { ty: "fl", nm: "Fill", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 2 },
      {
        ty: "tr",
        p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] },
        r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 },
      },
    ],
  };

  comp.layers = [{ ...board, nm: "Matte", shapes: [group], hd: false }];

  for (const layer of data.layers) {
    if (layer.refId) delete layer.layers;
  }
  return data;
}

function findGroup(items, name) {
  for (const it of items) {
    if (it.ty === "gr") {
      if (it.nm === name) return it;
      const hit = findGroup(it.it, name);
      if (hit) return hit;
    }
  }
  return null;
}

function collectPaths(items, out) {
  for (const it of items) {
    if (it.ty === "sh") out.push(JSON.parse(JSON.stringify(it)));
    else if (it.ty === "gr") collectPaths(it.it, out);
  }
}