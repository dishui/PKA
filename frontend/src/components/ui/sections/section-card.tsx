import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface SectionCardProps {
  // Content
  icon?: ReactNode
  iconGradient?: string
  badge?: {
    text: string
    bgColor?: string
    textColor?: string
  }
  title: string
  description?: string
  
  // Footer/Status
  statusIndicator?: {
    text: string
    color?: 'green' | 'blue' | 'red' | 'yellow' | 'orange'
    gradient?: string // Custom gradient for dot
    showDot?: boolean
  }
  showArrow?: boolean
  
  // Styling
  height?: string
  backgroundColor?: string
  hoverEffect?: boolean
  hoverBackgroundGradient?: string // Custom hover background gradient
  hoverOverlayGradient?: string // Custom hover overlay gradient
  className?: string
  gridSpan?: string // For grid layout (col-span-2, row-span-2, etc.)
  animationDelay?: number // For staggered animations
  
  // Interaction
  onClick?: () => void
  href?: string // For link wrapper
}

/**
 * SectionCard - Highly configurable card component
 * Supports grid layout, custom gradients, and link wrapper
 */
export default function SectionCard({
  icon,
  iconGradient = 'from-blue-500 to-purple-600',
  badge,
  title,
  description,
  statusIndicator,
  showArrow = true,
  height = 'h-[280px]',
  backgroundColor = 'bg-white',
  hoverEffect = true,
  hoverBackgroundGradient,
  hoverOverlayGradient,
  className = '',
  gridSpan = '',
  animationDelay = 0,
  onClick,
  href,
}: SectionCardProps) {
  const statusColorClasses = {
    green: 'bg-green-500 text-green-600',
    blue: 'bg-blue-500 text-blue-600',
    red: 'bg-red-500 text-red-600',
    yellow: 'bg-yellow-500 text-yellow-600',
    orange: 'bg-orange-500 text-orange-600',
  }

  const hoverClasses = hoverEffect
    ? 'hover:shadow-xl hover:-translate-y-1 hover:cursor-pointer'
    : ''

  const cardContent = (
    <div
      onClick={onClick}
      className={`group relative ${backgroundColor} rounded-xl shadow-xl border border-gray-300 transition-all duration-300 ${hoverClasses} animate-fade-in overflow-hidden ${height} ${!href ? gridSpan : ''} w-full mx-auto flex flex-col ${className}`}
      style={{ marginTop: '8px', animationDelay: `${animationDelay}s` }}
    >
      {/* Hover Background Gradient (custom or default) */}
      {hoverBackgroundGradient ? (
        <div className={`absolute inset-0 bg-gradient-to-br ${hoverBackgroundGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
      )}

      {/* Content */}
      <div className="relative p-6 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Icon */}
          {icon && (
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${iconGradient} mb-3 group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
          )}

          {badge && (
            <div className="block mb-3">
              <span className={`inline-block px-3 py-1 ${badge.bgColor || 'bg-blue-50'} ${badge.textColor || 'text-blue-700'} text-xs font-semibold rounded-full`}>
                {badge.text}
              </span>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600/80 transition-colors line-clamp-2">
            {title}
          </h3>

          {description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 overflow-hidden">
              {description}
            </p>
          )}
        </div>

        {/* Footer */}
        {(statusIndicator || showArrow) && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            {/* Status Indicator */}
            {statusIndicator && (
              <div className="flex items-center text-sm">
                {statusIndicator.showDot !== false && (
                  statusIndicator.gradient ? (
                    <div className={`w-2 h-2 bg-gradient-to-r ${statusIndicator.gradient} rounded-full mr-2`}></div>
                  ) : (
                    <div className={`w-3 h-3 rounded-full mr-2 ${statusColorClasses[statusIndicator.color || 'green'].split(' ')[0]} animate-pulse`}></div>
                  )
                )}
                <span className={`font-semibold ${statusColorClasses[statusIndicator.color || 'green'].split(' ')[1]}`}>
                  {statusIndicator.text}
                </span>
              </div>
            )}

            {/* Arrow Icon */}
            {showArrow && (
              <div className="text-gray-400 group-hover:text-teal-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hover Overlay (custom or default) */}
      {hoverOverlayGradient ? (
        <div className={`absolute inset-0 bg-gradient-to-r ${hoverOverlayGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-2xl`}></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  )

  // Wrap in Link if href is provided
  return href ? (
    <Link href={href} className={gridSpan}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}

