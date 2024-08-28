import type { Post } from '../types/blog'

class BlogApi {
  getPosts(): Promise<Post[]> {
    const posts: Post[] = [
      {
        id: '1',
        cover: '/static/mock-images/blog/welcome-cover.webp',
        readTime: '2 min',
        contentPath: '/static/blog/welcome.md',
        shortDescription:
          'Discover how our trading platform simplifies your trading decisions and guides you to consistent success.',
        title: 'Learning Journey',
        category: 'introduction'
      },
      {
        id: '2',
        cover: '/static/mock-images/blog/our-mission-cover.webp',
        readTime: '3 min',
        contentPath: '/static/blog/our-mission.md',
        shortDescription:
          'Discover the personal journey and mission behind our platform, designed to simplify technical analysis and empower traders with the insights needed to make confident, strategic decisions in the market.',
        title: 'Our Mission',
        category: 'introduction'
      },
      {
        id: '3',
        cover: '/static/mock-images/blog/why-choose-us.webp',
        readTime: '3 min',
        contentPath: '/static/blog/why-work-with-us.md',
        shortDescription:
          'We blend innovative, easy-to-understand market insights with a flexible framework and transparent guidance to empower your trading decisions.',
        title: 'Why Work With Us',
        category: 'introduction'
      },
      {
        id: '4',
        cover: '/static/mock-images/blog/share-with-us.webp',
        readTime: '2 min',
        contentPath: '/static/blog/contact-us.md',
        shortDescription:
          'Your feedback and questions help shape our platform, enhancing your trading experience.  Reach out through our contact page or directly at support@decodethetrade.com.',
        title: 'Share With Us',
        category: 'introduction'
      },
      {
        id: '5',
        cover: '/static/mock-images/blog/market-participants.webp',
        readTime: '4 min',
        contentPath: '/static/blog/market-participants.md',
        shortDescription:
          'The financial markets are a complex ecosystem inhabited by a diverse array of participants. Each plays a distinct role and influence the price movements.',
        title: 'Market Participants',
        category: 'market-overview'
      },
      {
        id: '7',
        cover: '/static/mock-images/blog/market-instruments.webp',
        readTime: '4 min',
        contentPath: '/static/blog/market-instruments.md',
        shortDescription:
          'In the financial markets, a variety of instruments can be traded, each belonging to different asset classes ranging from stocks and bonds to commodities and currencies.',
        title: 'Market Instruments',
        category: 'market-overview'
      },
      {
        id: '8',
        cover: '/static/mock-images/blog/how-market-operates.webp',
        readTime: '4 min',
        contentPath: '/static/blog/how-market-operates.md',
        shortDescription:
          'Explore the general mechanisms at play in these markets, focusing on how buyers and sellers interact to determine prices and facilitate transactions.',
        title: 'How Market Operates',
        category: 'market-overview'
      },
      {
        id: '9',
        cover: '/static/mock-images/blog/market-trends.webp',
        readTime: '4 min',
        contentPath: '/static/blog/market-trends.md',
        shortDescription:
          'Explore bull and bear markets, market cycles, and how economic, political, and social factors influence market trends.',
        title: 'Market Trends and Cycles',
        category: 'market-overview'
      },
      {
        id: '10',
        cover: '/static/mock-images/blog/trading-terminology.webp',
        readTime: '4 min',
        contentPath: '/static/blog/basics-trading-terminology.md',
        shortDescription:
          'Unveiling the vocabulary used in trading. By mastering these key terms, you will unlock the language needed to navigate the markets with confidence',
        title: 'Trading Terminology',
        category: 'basics'
      },
      {
        id: '11',
        cover: '/static/mock-images/blog/trading-style.webp',
        readTime: '4 min',
        contentPath: '/static/blog/basics-trading-style.md',
        shortDescription:
          'Dive into discretionary vs. systematic trading styles, helping you discover if you are a chart-reading captain or an algorithm-guided navigator in the market.',
        title: 'Discretionary vs. Systematic',
        category: 'basics'
      },
      {
        id: '6',
        cover: '/static/mock-images/blog/ways-to-trade-the-market.webp',
        readTime: '4 min',
        contentPath: '/static/blog/basics-types-of-strategies.md',
        shortDescription:
          'For every trader it’s crucial to choose a method that aligns with investment goals, risk tolerance, and time availability of the trader.',
        title: 'Trading Methodologies',
        category: 'basics'
      },
      {
        id: '12',
        cover: '/static/mock-images/blog/set-up-trading-account.webp',
        readTime: '4 min',
        contentPath: '/static/blog/set-up-trading-account.md',
        shortDescription:
          'Set up a trading account, and start to practice with a demo account. Learn how to choose a broker and what to look for in a demo to mirror the real experience.',
        title: 'Broker and Trading Account',
        category: 'basics'
      },
      {
        id: '13',
        cover: '/static/mock-images/blog/introduction-to-technical-analysis.webp',
        readTime: '4 min',
        contentPath: '/static/blog/introduction-to-technical-analysis.md',
        shortDescription:
          'Learn the fundamentals of technical analysis to enhance your trading skills. This post covers the basics, including key concepts, chart types, indicators, and patterns.',
        title: 'Introduction to Technical Analysis',
        category: 'technical-analysis'
      },
      {
        id: '14',
        cover: '/static/mock-images/blog/price-charts.webp',
        readTime: '4 min',
        contentPath: '/static/blog/price-charts.md',
        shortDescription:
          'Learn the fundamentals of price charts in trading, including candlestick, bar, and line charts. Discover how different time frames can be used.',
        title: 'Understanding Price Charts',
        category: 'technical-analysis'
      },
      {
        id: '15',
        cover: '/static/mock-images/blog/indicators.webp',
        readTime: '5 min',
        contentPath: '/static/blog/indicators.md',
        shortDescription:
          'Technical indicators are powerful tools that can enhance your trading strategy by providing insights into market trends, momentum, volatility, volume, and potential reversals.',
        title: 'Technical Indicators',
        category: 'technical-analysis'
      },
      {
        id: '16',
        cover: '/static/mock-images/blog/support-resistance-levels.webp',
        readTime: '4 min',
        contentPath: '/static/blog/support-resistance-levels.md',
        shortDescription:
          'Learn to identify and use support and resistance levels in trading to improve your strategy. This post covers how to spot these levels on charts, utilize them in trading decisions, and recognize breakouts and false breakouts.',
        title: 'Support and Resistance Levels',
        category: 'technical-analysis'
      },
      {
        id: '17',
        cover: '/static/mock-images/blog/volume-analysis.webp',
        readTime: '4 min',
        contentPath: '/static/blog/volume-analysis.md',
        shortDescription:
          'Explore the fundamentals of volume analysis in technical trading, understanding how trading volume impacts price movements and enhances your trading strategies',
        title: 'Volume Analysis',
        category: 'technical-analysis'
      },
      {
        id: '18',
        cover: '/static/mock-images/blog/momentum.webp',
        readTime: '4 min',
        contentPath: '/static/blog/momentum.md',
        shortDescription:
          'Discover the power of momentum in trading, learn about key momentum indicators, and how to use them to make informed trading decisions.',
        title: 'Momentum Analysis',
        category: 'technical-analysis'
      },
      {
        id: '19',
        cover: '/static/mock-images/blog/trend-analysis.webp',
        readTime: '4 min',
        contentPath: '/static/blog/trend-analysis.md',
        shortDescription:
          'Learn the essentials of trend analysis in trading, explore key trend indicators, and how to use them to make effective trading decisions.',
        title: 'Trend Analysis',
        category: 'technical-analysis'
      },
      {
        id: '20',
        cover: '/static/mock-images/blog/volatility-analysis.webp',
        readTime: '4 min',
        contentPath: '/static/blog/volatility-analysis.md',
        shortDescription:
          'Explore the fundamentals of volatility analysis in trading, learn about key volatility indicators, and how to use them to make informed trading decisions.',
        title: 'Volatility Analysis',
        category: 'technical-analysis'
      },
      {
        id: '21',
        cover: '/static/mock-images/blog/chart-patterns.webp',
        readTime: '4 min',
        contentPath: '/static/blog/chart-patterns.md',
        shortDescription:
          'Learn the essentials of chart patterns in trading, explore various types of chart patterns, and how to use them to make informed trading decisions.',
        title: 'Chart Patterns',
        category: 'technical-analysis'
      },
      {
        id: '22',
        cover: '/static/mock-images/blog/candlestick-patterns.webp',
        readTime: '4 min',
        contentPath: '/static/blog/candlestick-patterns.md',
        shortDescription:
          'Explore the fundamentals of candlestick patterns in trading, learn about various types of candlestick patterns, and how to use them to make informed trading decisions.',
        title: 'Candlestick Patterns',
        category: 'technical-analysis'
      },
      {
        id: '23',
        cover: '/static/mock-images/blog/intro-fundamental-analysis.webp',
        readTime: '4 min',
        contentPath: '/static/blog/intro-fundamental-analysis.md',
        shortDescription:
          'Discover the basics of fundamental analysis, its importance in trading, and how it complements technical analysis to enhance your trading strategy.',
        title: 'Introduction',
        category: 'fundamental-analysis'
      },
      {
        id: '24',
        cover: '/static/mock-images/blog/economic-indicators.webp',
        readTime: '4 min',
        contentPath: '/static/blog/economic-indicators.md',
        shortDescription:
          'Explore the key economic indicators that drive Forex trading, understand their impact on currency values, and see real-world examples of their influence.',
        title: 'Economic Indicators',
        category: 'fundamental-analysis'
      },
      {
        id: '25',
        cover: '/static/mock-images/blog/central-banks.webp',
        readTime: '4 min',
        contentPath: '/static/blog/central-banks.md',
        shortDescription:
          'Discover the critical role central banks play in Forex trading, how their decisions impact currency values, and real-world examples of their influence.',
        title: 'Central Banks',
        category: 'fundamental-analysis'
      },
      {
        id: '26',
        cover: '/static/mock-images/blog/financial-statements.webp',
        readTime: '4 min',
        contentPath: '/static/blog/financial-statements.md',
        shortDescription:
          'Explore an insightful guide for stock traders on understanding and analyzing financial statements.',
        title: 'Financial Statements',
        category: 'fundamental-analysis'
      },
      {
        id: '27',
        cover: '/static/mock-images/blog/fundamental-analysis-tools.webp',
        readTime: '4 min',
        contentPath: '/static/blog/fundamental-analysis-tools.md',
        shortDescription:
          'Overview of essential tools and resources such as economic calendars, financial news websites, and analytical tools to make informed trading decisions.',
        title: 'Tools and Resources',
        category: 'fundamental-analysis'
      },
      {
        id: '28',
        cover: '/static/mock-images/blog/risk-management-intro.webp',
        readTime: '4 min',
        contentPath: '/static/blog/risk-management-intro.md',
        shortDescription:
          'The importance of risk management and its role in preserving capital, and why it is essential for long-term success.',
        title: 'Introduction',
        category: 'risk-management'
      },
      {
        id: '29',
        cover: '/static/mock-images/blog/risk-management-plan.webp',
        readTime: '4 min',
        contentPath: '/static/blog/risk-management-plan.md',
        shortDescription:
          'It covers defining risk tolerance and trading goals, establishing a risk management plan, and the importance of discipline in sticking to the plan.',
        title: 'Planning',
        category: 'risk-management'
      },
      {
        id: '30',
        cover: '/static/mock-images/blog/risk-management-tools.webp',
        readTime: '4 min',
        contentPath: '/static/blog/risk-management-tools.md',
        shortDescription:
          'Protect your capital and enhance your success by using stop-loss orders, position sizing, diversification and using leverage wisely.',
        title: 'Tools and Techniques',
        category: 'risk-management'
      },
      {
        id: '31',
        cover: '/static/mock-images/blog/risk-management-continuous.webp',
        readTime: '4 min',
        contentPath: '/static/blog/risk-management-continuous.md',
        shortDescription:
          'By conducting regular reviews, identifying strengths and weaknesses, and making necessary adjustments, you can ensure your strategy remains effective and aligned with your goals.',
        title: 'Evaluate and Improve',
        category: 'risk-management'
      },
      {
        id: '32',
        cover: '/static/mock-images/blog/trading-strategies-intro.webp',
        readTime: '4 min',
        contentPath: '/static/blog/trading-strategies-intro.md',
        shortDescription:
          'Trading strategies are essential tools for traders looking to achieve consistent and optimal returns. They are designed to guide actions and remove emotions.',
        title: 'Types and Purpose',
        category: 'strategies'
      },
      {
        id: '33',
        cover: '/static/mock-images/blog/trading-strategies-develop.webp',
        readTime: '5 min',
        contentPath: '/static/blog/trading-strategies-develop.md',
        shortDescription:
          'Developing a successful trading strategy requires a combination of technical analysis, clear objectives, and effective risk management.',
        title: 'Developing a Strategy',
        category: 'strategies'
      },
      {
        id: '34',
        cover: '/static/mock-images/blog/trading-strategies-design.webp',
        readTime: '4 min',
        contentPath: '/static/blog/trading-strategies-design.md',
        shortDescription:
          'Designing a robust trading strategy involves defining clear entry and exit rules, implementing effective risk management, and thoroughly backtesting your strategy.',
        title: 'Design and Backtesting',
        category: 'strategies'
      },
      {
        id: '35',
        cover: '/static/mock-images/blog/trading-strategies-optimization.webp',
        readTime: '4 min',
        contentPath: '/static/blog/trading-strategies-optimization.md',
        shortDescription:
          'By optimizing parameters, avoiding over-optimization, stress testing, and forward testing, you can ensure that your strategy is well-prepared for various market conditions.',
        title: 'Optimization and Fine-Tune',
        category: 'strategies'
      },
      {
        id: '36',
        cover: '/static/mock-images/blog/psychology-discipline.webp',
        readTime: '4 min',
        contentPath: '/static/blog/psychology-discipline.md',
        shortDescription:
          'Discipline is a cornerstone of successful trading. It ensures that traders stick to their strategies, manage their risks effectively, and avoid impulsive decisions.',
        title: 'Discipline',
        category: 'psychology'
      },
      {
        id: '37',
        cover: '/static/mock-images/blog/psychology-emotions.webp',
        readTime: '4 min',
        contentPath: '/static/blog/psychology-emotions.md',
        shortDescription:
          'Emotions play a significant role in trading, often driving decisions that can lead to substantial losses. Understanding and managing emotions like greed and fear are essential for successful trading.',
        title: 'Emotions',
        category: 'psychology'
      },
      {
        id: '38',
        cover: '/static/mock-images/blog/psychology-other-aspects.webp',
        readTime: '4 min',
        contentPath: '/static/blog/psychology-other-aspects.md',
        shortDescription:
          'Successful trading involves more than just technical skills and strategy. Psychological aspects play a crucial role in shaping a trader’s mindset and behavior.',
        title: 'Aspects of Trading',
        category: 'psychology'
      },
      {
        id: '39',
        cover: '/static/mock-images/blog/psychology-trust.webp',
        readTime: '4 min',
        contentPath: '/static/blog/psychology-trust.md',
        shortDescription:
          'Every trader faces challenging periods where their strategy may not perform as expected. During these times, it is crucial to trust in your strategy and remain disciplined.',
        title: 'Trust in Strategy',
        category: 'psychology'
      },
      {
        id: '40',
        cover: '/static/mock-images/blog/decode-the-trade-live-markets.webp',
        readTime: '5 min',
        contentPath: '/static/blog/decode-the-trade-live-markets.md',
        shortDescription: 'Discover how to take advantage of trading sessions.',
        title: 'Stock Exchange Opening Times',
        category: 'how-to-use'
      },
      {
        id: '41',
        cover: '/static/mock-images/blog/decode-the-trade-strength-meter.webp',
        readTime: '5 min',
        contentPath: '/static/blog/decode-the-trade-strength-meter.md',
        shortDescription: 'Discover how to leverage the Market Screener’s currency strength meter.',
        title: 'Currency Strength Meter',
        category: 'how-to-use'
      },
      {
        id: '42',
        cover: '/static/mock-images/blog/decode-the-trade-volatility-meter.webp',
        readTime: '5 min',
        contentPath: '/static/blog/decode-the-trade-volatility-meter.md',
        shortDescription: 'Discover how to leverage the Market Screener’s currency volatility meter.',
        title: 'Currency Volatility Meter',
        category: 'how-to-use'
      },
      {
        id: '43',
        cover: '/static/mock-images/blog/decode-the-trade-screener-table.webp',
        readTime: '5 min',
        contentPath: '/static/blog/decode-the-trade-screener-table.md',
        shortDescription: 'Discover how to leverage the Market Screener’s table.',
        title: 'Screener Table',
        category: 'how-to-use'
      },
      {
        id: '44',
        cover: '/static/mock-images/blog/decode-the-trade-multi-frame.webp',
        readTime: '3 min',
        contentPath: '/static/blog/decode-the-trade-multi-frame.md',
        shortDescription:
          'Multi-time frame analysis allows traders to gain insights into short-term movements and long-term trends, helping to make more informed decisions.',
        title: 'Multi-time frame analysis',
        category: 'how-to-use',
        videoUrl: 'https://www.youtube.com/embed/yAhEGmPqaac'
      },
      {
        id: '45',
        cover: '/static/mock-images/blog/decode-the-trade-momentum.webp',
        readTime: '3 min',
        contentPath: '/static/blog/decode-the-trade-momentum.md',
        shortDescription:
          'Understanding how to analyze and interpret momentum signals to significantly improve your trading strategy.',
        title: 'Momentum analysis',
        category: 'how-to-use',
        videoUrl: 'https://www.youtube.com/embed/WNBJDClMXGw'
      },
      {
        id: '46',
        cover: '/static/mock-images/blog/decode-the-trade-trend-analysis.webp',
        readTime: '3 min',
        contentPath: '/static/blog/decode-the-trade-trend.md',
        shortDescription:
          'Understanding how to analyze and interpret trend signals to significantly improve your trading strategy.',
        title: 'Trend analysis',
        category: 'how-to-use',
        videoUrl: 'https://www.youtube.com/embed/Ab-oI1ypMfc'
      },
      {
        id: '47',
        cover: '/static/mock-images/blog/decode-the-trade-price-move.webp',
        readTime: '3 min',
        contentPath: '/static/blog/decode-the-trade-price-move.md',
        shortDescription:
          'Understanding how to analyze and interpret price moves to significantly improve your trading strategy.',
        title: 'Price Move Analysis',
        category: 'how-to-use',
        videoUrl: 'https://www.youtube.com/embed/IwfnuAgjE6E'
      }
    ]

    return Promise.resolve(posts)
  }

  getPostById(id: string): Promise<Post | undefined> {
    return this.getPosts()
      .then((posts) => {
        return Promise.resolve(posts.find((post) => post.id === id))
      })
      .catch((err) => {
        console.error(err)
        return Promise.resolve(undefined)
      })
  }

  getPreviousAndNext(id: string): Promise<{ previous: Post | undefined; next: Post | undefined }> {
    return this.getPosts()
      .then((posts) => {
        const currentIndex = posts.findIndex((post) => post.id === id)
        const previous = currentIndex > 0 ? posts[currentIndex - 1] : undefined
        const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined
        return Promise.resolve({ previous, next })
      })
      .catch((err) => {
        console.error(err)
        return Promise.resolve({ previous: undefined, next: undefined })
      })
  }
}

export const blogApi = new BlogApi()
