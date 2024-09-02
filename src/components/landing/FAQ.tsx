import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const faqItems = [
    {
      id: 'panel1',
      question: 'What is Decode The Trade?',
      answer:
        'Decode The Trade is a comprehensive trading platform designed to help traders at all levels identify profitable setups, manage risk, and build confidence in their trading strategies. We offer advanced tools like multi-frame analysis, historical insights, market state filters, and more to give you an edge in the market.'
    },
    {
      id: 'panel31',
      question: 'When will the platform be available?',
      answer: 'Decode The Trade is already developed as an MVP would be available very soon.'
    },
    {
      id: 'panel32',
      question: 'What do I gain by joing the waitlist?',
      answer:
        'You will be notified when the platform has been deployed and you will be give a code for 20% off for the first 3 months.'
    },
    {
      id: 'panel2',
      question: 'How can Decode The Trade improve my trading?',
      answer:
        "Our platform equips you with advanced features that allow you to analyze market conditions in-depth, identify high-probability trades, and optimize your risk management. Whether you're a day trader, swing trader, or long-term investor, our tools help you make informed decisions based on data-backed insights."
    },
    {
      id: 'panel3',
      question: 'What makes Decode The Trade different from other trading platforms?',
      answer:
        'Decode The Trade stands out by offering unique features such as Historical Insights, Multi-Frame Analysis, and Imbalance Detection. These tools not only help you understand the current market but also allow you to learn from past market movements, enhancing your ability to predict and react to future trends.'
    },
    {
      id: 'panel4',
      question: 'Do I need to be an experienced trader to use Decode The Trade?',
      answer:
        'No, Decode The Trade is designed for traders of all experience levels. Our Learning Hub provides educational resources and tutorials to help beginners get started, while our advanced tools offer seasoned traders the insights they need to refine their strategies.'
    },
    {
      id: 'panel5',
      question: 'How do Historical Insights work?',
      answer:
        'Historical Insights allow you to view how similar market setups played out in the past. By analyzing past price movements, trends, and market conditions, you can gain valuable insights into potential future outcomes and make more informed trading decisions.'
    },
    {
      id: 'panel6',
      question: 'What is Multi-Frame Analysis?',
      answer:
        'Multi-Frame Analysis allows you to view and compare market data across different time frames on a single chart. This feature helps you align your short-term trades with long-term trends, ensuring that your trades are consistent with the overall market direction.'
    },
    {
      id: 'panel7',
      question: 'How does the Volatility Meter help in trading?',
      answer:
        'The Volatility Meter shows you which currency pairs or assets are experiencing significant price movements, indicating higher profit potential. This tool helps you trade when market conditions are most favorable, increasing your chances of success.'
    },
    {
      id: 'panel8',
      question: 'Can I try Decode The Trade before committing to a subscription?',
      answer:
        'Yes, we offer a free trial that allows you to explore our platform and experience its features firsthand. This gives you a chance to see how Decode The Trade can enhance your trading before you commit.'
    },
    {
      id: 'panel9',
      question: 'How do Market State Filters work?',
      answer:
        'Market State Filters allow you to filter and analyze market conditions based on historical data. By understanding how similar conditions played out in the past, you can refine your trading strategies and increase your chances of success in current markets.'
    },
    {
      id: 'panel10',
      question: 'Is there customer support available?',
      answer:
        'Absolutely. Our customer support team is available to assist you with any questions or issues you may have. We’re committed to ensuring you get the most out of Decode The Trade.'
    },
    {
      id: 'panel11',
      question: 'How often is the data on Decode The Trade updated?',
      answer:
        'The lowest time frame we do analyze is 15m which is ensuring that you have the most current information available when making trading decisions. This includes live updates on price movements, trends, and market conditions.'
    },
    {
      id: 'panel12',
      question: 'What types of assets can I analyze with Decode The Trade?',
      answer:
        'Decode The Trade currently supports forex pairs only but our tools are designed to be flexible, allowing you to be applied on any market and in future we would expand the capabilities.'
    },
    {
      id: 'panel15',
      question: 'Do you offer educational resources?',
      answer:
        'Yes, Decode The Trade includes a Learning Hub with a variety of educational materials, including tutorials, articles, and videos. These resources are designed to help you improve your trading knowledge and skills.'
    },
    {
      id: 'panel16',
      question: 'What kind of customer support does Decode The Trade offer?',
      answer:
        'We offer comprehensive customer support via email on support@decodethetrade.com, our support team is knowledgeable and ready to assist you with any questions or issues you may encounter.'
    },
    {
      id: 'panel17',
      question: 'Can I integrate Decode The Trade with other trading platforms?',
      answer:
        'Currently, Decode The Trade is a standalone platform. However, we are constantly exploring new features and integrations to enhance your trading experience. Stay tuned for updates!'
    },
    {
      id: 'panel18',
      question: 'What are the pricing options for Decode The Trade?',
      answer:
        'We offer 2 pricing plans at the moment free and premium. The free plan where you can stay in the platform but if you are serious about trading we recommend you go with premium which is only 12.99 euro.'
    },
    {
      id: 'panel19',
      question: 'Can I access Decode The Trade on mobile devices?',
      answer:
        'Yes, Decode The Trade is accessible on both desktop and mobile devices. Our platform is optimized to be responsible but the best experience is on desktop where you can get a big view of all information.'
    },
    {
      id: 'panel20',
      question: 'How does the Learning Hub help me become a better trader?',
      answer:
        "The Learning Hub is designed to accelerate your learning curve by providing comprehensive resources that help you understand the markets better. With interactive tutorials, in-depth articles, and practical exercises, you'll gain the confidence and skills needed to trade effectively."
    },
    {
      id: 'panel21',
      question: 'Do you offer any community features?',
      answer:
        'We are working on developing community features where traders can share insights, strategies, and experiences. This will allow you to learn from other traders and collaborate on improving your trading skills.'
    },
    {
      id: 'panel22',
      question: 'How do I get started with Decode The Trade?',
      answer:
        "Getting started is easy! Simply sign up for a free trial on our website, and you'll have instant access to our platform. Once you're familiar with the tools, you can choose the subscription plan that best fits your needs."
    },
    {
      id: 'panel24',
      question: 'What happens after my free trial ends?',
      answer: 'The free trial is started from a premium plan so when the trial ends the premium automatically starts.'
    },
    {
      id: 'panel25',
      question: 'Can I cancel my subscription at any time?',
      answer:
        'Yes, you can cancel your subscription at any time. There are no long-term commitments, and you can easily manage your subscription through your account settings.'
    },
    {
      id: 'panel26',
      question: 'What is your refund policy?',
      answer:
        "We offer a satisfaction guarantee for our subscribers. If you're not satisfied with our service, you can request a refund within the first 14 days of your subscription. Please refer to our refund policy for more details."
    },
    {
      id: 'panel27',
      question: 'How do Market State Filters differ from traditional indicators?',
      answer:
        'Market State Filters go beyond traditional indicators by allowing you to filter market conditions based on historical data, providing a more comprehensive view of how similar conditions have played out in the past. This helps in refining strategies and making more informed trading decisions.'
    },
    {
      id: 'panel28',
      question: 'What is the difference between the free and premium versions?',
      answer:
        'The free version of Decode The Trade provides access to basic features, while the premium version unlocks advanced tools like Historical Insights, Multiple Time Frames Analysis, and Imbalance Detection. Premium users also receive priority support.'
    },
    {
      id: 'panel29',
      question: 'How does Decode The Trade help with risk management?',
      answer:
        'Decode The Trade offers several tools, such as automatic Support and Resistance Zone detection and Multiple Time Frames Analysis, to help you manage risk effectively. These tools allow you to set optimal stop-loss and take-profit levels based on comprehensive market data.'
    },
    {
      id: 'panel30',
      question: 'How frequently do you update your platform with new features?',
      answer:
        'The platform is in active development and we are continuously improving based on user feedback and market trends. New features and updates are rolled out regularly to ensure you have access to the latest tools and technology in trading.'
    }
  ]

  return (
    <Container
      id='faq'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 }
      }}
    >
      <Typography
        component='h2'
        variant='h4'
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' }
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        {faqItems.map((item) => (
          <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)} key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.id}d-content`}
              id={`${item.id}d-header`}
            >
              <Typography component='h3' variant='subtitle2'>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body2' gutterBottom sx={{ maxWidth: { sm: '100%', md: '90%' } }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  )
}
