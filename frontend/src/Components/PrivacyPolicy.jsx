import React from 'react';
import { Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, backgroundColor: '#121212', minHeight: '100vh' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#bb86fc', textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>
          Privacy Policy
        </Typography>
        <Divider sx={{ mb: 3, backgroundColor: '#bb86fc' }} />
        
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: '#e0e0e0', fontFamily: 'Roboto, sans-serif' }}>
          Your privacy is important to us. This Privacy Policy outlines how <b style={{ color: '#bb86fc' }}>PITSTOP</b> collects, uses, and protects your personal information when you use our services.
        </Typography>
        
        {sections.map((section, index) => (
          <Accordion key={index} sx={{ mb: 2, borderRadius: 2, backgroundColor: '#2c2c2c', color: '#ffffff' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#bb86fc' }} />} sx={{ fontWeight: 'bold', backgroundColor: '#333333' }}>
              <Typography variant="h6" sx={{ color: '#bb86fc', fontFamily: 'Roboto, sans-serif' }}>{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#1e1e1e' }}>
              <Typography variant="body1" sx={{ color: '#e0e0e0', fontFamily: 'Roboto, sans-serif' }}>{section.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};

const sections = [
  { title: '1. Information We Collect', content: '- Personal details such as name, email, and phone number.\n- Location data for service assistance.\n- Payment and transaction details.' },
  { title: '2. How We Use Your Information', content: '- To provide vehicle repair and roadside assistance services.\n- To process payments and manage transactions.\n- To enhance user experience through personalized recommendations.' },
  { title: '3. Data Security', content: 'We implement industry-standard security measures to protect your data from unauthorized access, misuse, or loss.' },
  { title: '4. Third-Party Sharing', content: 'Your personal data may be shared with trusted third parties only for service fulfillment and legal compliance.' },
  { title: '5. Your Rights', content: '- You can request access to, correction, or deletion of your data.\n- You can opt out of marketing communications at any time.' },
  { title: '6. Changes to Privacy Policy', content: 'We reserve the right to update this policy. Changes will be communicated via email or website notification.' },
  { title: '7. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at support@pitstop.com.' },
];

export default PrivacyPolicy;