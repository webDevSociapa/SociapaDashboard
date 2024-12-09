export function CampaignNames() {
  const campaigns = [
    { name: 'Target Sales', date: '12/12', value: 8923 },
    { name: 'Reality Sales', date: '8/23', value: 5721 },
    { name: 'Target Sales', date: '12/12', value: 8923 },
    { name: 'Reality Sales', date: '8/23', value: 5721 },
  ]

  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-4 text-lg font-medium">Campaign Names</h3>
      <div className="space-y-2">
        {campaigns.map((campaign, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{campaign.name}</p>
              <p className="text-sm text-gray-500">{campaign.date}</p>
            </div>
            <p className="font-medium">{campaign.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

