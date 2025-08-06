import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Van Velzen Auto Recycling
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>
                Professional auto recycling services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We provide comprehensive auto recycling solutions with environmental responsibility.
              </p>
              <Button className="mt-4">Learn More</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
              <CardDescription>
                What we offer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Vehicle Recycling</li>
                <li>• Parts Recovery</li>
                <li>• Environmental Compliance</li>
                <li>• Documentation Services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Get in touch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ready to recycle your vehicle? Contact us today.
              </p>
              <Button variant="outline">Contact Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
