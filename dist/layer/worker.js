onmessage = (event) => {
    const data = event.data;
    const result = data.bSplineSurface.tessellatePoints(data.resolution);
    postMessage(result);
};
//# sourceMappingURL=worker.js.map