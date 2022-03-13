import {ShaderCanvas, toStrictUniforms} from './shaderCanvas'
import {interpolateUniforms} from './timeline'

export const theaninovaStateDefault = toStrictUniforms({
  margin: 3.7,
  bloomFactor: 8,
  pinkBlueMix: 1,

  position: [0, 0],

  circle1Rotation: 0,
  circle1Radius: 27.65,

  circle2Rotation: 0,
  circle2Offset: [8.21, -8.01],
  circle2RadiusOffset: -6,
  circle2RadiusMix: 0,

  circle3Rotation: 63.5,
  circle3Offset: [7.87, 2.7],
  circle3RadiusOffset: -10,
  circle3RadiusMix: 0,

  circle4Rotation: -19.8,
  circle4Offset: [10.2, 0.3],
  circle4RadiusOffset: -15.4,
})

export const theaninovaStateMultiCircles = toStrictUniforms({
  margin: 3.96,
  bloomFactor: 12.1,
  pinkBlueMix: 0,

  position: [0, 0],

  circle1Rotation: 133,
  circle1Radius: 27.65,

  circle2Rotation: -116.3,
  circle2Offset: [5.3, -4.6],
  circle2RadiusOffset: -4.7,
  circle2RadiusMix: 1,

  circle3Rotation: 252.5,
  circle3Offset: [5.4, 2.7],
  circle3RadiusOffset: -8.3,
  circle3RadiusMix: 1,

  circle4Rotation: -742.681,
  circle4Offset: [4.6, 0.3],
  circle4RadiusOffset: -6.6,
})

export const theaninovaStateSecondEnd = toStrictUniforms({
  margin: 8.98,
  bloomFactor: 17.1,
  pinkBlueMix: 1,

  position: [0, 0],

  circle1Rotation: 437.3,
  circle1Radius: 27.65,

  circle2Rotation: -51.5,
  circle2Offset: [-5.43, -1.95],
  circle2RadiusOffset: -2.7,
  circle2RadiusMix: 1,

  circle3Rotation: -211.7,
  circle3Offset: [-2.32, 2.7],
  circle3RadiusOffset: -2.56,
  circle3RadiusMix: 1,

  circle4Rotation: 147.7,
  circle4Offset: [6.994_67, 1.6],
  circle4RadiusOffset: -9.18,
})

export const theaninovaColors = toStrictUniforms({
  backgroundColor: [0x17 / 255, 0x1c / 255, 0x14 / 255],
  greenishColor: [0x2a / 255, 0x33 / 255, 0x26 / 255],
  aquaColor: [0x5a / 255, 0xd0 / 255, 0xd1 / 255],
  pinkColor: [0xe9 / 255, 0x4c / 255, 0xda / 255],
})

export function theaninovaInterpolateState(delta: number, canvas: ShaderCanvas) {
  if (delta < 0.25) {
    interpolateUniforms(delta, 0.25, theaninovaStateDefault, theaninovaStateMultiCircles, canvas)
  } else if (delta < 0.75) {
    interpolateUniforms(delta - 0.25, 0.5, theaninovaStateMultiCircles, theaninovaStateSecondEnd, canvas)
  } else {
    interpolateUniforms(delta - 0.75, 0.25, theaninovaStateSecondEnd, theaninovaStateDefault, canvas)
  }
}
