import Image from 'next/image'

interface BannerBlockProps {
  heading?: string
  subheading?: string
  textAlignment?: 'left' | 'center' | 'right'
  height?: 'small' | 'medium' | 'large' | 'fullscreen'
  textColor?: 'light' | 'dark'
  backgroundImage?: {
    url?: string
    alt?: string
  } | null
}

export default function BannerBlock({
  heading = 'Welcome',
  subheading = 'Your trusted partner',
  textAlignment = 'center',
  height = 'large',
  textColor = 'light',
  backgroundImage,
}: BannerBlockProps) {
  const heightMap = {
    small: 'min-h-[300px]',
    medium: 'min-h-[500px]',
    large: 'min-h-[700px]',
    fullscreen: 'min-h-screen',
  }

  const alignmentClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <section className={`relative overflow-hidden ${heightMap[height]}`}>
      {/* Background Image */}
      {backgroundImage?.url && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt || 'Banner background'}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-60" />
        </div>
      )}

      {/* Fallback Gradient */}
      {!backgroundImage?.url && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        />
      )}

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col justify-center px-8 py-16 ${alignmentClass[textAlignment]}`}
      >
        <div className="max-w-4xl">
          <h1
            className={`
              text-4xl md:text-5xl lg:text-6xl font-bold mb-6
              ${textColor === 'light' ? 'text-white' : 'text-gray-900'}
            `}
            style={{
              textShadow: textColor === 'light' ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            {heading}
          </h1>

          <p
            className={`
              text-xl md:text-2xl lg:text-3xl
              ${textColor === 'light' ? 'text-gray-100' : 'text-gray-700'}
            `}
            style={{
              textShadow: textColor === 'light' ? '0 1px 3px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            {subheading}
          </p>
        </div>
      </div>
    </section>
  )
}
