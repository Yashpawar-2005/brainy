import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Share2, 
  Search, 
  Save 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Remember Faster",
      description: "Instantly capture and recall information with our advanced brain storage technology.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Search,
      title: "Query Faster",
      description: "Lightning-quick search and retrieval of your stored knowledge with intelligent indexing.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Save,
      title: "Store Brain",
      description: "Securely archive your thoughts, notes, and insights in a structured, easily manageable format.",
      gradient: "from-green-400 to-cyan-500"
    },
    {
      icon: Share2,
      title: "Share Brain",
      description: "Collaborate and exchange knowledge seamlessly with intelligent sharing mechanisms.",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className=" min-h-screen bg-gradient-to-br from-black via-[#0a0a1a] to-black flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl  mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-white mb-4">
            Brainy Features
          </h2>
          <p className="text-xl text-gray-400  mx-auto">
            Revolutionize how you store, query, and share your knowledge
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2
              }}
            >
              <Card className="bg-[#1a1a2e] border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <CardHeader>
                  <div className={`w-16 h-16 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.gradient}`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features