import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Users, RefreshCw, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { regenerateSeoHeadline } from '../services/businessApi'
import type { BusinessData } from '../services/businessApi'

interface BusinessCardProps {
  businessData: BusinessData
}

export default function BusinessCard({ businessData }: BusinessCardProps) {
  const [seoHeadline, setSeoHeadline] = useState(businessData.seoHeadline)
  const [regenerating, setRegenerating] = useState(false)

  const handleRegenerateSeo = async () => {
    setRegenerating(true)
    try {
      const newHeadline = await regenerateSeoHeadline(businessData.name, businessData.location)
      setSeoHeadline(newHeadline)
      toast.success("SEO headline regenerated!")
    } catch (error) {
      toast.error("Failed to regenerate SEO headline")
      console.error('SEO regeneration error:', error)
    } finally {
      setRegenerating(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? "fill-warning text-warning" 
            : i < rating 
            ? "fill-warning/50 text-warning" 
            : "text-muted-foreground"
        }`}
      />
    ))
  }

  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl text-business-primary">
              {businessData.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <MapPin className="h-4 w-4" />
              {businessData.location}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm">
            Business Profile
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Rating Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" />
            Google Rating & Reviews
          </h3>
          <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-business-primary">
                {businessData.googleRating}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(businessData.googleRating)}
              </div>
            </div>
            <Separator orientation="vertical" className="h-16" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{businessData.totalReviews} reviews</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Based on Google My Business data
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* SEO Headline Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-business-secondary" />
              AI-Generated SEO Headline
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerateSeo}
              disabled={regenerating}
              className="gap-2"
            >
              {regenerating ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Regenerate
            </Button>
          </div>
          <div className="p-4 bg-gradient-secondary/10 border border-business-secondary/20 rounded-lg">
            <p className="text-lg font-medium text-business-secondary leading-relaxed">
              "{seoHeadline}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Optimized for search engines and local discovery
            </p>
          </div>
        </div>

        {/* Business Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">A+</div>
            <div className="text-sm text-muted-foreground">Rating Grade</div>
          </div>
          <div className="text-center p-3 bg-info/10 rounded-lg border border-info/20">
            <div className="text-2xl font-bold text-info">85%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">High</div>
            <div className="text-sm text-muted-foreground">SEO Potential</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}