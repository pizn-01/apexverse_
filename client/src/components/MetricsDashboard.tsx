import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetricsDashboard() {
    const metrics = [
        {
            title: "Conversion Rate",
            value: "+185%",
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500",
            progress: 85,
        },
        {
            title: "User Engagement",
            value: "+240%",
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            progress: 92,
        },
        {
            title: "Revenue Generated",
            value: "$19.7K",
            icon: DollarSign,
            color: "from-green-500 to-emerald-500",
            progress: 78,
        },
        {
            title: "Client Satisfaction",
            value: "97.2%",
            icon: Star,
            color: "from-amber-500 to-orange-500",
            progress: 97,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            <Card className="bg-gradient-to-br from-card via-card to-card/90 border-card-border shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10" />

                <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-serif text-2xl text-foreground dark:text-gray-100 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Star className="w-5 h-5 text-primary-foreground" />
                            </div>
                            Project Dashboard
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-muted-foreground dark:text-gray-300 font-['Poppins']">Live</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="relative space-y-6">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {metrics.map((metric, index) => {
                            const Icon = metric.icon;
                            return (
                                <motion.div
                                    key={metric.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="p-4 rounded-lg bg-background/50 dark:bg-background/30 border border-border hover:border-primary/50 transition-all duration-300">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="font-['Poppins'] text-2xl font-bold text-foreground dark:text-gray-100">
                                                {metric.value}
                                            </span>
                                        </div>

                                        <p className="font-['Poppins'] text-sm text-muted-foreground dark:text-gray-300 mb-2">
                                            {metric.title}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${metric.progress}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${metric.color} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Summary Stats */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 dark:bg-background/30 border border-border">
                        <div className="flex-1 text-center border-r border-border last:border-r-0">
                            <p className="font-['Poppins'] text-2xl font-bold text-foreground dark:text-gray-100">$19.7K</p>
                            <p className="font-['Poppins'] text-xs text-muted-foreground dark:text-gray-300">Revenue Generated</p>
                        </div>
                        <div className="flex-1 text-center border-r border-border last:border-r-0">
                            <p className="font-['Poppins'] text-2xl font-bold text-foreground dark:text-gray-100">97.2%</p>
                            <p className="font-['Poppins'] text-xs text-muted-foreground dark:text-gray-300">Client Satisfaction</p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 dark:from-accent/10 dark:to-primary/10 rounded-full blur-3xl" />
                </CardContent>
            </Card>
        </motion.div>
    );
}
