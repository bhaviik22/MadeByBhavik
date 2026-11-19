import { useEffect, useState } from 'react'
import { AboutPage } from '../components/AboutPage'
import ContactSection from '../components/ContactSection'
import HeroSection from '../components/HeroSection'
import ServiceSection from '../components/ServiceSection'
import WorkSection from '../components/WorkSection'
import { getProjects, getServices, getSiteContent } from '../services/projectService'
import type { Project } from '../types/project'
import type { Service } from '../types/service'

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [siteContent, setSiteContent] = useState<unknown[]>([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)
  const [isServicesLoading, setIsServicesLoading] = useState(true)
  const [isSiteContentLoading, setIsSiteContentLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();

        setProjects(result?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsProjectsLoading(false)
      }
    };

    const fetchServices = async () => {
      try {
        const result = await getServices()

        setServices(result?.data ?? []);
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setIsServicesLoading(false)
      }
    }

    const fetchSiteContent = async () => {
      try {
        const result = await getSiteContent()
        const content = Array.isArray(result) ? result : result?.data
        setSiteContent(Array.isArray(content) ? content : [])
      } catch (error) {
        console.error('Failed to fetch site content:', error)
      } finally {
        setIsSiteContentLoading(false)
      }
    }

    fetchProjects()
    fetchServices()
    fetchSiteContent()
  }, []);

  return (
    <>
      <HeroSection siteContent={siteContent} isLoading={isSiteContentLoading} />
      <ServiceSection services={services} isLoading={isServicesLoading} />
      <WorkSection projects={projects} isLoading={isProjectsLoading} />
      <AboutPage siteContent={siteContent} isLoading={isSiteContentLoading} />
      <ContactSection />
    </>
  )
}