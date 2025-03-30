
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Users, TrendingUp, ThumbsUp, Award, Reply, Share, Search } from "lucide-react";

const Community = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">Connect with other investors and share insights</p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Discussion Forums</CardTitle>
                  <CardDescription>Join conversations about investing</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search discussions..."
                    className="w-full sm:w-[250px] pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="trending">
                <TabsList className="mb-4">
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                
                <TabsContent value="trending" className="space-y-4">
                  {[
                    {
                      id: 1,
                      author: { name: "Alex Johnson", avatar: "AJ", reputation: "Verified Analyst" },
                      title: "Market outlook following the Fed's latest announcement",
                      content: "What's everyone's take on how the market will react to the Fed's decision to keep rates steady? I'm seeing mixed signals across different sectors.",
                      category: "Market Discussion",
                      comments: 32,
                      upvotes: 178,
                      time: "3h ago"
                    },
                    {
                      id: 2,
                      author: { name: "Maya Rodriguez", avatar: "MR", reputation: "Top Contributor" },
                      title: "Portfolio hedging strategies in a volatile market",
                      content: "I've been experimenting with different hedging approaches to protect against the recent volatility. Anyone using options or inverse ETFs as part of their strategy?",
                      category: "Strategy",
                      comments: 45,
                      upvotes: 243,
                      time: "5h ago"
                    },
                    {
                      id: 3,
                      author: { name: "Raj Patel", avatar: "RP", reputation: "Technical Analyst" },
                      title: "Technical analysis of key support/resistance levels for major indices",
                      content: "I've put together a technical analysis of the S&P 500 and Nasdaq with key levels to watch. Happy to share my charts if anyone's interested.",
                      category: "Technical Analysis",
                      comments: 28,
                      upvotes: 156,
                      time: "8h ago"
                    },
                    {
                      id: 4,
                      author: { name: "Sarah Kim", avatar: "SK", reputation: "Dividend Investor" },
                      title: "High-yield dividend stocks that are actually worth buying",
                      content: "Not all high-yield stocks are created equal. Here's my analysis of 5 dividend payers that offer both yield and growth potential in the current environment.",
                      category: "Dividend Investing",
                      comments: 52,
                      upvotes: 289,
                      time: "10h ago"
                    },
                  ].map((post) => (
                    <div key={post.id} className="border border-gray-800 rounded-lg hover:border-gray-700 transition-colors p-4">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-900 text-blue-100">
                              {post.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{post.author.name}</div>
                            <div className="text-xs text-gray-400">{post.author.reputation}</div>
                          </div>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      
                      <h3 className="font-medium mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-300 mb-4">{post.content}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>{post.upvotes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <div>{post.time}</div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="recent">
                  <div className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-lg font-medium mb-2">Recent posts will appear here</h3>
                    <p className="text-gray-400 mb-4">
                      View the latest discussions from the community
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="following">
                  <div className="p-8 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-lg font-medium mb-2">Follow topics and users</h3>
                    <p className="text-gray-400 mb-4">
                      Content from topics and users you follow will appear here
                    </p>
                    <Button variant="outline">
                      Discover Users to Follow
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Leaderboard</CardTitle>
              <CardDescription>Top contributors this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sarah Kim", avatar: "SK", points: 2450, badge: "Expert" },
                  { name: "Alex Johnson", avatar: "AJ", points: 2180, badge: "Analyst" },
                  { name: "Maya Rodriguez", avatar: "MR", points: 1950, badge: "Contributor" },
                  { name: "Raj Patel", avatar: "RP", points: 1820, badge: "Technical" },
                  { name: "Jordan Lee", avatar: "JL", points: 1740, badge: "Contributor" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 text-center text-sm font-medium text-gray-400">
                        {i + 1}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-900 text-blue-100">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.points} points</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.badge}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
              <CardDescription>Trending discussion categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Market Analysis", posts: 324, trending: true },
                  { name: "Cryptocurrencies", posts: 256, trending: true },
                  { name: "Economic News", posts: 198, trending: false },
                  { name: "Technical Analysis", posts: 165, trending: false },
                  { name: "Portfolio Strategies", posts: 142, trending: true },
                  { name: "Retirement Planning", posts: 127, trending: false },
                ].map((topic, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 hover:bg-gray-900 rounded-md transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="text-sm">{topic.name}</div>
                      {topic.trending && (
                        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{topic.posts} posts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
