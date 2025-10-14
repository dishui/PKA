import { ReactNode } from 'react'

interface SectionHeaderProps {
  icon?: ReactNode
  title: string
  description: string
  actionText?: string
  className?: string
}

/**
 * SectionHeader - Reusable section header component
 * Displays icon, title, description, and optional action text
 */
export default function SectionHeader({
  icon,
  title,
  description,
  actionText,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-10 ${className}`}>
      {icon && (
        <div className="inline-flex items-center justify-center mb-4">
          {icon}
        </div>
      )}

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>

      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {description}
        {actionText && (
          <span className="block mt-1 text-lg text-emerald-600 font-medium">
            {actionText}
          </span>
        )}
      </p>
    </div>
  )
}

