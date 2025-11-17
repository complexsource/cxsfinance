'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Button {
  buttonText: string;
  buttonLink: string;
  buttonStyle: 'primary' | 'secondary' | 'outline';
  openInNewTab?: boolean;
}

interface Media {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface BannerBlockProps {
  bannerType: 'hero' | 'standard' | 'minimal';
  heading: string;
  subheading?: string;
  description?: any;
  backgroundImage?: Media;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
  textAlignment: 'left' | 'center' | 'right';
  textColor: 'dark' | 'light';
  buttons?: Button[];
  height: 'small' | 'medium' | 'large' | 'fullscreen';
}

export default function BannerBlock({
  bannerType,
  heading,
  subheading,
  backgroundImage,
  backgroundOverlay,
  overlayOpacity = 50,
  textAlignment,
  textColor,
  buttons,
  height,
}: BannerBlockProps) {
  // Map height to actual CSS values
  const heightMap = {
    small: '300px',
    medium: '500px',
    large: '700px',
    fullscreen: '100vh',
  };

  // Button style classes
  const buttonStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all',
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: heightMap[height],
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt || ''}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      {/* Overlay */}
      {backgroundOverlay && backgroundImage && (
        <div
          className="absolute inset-0 z-10 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content */}
      <div
        className={`relative z-20 container mx-auto px-4 h-full flex items-center`}
        style={{
          minHeight: heightMap[height],
        }}
      >
        <div
          className={`max-w-4xl ${
            textAlignment === 'center'
              ? 'mx-auto text-center'
              : textAlignment === 'right'
              ? 'ml-auto text-right'
              : 'text-left'
          }`}
        >
          {/* Heading */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              textColor === 'light' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {heading}
          </h1>

          {/* Subheading */}
          {subheading && (
            <p
              className={`text-xl md:text-2xl mb-8 ${
                textColor === 'light' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {subheading}
            </p>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div
              className={`flex gap-4 ${
                textAlignment === 'center'
                  ? 'justify-center'
                  : textAlignment === 'right'
                  ? 'justify-end'
                  : 'justify-start'
              } flex-wrap`}
            >
              {buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.buttonLink}
                  target={button.openInNewTab ? '_blank' : undefined}
                  rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
                  className={buttonStyles[button.buttonStyle]}
                >
                  {button.buttonText}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}