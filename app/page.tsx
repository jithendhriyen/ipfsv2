import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to IPFS Browser</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore and interact with IPFS content in a beautiful, modern interface
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/protected">Browse IPFS</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>🔍 Search IPFS</CardTitle>
              <CardDescription>
                Search and discover content across the IPFS network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Find files, websites, and data stored on IPFS using our powerful search interface.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>💾 Save Content</CardTitle>
              <CardDescription>
                Save your favorite IPFS content for easy access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Keep track of important IPFS content with our built-in bookmarking system.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>🌐 Modern Interface</CardTitle>
              <CardDescription>
                Beautiful, responsive design with dark/light themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enjoy a modern web experience with our sleek, user-friendly interface.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
