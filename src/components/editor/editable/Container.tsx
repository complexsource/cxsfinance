'use client';

import { useNode } from '@craftjs/core';
import React from 'react';

export function Container({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref: HTMLDivElement | null) => {
  if (ref) {
    connect(drag(ref));
  }
}}
      style={style}
    >
      {children}
    </div>
  );
}

Container.craft = {
  displayName: 'Container',
};