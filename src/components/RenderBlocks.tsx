'use client';

import React from 'react';
import BannerBlock from './blocks/BannerBlock';

interface Block {
  blockType: string;
  [key: string]: any;
}

interface RenderBlocksProps {
  blocks?: Block[];
}

const blockComponents: { [key: string]: React.ComponentType<any> } = {
  banner: BannerBlock,
  // Add more block components here as you create them
};

const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType];

        if (!BlockComponent) {
          console.warn(`No component found for block type: ${block.blockType}`);
          return null;
        }

        return <BlockComponent key={index} {...block} />;
      })}
    </>
  );
};

export default RenderBlocks;