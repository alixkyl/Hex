onmessage = (event) => {
    const data = event.data;
    let result = data.bSplineSurface.tessellatePoints(data.resolution);
    postMessage(result);
};
//# sourceMappingURL=worker.js.map