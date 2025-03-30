
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Bookmark, Award, ChevronRight, Play, CheckCircle, Lock } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Learning = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedKnowledgeLevel, setSelectedKnowledgeLevel] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  
  const courses = [
    { 
      id: 1, 
      title: "Investing Fundamentals", 
      level: "beginner", 
      moduleCount: 8, 
      duration: "4 hours", 
      completed: true,
      icon: BookOpen,
      description: "Learn the basics of investing, including key terminology, asset classes, and investment strategies.",
      modules: [
        { title: "Introduction to Investing", completed: true, duration: "30 min" },
        { title: "Understanding Risk and Return", completed: true, duration: "30 min" },
        { title: "Asset Classes Overview", completed: true, duration: "45 min" },
        { title: "Building a Portfolio", completed: true, duration: "45 min" },
        { title: "Investment Accounts", completed: true, duration: "30 min" }
      ]
    },
    { 
      id: 2, 
      title: "Stock Market Analysis", 
      level: "intermediate", 
      moduleCount: 12, 
      duration: "6 hours", 
      completed: false,
      progress: 67,
      icon: FileText,
      description: "Dive into fundamental and technical analysis methods for evaluating stocks and making informed investment decisions.",
      modules: [
        { title: "Fundamental Analysis Basics", completed: true, duration: "45 min" },
        { title: "Reading Financial Statements", completed: true, duration: "60 min" },
        { title: "Valuation Methods", completed: true, duration: "45 min" },
        { title: "Technical Analysis Introduction", completed: true, duration: "45 min" },
        { title: "Chart Patterns and Indicators", completed: false, duration: "60 min" },
        { title: "Market Cycles and Sentiment", completed: false, duration: "45 min" }
      ]
    },
    { 
      id: 3, 
      title: "Technical Analysis", 
      level: "intermediate", 
      moduleCount: 10, 
      duration: "5 hours", 
      completed: false,
      progress: 30,
      icon: FileText,
      description: "Master chart reading, pattern recognition, and technical indicators to time market entries and exits.",
      modules: [
        { title: "Chart Types and Timeframes", completed: true, duration: "45 min" },
        { title: "Support and Resistance", completed: true, duration: "30 min" },
        { title: "Moving Averages", completed: false, duration: "45 min" },
        { title: "Oscillators and Momentum", completed: false, duration: "45 min" },
        { title: "Volume Analysis", completed: false, duration: "30 min" }
      ]
    },
    { 
      id: 4, 
      title: "Advanced Portfolio Management", 
      level: "advanced", 
      moduleCount: 15, 
      duration: "8 hours", 
      completed: false,
      progress: 0,
      icon: BookOpen,
      description: "Learn sophisticated portfolio construction techniques, asset allocation strategies, and risk management methods.",
      modules: [
        { title: "Modern Portfolio Theory", completed: false, duration: "60 min", locked: true },
        { title: "Factor Investing", completed: false, duration: "45 min", locked: true },
        { title: "Portfolio Optimization", completed: false, duration: "60 min", locked: true },
        { title: "Risk Management Strategies", completed: false, duration: "45 min", locked: true }
      ]
    },
    { 
      id: 5, 
      title: "Cryptocurrency Investing", 
      level: "intermediate", 
      moduleCount: 9, 
      duration: "5 hours", 
      completed: false,
      progress: 0,
      icon: Video,
      description: "Understand blockchain technology, cryptocurrency markets, trading strategies, and security best practices.",
      modules: [
        { title: "Blockchain Fundamentals", completed: false, duration: "45 min" },
        { title: "Cryptocurrency Markets", completed: false, duration: "45 min" },
        { title: "Bitcoin and Ethereum", completed: false, duration: "60 min" },
        { title: "DeFi and NFTs", completed: false, duration: "45 min" },
        { title: "Security and Storage", completed: false, duration: "30 min" }
      ]
    },
    { 
      id: 6, 
      title: "ESG and Sustainable Investing", 
      level: "beginner", 
      moduleCount: 7, 
      duration: "3.5 hours", 
      completed: false,
      progress: 0,
      icon: BookOpen,
      description: "Learn how to invest according to environmental, social, and governance principles while aiming for competitive returns.",
      modules: [
        { title: "ESG Investment Basics", completed: false, duration: "30 min" },
        { title: "Impact Investing", completed: false, duration: "45 min" },
        { title: "ESG Ratings and Criteria", completed: false, duration: "45 min" },
        { title: "Building an ESG Portfolio", completed: false, duration: "60 min" }
      ]
    },
    { 
      id: 7, 
      title: "Real Estate Investment", 
      level: "intermediate", 
      moduleCount: 8, 
      duration: "4.5 hours", 
      completed: false,
      progress: 0,
      icon: Video,
      description: "Explore various real estate investment options from REITs to rental properties to real estate crowdfunding.",
      modules: [
        { title: "Real Estate Basics", completed: false, duration: "45 min" },
        { title: "REITs", completed: false, duration: "30 min" },
        { title: "Rental Properties", completed: false, duration: "60 min" },
        { title: "Commercial Real Estate", completed: false, duration: "45 min" }
      ]
    },
  ];
  
  const articles = [
    { 
      id: 1, 
      title: "Understanding Market Cycles", 
      category: "market analysis", 
      readTime: "6 min", 
      date: "Apr 10, 2023",
      saved: true,
      content: "Market cycles are predictable patterns that occur in financial markets, characterized by periods of expansion followed by contraction. Understanding these cycles is crucial for making informed investment decisions.\n\nThere are typically four phases in a market cycle: accumulation, uptrend (markup), distribution, and downtrend (markdown). Each phase presents different opportunities and risks.\n\nInvestors who recognize the current market cycle phase can adjust their strategies accordingly, potentially improving returns and reducing risk. However, timing market cycles perfectly is challenging, which is why maintaining a diversified portfolio remains important regardless of market conditions."
    },
    { 
      id: 2, 
      title: "ETFs vs. Mutual Funds: Key Differences", 
      category: "education", 
      readTime: "8 min", 
      date: "Apr 5, 2023",
      saved: false,
      content: "Both ETFs (Exchange-Traded Funds) and mutual funds offer investors a way to gain diversified exposure to assets, but they differ in several important ways.\n\nTrading mechanism: ETFs trade throughout the day like stocks, while mutual funds trade once at the end of the trading day. This gives ETFs more flexibility for intraday trading.\n\nExpense ratios: ETFs typically have lower expense ratios than mutual funds, making them more cost-effective for long-term investors.\n\nTax efficiency: ETFs are generally more tax-efficient due to their creation/redemption process, which minimizes capital gains distributions.\n\nMinimum investments: Mutual funds often require minimum investments, while ETFs can be purchased for the price of a single share.\n\nChoosing between ETFs and mutual funds depends on your investment goals, tax situation, and trading preferences."
    },
    { 
      id: 3, 
      title: "Tax-Efficient Investing Strategies", 
      category: "tax planning", 
      readTime: "10 min", 
      date: "Mar 28, 2023",
      saved: true,
      content: "Tax-efficient investing strategies can significantly impact your portfolio's net returns. Here are key approaches to minimize tax impact:\n\nUtilize tax-advantaged accounts like 401(k)s, IRAs, and HSAs to defer or eliminate taxes on investment growth.\n\nPractice tax-loss harvesting by selling investments at a loss to offset capital gains while maintaining your overall investment strategy.\n\nConsider asset location by placing tax-inefficient investments in tax-advantaged accounts and tax-efficient investments in taxable accounts.\n\nHold investments long-term (over one year) when possible to qualify for lower long-term capital gains tax rates.\n\nInvest in tax-efficient funds like index ETFs, which typically distribute fewer capital gains than actively managed funds.\n\nRemember that tax efficiency should be one consideration among many in your overall investment strategy."
    },
    { 
      id: 4, 
      title: "The Power of Compound Interest", 
      category: "education", 
      readTime: "5 min", 
      date: "Mar 22, 2023",
      saved: false,
      content: "Compound interest is often called the eighth wonder of the world, and for good reason. It's the process where interest is added to the principal sum, and from that moment on, the added interest also earns interest.\n\nThe formula for compound interest is A = P(1 + r)^t, where A is the final amount, P is the principal, r is the interest rate, and t is the time period.\n\nThe key factors that affect compound growth are:\n1. Principal amount\n2. Interest rate\n3. Time period\n4. Frequency of compounding\n\nStarting early is crucial for maximizing compound interest. Even small amounts invested early can grow significantly over time. For example, $1,000 invested at a 7% annual return will grow to approximately $7,612 after 30 years.\n\nRegular contributions dramatically enhance the power of compounding. Adding even small amounts consistently over time can lead to substantial wealth accumulation."
    },
    { 
      id: 5, 
      title: "Navigating Market Volatility", 
      category: "risk management", 
      readTime: "7 min", 
      date: "Mar 15, 2023",
      saved: false,
      content: "Market volatility is an inevitable part of investing, but it doesn't have to derail your financial plans. Here are strategies to navigate volatile markets effectively:\n\nMaintain perspective: Volatility is normal in financial markets and often creates opportunities for long-term investors.\n\nStick to your plan: Avoid making emotional decisions during market turbulence. Your investment strategy should account for periodic volatility.\n\nDiversify broadly: Spreading investments across asset classes helps reduce the impact of volatility in any single market segment.\n\nRebalance strategically: Use volatility as an opportunity to rebalance your portfolio back to your target asset allocation.\n\nDollar-cost average: Investing fixed amounts at regular intervals can help reduce the impact of volatility and potentially lower your average cost basis.\n\nKeep cash reserves: Having sufficient emergency funds prevents having to sell investments at inopportune times during market downturns.\n\nVolatility is uncomfortable but understanding its temporary nature helps maintain the discipline needed for long-term investment success."
    },
  ];
  
  const getLevelColor = (level: string) => {
    switch(level) {
      case "beginner": return "bg-green-900/20 text-green-500 border-green-800";
      case "intermediate": return "bg-yellow-900/20 text-yellow-500 border-yellow-800";
      case "advanced": return "bg-red-900/20 text-red-500 border-red-800";
      default: return "bg-gray-900/20 text-gray-500 border-gray-800";
    }
  };

  const handleSaveArticle = (id: number) => {
    const updatedArticles = [...articles];
    const articleIndex = updatedArticles.findIndex(a => a.id === id);
    if (articleIndex !== -1) {
      updatedArticles[articleIndex].saved = !updatedArticles[articleIndex].saved;
      toast.success(updatedArticles[articleIndex].saved ? "Article saved" : "Article unsaved");
    }
  };

  const handleStartCourse = (id: number) => {
    toast.success("Course started", {
      description: "Your progress will be tracked automatically"
    });
  };

  const handleContinueCourse = (id: number) => {
    toast.success("Resuming course", {
      description: "Picking up where you left off"
    });
  };

  const handleCompleteModule = (courseId: number, moduleIndex: number) => {
    toast.success("Module completed", {
      description: "Your progress has been updated"
    });
  };

  const filteredCourses = selectedKnowledgeLevel === "all" 
    ? courses 
    : courses.filter(course => course.level === selectedKnowledgeLevel);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Center</h1>
          <p className="text-muted-foreground">Grow your financial knowledge and investment skills</p>
        </div>
        <div>
          <Select value={selectedKnowledgeLevel} onValueChange={setSelectedKnowledgeLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Learning Path</CardTitle>
          <CardDescription>Personalized educational journey based on your investment goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg">
              <div>
                <h3 className="text-lg font-medium mb-1">Intermediate Investor Path</h3>
                <p className="text-gray-300 mb-2">You're on track to becoming an advanced investor</p>
                <div className="flex items-center gap-3">
                  <Progress value={45} className="h-2 w-40" />
                  <span className="text-sm">45% complete</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button onClick={() => handleContinueCourse(2)}>
                  Continue Learning
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <h3 className="font-medium">Recommended Next Steps:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  title: "Complete Technical Analysis",
                  description: "Continue your progress (30%)",
                  icon: FileText,
                  color: "bg-yellow-900/30 text-yellow-500",
                  action: () => handleContinueCourse(3)
                },
                { 
                  title: "Take Risk Assessment Quiz", 
                  description: "Understand your risk tolerance",
                  icon: Award,
                  color: "bg-green-900/30 text-green-500",
                  action: () => toast.success("Quiz started", { description: "This will help customize your learning path" })
                },
                { 
                  title: "Review Investment Basics", 
                  description: "Reinforce your foundation",
                  icon: BookOpen,
                  color: "bg-blue-900/30 text-blue-500",
                  action: () => handleStartCourse(1)
                }
              ].map((item, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer" onClick={item.action}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses">
          {selectedCourse === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="hover:bg-gray-900/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="bg-gray-800 rounded-lg p-3 h-fit">
                        <course.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{course.title}</h3>
                          <Badge className={getLevelColor(course.level)}>
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-400 mb-3">
                          <span>{course.moduleCount} modules</span>
                          <span className="mx-2">•</span>
                          <span>{course.duration}</span>
                        </div>
                        
                        {course.completed ? (
                          <Badge className="bg-green-900/20 text-green-500 border-green-800">
                            Completed
                          </Badge>
                        ) : course.progress ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-1.5 w-full" />
                          </div>
                        ) : (
                          <Button size="sm" variant="outline" onClick={(e) => {
                            e.stopPropagation();
                            handleStartCourse(course.id);
                          }}>
                            Start Course
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <Button variant="outline" size="sm" onClick={() => setSelectedCourse(null)}>
                  Back to Courses
                </Button>
                {courses.find(c => c.id === selectedCourse)?.progress ? (
                  <Button size="sm" onClick={() => handleContinueCourse(selectedCourse)}>
                    Continue Course
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => handleStartCourse(selectedCourse)}>
                    Start Course
                  </Button>
                )}
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={getLevelColor(courses.find(c => c.id === selectedCourse)?.level || "beginner")}>
                        {(courses.find(c => c.id === selectedCourse)?.level || "beginner").charAt(0).toUpperCase() + 
                         (courses.find(c => c.id === selectedCourse)?.level || "beginner").slice(1)}
                      </Badge>
                      <CardTitle className="mt-2">{courses.find(c => c.id === selectedCourse)?.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {courses.find(c => c.id === selectedCourse)?.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>
                        <span>{courses.find(c => c.id === selectedCourse)?.modules?.length || 0} modules</span>
                        <span className="mx-2">•</span>
                        <span>{courses.find(c => c.id === selectedCourse)?.duration}</span>
                      </div>
                      {courses.find(c => c.id === selectedCourse)?.progress ? (
                        <div className="flex items-center gap-2">
                          <span>{courses.find(c => c.id === selectedCourse)?.progress}% complete</span>
                          <Progress 
                            value={courses.find(c => c.id === selectedCourse)?.progress || 0} 
                            className="h-2 w-24" 
                          />
                        </div>
                      ) : null}
                    </div>
                    
                    <div className="border rounded-md divide-y divide-border">
                      {courses.find(c => c.id === selectedCourse)?.modules?.map((module, index) => (
                        <div key={index} className="p-3 flex items-center justify-between hover:bg-gray-900/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                              {module.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : module.locked ? (
                                <Lock className="h-5 w-5 text-gray-500" />
                              ) : (
                                <Play className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                            <div>
                              <p className={`font-medium ${module.locked ? "text-gray-500" : ""}`}>{module.title}</p>
                              <p className="text-xs text-muted-foreground">{module.duration}</p>
                            </div>
                          </div>
                          {!module.completed && !module.locked && (
                            <Button size="sm" variant="outline" onClick={() => handleCompleteModule(selectedCourse, index)}>
                              {index === 0 ? "Start" : "Continue"}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="articles">
          {selectedArticle === null ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <Card 
                  key={article.id} 
                  className="hover:bg-gray-900/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedArticle(article.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-gray-400">{article.date}</span>
                        </div>
                        <h3 className="font-medium mb-1">{article.title}</h3>
                        <p className="text-xs text-gray-400">{article.readTime} read</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveArticle(article.id);
                        }}
                      >
                        <Bookmark className={`h-5 w-5 ${article.saved ? 'fill-current text-blue-500' : ''}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => setSelectedArticle(null)}>
                  Back to Articles
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    const article = articles.find(a => a.id === selectedArticle);
                    if (article) {
                      handleSaveArticle(article.id);
                    }
                  }}
                >
                  <Bookmark className={`h-5 w-5 ${articles.find(a => a.id === selectedArticle)?.saved ? 'fill-current text-blue-500' : ''}`} />
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">
                      {articles.find(a => a.id === selectedArticle)?.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{articles.find(a => a.id === selectedArticle)?.date}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{articles.find(a => a.id === selectedArticle)?.readTime} read</span>
                  </div>
                  <CardTitle>{articles.find(a => a.id === selectedArticle)?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    {articles.find(a => a.id === selectedArticle)?.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="space-y-4">
            {articles.filter(a => a.saved).length > 0 ? (
              articles.filter(a => a.saved).map((article) => (
                <Card 
                  key={article.id} 
                  className="hover:bg-gray-900/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedArticle(article.id);
                    setActiveTab("articles");
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-gray-400">{article.date}</span>
                        </div>
                        <h3 className="font-medium mb-1">{article.title}</h3>
                        <p className="text-xs text-gray-400">{article.readTime} read</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveArticle(article.id);
                        }}
                      >
                        <Bookmark className="h-5 w-5 fill-current text-blue-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="p-8 text-center">
                <Bookmark className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-medium mb-2">No saved items</h3>
                <p className="text-gray-400 mb-4">
                  Bookmark articles and courses to access them later
                </p>
                <Button variant="outline" onClick={() => setActiveTab("articles")}>
                  Browse Articles
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Learning;
