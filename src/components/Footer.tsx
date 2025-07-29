export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Component Library</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive dashboard showcasing reusable components, data visualization, and theme customization.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Interactive data tables</li>
              <li>• Dynamic charts and graphs</li>
              <li>• Customizable themes</li>
              <li>• Responsive design</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Technology</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• React + TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Shadcn/ui Components</li>
              <li>• Recharts & D3</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using modern web technologies
          </p>
        </div>
      </div>
    </footer>
  )
}