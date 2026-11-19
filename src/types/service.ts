export interface Service {
  id: string
  title: string
  description: string
  icon_key: string | null
  sort_order: number
  is_published: boolean
  created_at: string
  updated_at: string
  teck_stack: string | null
}
