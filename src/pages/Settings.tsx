
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Shield, Eye, EyeOff, FileText, HelpCircle, LogOut } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="sm:w-full md:w-auto overflow-auto">
          <TabsList className="mb-4 flex md:inline-flex">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" /> Help
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">First Name</label>
                        <Input defaultValue="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Last Name</label>
                        <Input defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email Address</label>
                      <Input defaultValue="john.doe@example.com" type="email" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone Number</label>
                      <Input defaultValue="+1 (555) 123-4567" type="tel" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Biography</label>
                      <textarea 
                        className="w-full p-2 rounded-md border border-gray-800 bg-gray-900 min-h-[100px]"
                        placeholder="Tell us about yourself"
                        defaultValue="I'm an enthusiastic investor focused on long-term growth and dividend investing. I have been investing for over 5 years with a focus on technology and healthcare sectors."
                      ></textarea>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your photo</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-400 to-indigo-600">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">Upload New Picture</Button>
                    <Button variant="ghost" className="w-full text-red-500 hover:text-red-400 hover:bg-red-900/10">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Investment Profile</CardTitle>
                  <CardDescription>Your investment preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Experience Level</label>
                      <select className="w-full border border-gray-800 bg-gray-900 rounded-md p-2 text-sm">
                        <option>Beginner</option>
                        <option selected>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Investment Goals</label>
                      <select className="w-full border border-gray-800 bg-gray-900 rounded-md p-2 text-sm">
                        <option>Long-term Growth</option>
                        <option selected>Balanced Growth</option>
                        <option>Income Generation</option>
                        <option>Capital Preservation</option>
                        <option>Aggressive Growth</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Risk Tolerance</label>
                      <select className="w-full border border-gray-800 bg-gray-900 rounded-md p-2 text-sm">
                        <option>Conservative</option>
                        <option>Moderately Conservative</option>
                        <option selected>Moderate</option>
                        <option>Moderately Aggressive</option>
                        <option>Aggressive</option>
                      </select>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="w-full">Update Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Current Password</label>
                      <div className="relative">
                        <Input type="password" defaultValue="••••••••••••" />
                        <Eye className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">New Password</label>
                      <div className="relative">
                        <Input type="password" placeholder="Enter new password" />
                        <EyeOff className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Confirm New Password</label>
                      <div className="relative">
                        <Input type="password" placeholder="Confirm new password" />
                        <EyeOff className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button>Change Password</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="font-medium mb-1">Authenticator App</h4>
                      <p className="text-sm text-gray-400">
                        Use an authenticator app to generate verification codes.
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium mb-1">SMS Authentication</h4>
                      <p className="text-sm text-gray-400">
                        Receive verification codes via text message.
                      </p>
                    </div>
                    <Switch checked={false} />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>Manage your active sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { device: "Chrome on Windows", location: "New York, USA", active: true, time: "Now" },
                      { device: "Safari on iPhone", location: "New York, USA", active: false, time: "1 day ago" },
                      { device: "Firefox on MacOS", location: "Boston, USA", active: false, time: "5 days ago" },
                    ].map((session, i) => (
                      <div key={i} className="flex justify-between items-start p-3 bg-gray-900 rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{session.device}</h4>
                            {session.active && (
                              <span className="text-xs bg-green-900/30 text-green-500 py-0.5 px-1.5 rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {session.location} • {session.time}
                          </div>
                        </div>
                        {!session.active && (
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-900/10">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-900/10 border-red-900/50">
                <CardHeader>
                  <CardTitle className="text-red-500">Delete Account</CardTitle>
                  <CardDescription>Permanently delete your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">
                    Once you delete your account, there is no going back. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage your notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Price Alerts", description: "Receive alerts when assets reach target price", enabled: true },
                      { label: "Portfolio Updates", description: "Daily summary of your portfolio performance", enabled: true },
                      { label: "Market News", description: "Important news relevant to your holdings", enabled: true },
                      { label: "Security Alerts", description: "Account security and login notifications", enabled: true },
                      { label: "Product Updates", description: "New features and platform improvements", enabled: false },
                      { label: "Marketing", description: "Promotional and marketing communications", enabled: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{item.label}</h4>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <Switch checked={item.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Push Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Price Alerts", description: "Receive alerts when assets reach target price", enabled: true },
                      { label: "Portfolio Updates", description: "Daily summary of your portfolio performance", enabled: false },
                      { label: "Market News", description: "Important news relevant to your holdings", enabled: true },
                      { label: "Security Alerts", description: "Account security and login notifications", enabled: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{item.label}</h4>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <Switch checked={item.enabled} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control how your information is used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Public Profile", description: "Allow other users to view your profile", enabled: true },
                    { label: "Show Portfolio", description: "Share your portfolio with other users", enabled: false },
                    { label: "Show Activity", description: "Show your trading activity in the community", enabled: false },
                    { label: "Data Analytics", description: "Allow us to analyze your usage for better recommendations", enabled: true },
                    { label: "Personalized Content", description: "Receive content tailored to your interests", enabled: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{item.label}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                      <Switch checked={item.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Manage your data and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-gray-800">
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Export Your Data
                    </h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Download a copy of all your data, including profile information, portfolio, and activity.
                    </p>
                    <Button variant="outline" size="sm">Export Data</Button>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-800">
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Cookie Preferences
                    </h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Manage which cookies and tracking technologies we can use.
                    </p>
                    <Button variant="outline" size="sm">Manage Cookies</Button>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-800">
                    <h4 className="font-medium mb-1 flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Deactivate Account
                    </h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Temporarily deactivate your account and hide your profile.
                    </p>
                    <Button variant="outline" size="sm" className="text-yellow-500 border-yellow-900 hover:bg-yellow-900/10">Deactivate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="help">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        question: "How do I connect my brokerage account?", 
                        answer: "You can connect your brokerage account by going to Settings > Integrations and selecting your provider from the list of supported brokerages. Follow the authentication steps to securely link your account."
                      },
                      { 
                        question: "Are my financial data and personal information secure?", 
                        answer: "Yes, we use industry-standard encryption and security measures to protect your data. We never store your brokerage credentials, and all connections are made through secure APIs with read-only access by default."
                      },
                      { 
                        question: "How often is my portfolio data updated?", 
                        answer: "Portfolio data is updated in real-time during market hours. Outside of market hours, the data represents the latest closing values. Historical performance is updated at the end of each trading day."
                      },
                      { 
                        question: "How do I customize my dashboard?", 
                        answer: "You can customize your dashboard by clicking the 'Customize' button in the top right corner of the dashboard. This allows you to add, remove, and rearrange widgets to suit your preferences."
                      },
                      { 
                        question: "Can I track investments from multiple accounts?", 
                        answer: "Yes, you can connect multiple brokerage accounts and view them separately or as a consolidated portfolio. Go to Settings > Accounts to manage your connected accounts."
                      },
                    ].map((item, i) => (
                      <div key={i} className="border border-gray-800 rounded-lg p-4">
                        <h4 className="font-medium mb-2">{item.question}</h4>
                        <p className="text-sm text-gray-300">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help from our team</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Subject</label>
                      <select className="w-full border border-gray-800 bg-gray-900 rounded-md p-2 text-sm">
                        <option>Account Issue</option>
                        <option>Technical Problem</option>
                        <option>Billing Inquiry</option>
                        <option>Feature Request</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Message</label>
                      <textarea
                        className="w-full p-2 rounded-md border border-gray-800 bg-gray-900 min-h-[120px]"
                        placeholder="Describe your issue or question in detail"
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">Send Message</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Helpful documentation and guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: "User Guide", description: "Complete platform documentation" },
                      { title: "Video Tutorials", description: "Step-by-step guidance videos" },
                      { title: "Investment Guides", description: "Educational resources for investors" },
                      { title: "API Documentation", description: "For developers and integrations" },
                    ].map((resource, i) => (
                      <div key={i} className="p-3 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-400">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
