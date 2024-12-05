export function StatsCards() {
    const stats = [
      {
        title: 'CPC',
        value: '20k',
        change: '+5% from yesterday',
      },
      {
        title: 'CTR',
        value: '300',
        change: '+5% from yesterday',
      },
      {
        title: 'Engagement',
        value: '5',
        change: '+2% from yesterday',
      },
      {
        title: 'Cost/Engagement',
        value: '8',
        change: '0.5% from yesterday',
      },
      {
        title: 'Impression',
        value: '5',
        change: '+2% from yesterday',
      },
    ]
  
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>
    )
  }
  
  