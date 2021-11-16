/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { ColorValue, HsvColor } from '../utils';

export const ColorPickerContext = React.createContext<
  | {
      activeColor: ColorValue;
      setActiveColor: (
        color: ColorValue | ((prevColor: ColorValue) => ColorValue),
      ) => void;
      hsvColor: HsvColor;
      onChangeComplete?: (color: ColorValue) => void;
      applyHsvColorChange: (
        newColor: HsvColor,
        selectionChanged: boolean,
        newColorValue?: ColorValue,
      ) => void;
      showAlpha: boolean;
    }
  | undefined
>(undefined);

export const useColorPickerContext = () => {
  const context = React.useContext(ColorPickerContext);
  if (context == undefined) {
    throw new Error(
      'useColorPickerContext must be used within a ColorPickerContext.Provider',
    );
  }
  return context;
};
