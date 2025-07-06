import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Building2 } from "lucide-react"
import BusinessCard from './BusinessCard'
import { getBusinessInsights } from '../services/businessApi'
import type { BusinessData } from '../services/businessApi'

export default function Dashboard() {
  const [businessName, setBusinessName] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!businessName.trim() || !location.trim()) {
      toast.error("Please fill in both business name and location")
      return
    }

    setLoading(true)
    
    try {
      const data = await getBusinessInsights(businessName, location)
      setBusinessData(data)
      toast.success("Business insights retrieved successfully!")
    } catch (error) {
      toast.error("Failed to connect to business insights API. Please try again.")
      console.error('API Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setBusinessName('')
    setLocation('')
    setBusinessData(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="h-8 w-8 text-business-primary" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            GrowthProAI Business Insights
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Get comprehensive business insights and SEO recommendations
        </p>
      </div>

      <Card className="mb-8 shadow-card">
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Enter your business details to get insights and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  disabled={loading}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your business location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={loading}
                  className="h-12"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="flex-1 h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Insights...
                  </>
                ) : (
                  'Get Business Insights'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                disabled={loading}
                className="px-8 h-12"
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {businessData && (
        <BusinessCard businessData={businessData} />
      )}
    </div>
  )
}