export interface ColorStop {
  color: string;
  position: number;
}

export interface Keyframe {
  position: number;
  properties: {
    [key: string]: string;
  };
}

export interface FlexItem {
  flex: string;
  order: number;
  alignSelf: string;
  width: string;
  height: string;
}