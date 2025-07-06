export interface BusinessData {
  name: string
  location: string
  googleRating: number
  totalReviews: number
  seoHeadline: string
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getBusinessInsights(name: string, location: string): Promise<BusinessData> {
  // Simulate API call delay
  await delay(1500)
  
  // Generate realistic business data
  const rating = Number((Math.random() * 2 + 3).toFixed(1)) // 3.0 - 5.0
  const reviews = Math.floor(Math.random() * 500) + 50 // 50 - 550 reviews
  
  const seoHeadlines = [
    `Top-Rated ${name} in ${location} - Trusted by Local Customers`,
    `${name} | Premium Services in ${location} - 5-Star Reviews`,
    `Best ${name} Near You in ${location} - Expert Solutions & Service`,
    `${location}'s Premier ${name} - Quality Service Since Day One`,
    `${name} in ${location} - Your Trusted Local Business Partner`
  ]
  
  return {
    name,
    location,
    googleRating: rating,
    totalReviews: reviews,
    seoHeadline: seoHeadlines[Math.floor(Math.random() * seoHeadlines.length)]
  }
}

export async function regenerateSeoHeadline(name: string, location: string): Promise<string> {
  // Simulate API call delay
  await delay(1000)
  
  const headlines = [
    `${name} ${location} - Your Local Business Solution Experts`,
    `Professional ${name} Services in ${location} - Call Today!`,
    `${location}'s #1 ${name} - Exceptional Service Guaranteed`,
    `Trusted ${name} in ${location} - Quality You Can Count On`,
    `${name} | Serving ${location} with Excellence & Integrity`,
    `Award-Winning ${name} in ${location} - Book Your Appointment`,
    `${location}'s Most Reliable ${name} - Customer Satisfaction First`
  ]
  
  return headlines[Math.floor(Math.random() * headlines.length)]
}