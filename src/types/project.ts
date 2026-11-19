export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  category: string
  year: number
  cover_image_path: string | null
  technologies: string[]
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
  image_url?: string | null
}