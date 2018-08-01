import { nurbs } from '@bluemath/geom';

onmessage = (event: MessageEvent) => {
    const data: { bSplineSurface: nurbs.BSplineSurface, resolution: number } = event.data;
    let result =data.bSplineSurface.tessellatePoints(data.resolution);
    postMessage(result);
};