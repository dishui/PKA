interface StatItem {
  id: number | string
  value: string
  label: string
  color: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'red' | 'yellow' | 'emerald'
}

interface SectionStatsProps {
  stats: readonly StatItem[]
  className?: string
}

/**
 * SectionStats - Reusable stats grid component
 * Displays statistics in a 4-column responsive grid
 */
export default function SectionStats({ stats, className = '' }: SectionStatsProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    teal: 'text-teal-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    emerald: 'text-emerald-600',
  }

  return (
    <div className={`hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-8 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <div className={`text-2xl font-bold ${colorClasses[stat.color]} mb-1`}>
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

