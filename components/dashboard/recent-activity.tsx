import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ActivityItem {
  id: string
  type: string
  content: string
  timestamp: string
}

interface RecentActivityProps {
  data: ActivityItem[]
}

export function RecentActivity({ data }: RecentActivityProps) {
  const getInitials = (type: string) => {
    switch (type) {
      case "quote":
        return "OF"
      case "vehicle":
        return "VO"
      case "pickup":
        return "OP"
      case "payment":
        return "BE"
      case "vrijwaring":
        return "VR"
      case "recycling":
        return "RE"
      default:
        return "AC"
    }
  }

  const getAvatarColor = (type: string) => {
    switch (type) {
      case "quote":
        return "bg-blue-500"
      case "vehicle":
        return "bg-green-500"
      case "pickup":
        return "bg-yellow-500"
      case "payment":
        return "bg-purple-500"
      case "vrijwaring":
        return "bg-red-500"
      case "recycling":
        return "bg-teal-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-8">
      {data.map((item) => (
        <div key={item.id} className="flex items-center">
          <Avatar className={`h-9 w-9 ${getAvatarColor(item.type)}`}>
            <AvatarFallback>{getInitials(item.type)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.content}</p>
            <p className="text-sm text-muted-foreground">{formatDate(item.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
