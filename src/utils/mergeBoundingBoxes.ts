import BBox from '@/models/BBox';

const mergeBoundingBoxes = (boundingBoxes: BBox[]): BBox => {
  let minLeft: number = 180;
  let minBottom: number = 90;
  let maxRight: number = -180;
  let maxTop: number = -90;

  boundingBoxes.forEach(([left, bottom, right, top]) => {
    if (left < minLeft) minLeft = left;
    if (bottom < minBottom) minBottom = bottom;
    if (right > maxRight) maxRight = right;
    if (top > maxTop) maxTop = top;
  });

  return [minLeft, minBottom, maxRight, maxTop];
};

export default mergeBoundingBoxes;
