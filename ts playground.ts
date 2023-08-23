/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = 'Hello World';
console.log(anExampleVariable);

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

type MyColType = {
  prod: string;
  price: number;
};

type MyProps<D extends object, V = any> = {
  prop1: D;
  prop2: V;
};

type MyInterface<D extends object> = {
  sticky: 'left' | 'top' | 'right';
};

type ValueOf<T> = T[keyof T];

type MyInterfaceBsdOnValue<D extends object, V = any> = {
  testing1: MyProps<D, V>;
};

type StrictProps<D extends object> = MyInterface<D> &
  ValueOf<{
    [K in keyof D]: {
      accessor: K;
    } & MyInterfaceBsdOnValue<D, D[K]>;
  }>;

const myCols = [
  {
    accessor: 'price',
    sticky: 'left',
    testing1: {
      prop1: {
        prod: '',
        price: 1,
      },
      prop2: 1,
    },
  },
] satisfies Array<StrictProps<MyColType>>;
