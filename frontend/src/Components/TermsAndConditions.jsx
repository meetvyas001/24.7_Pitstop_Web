import React from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, backgroundColor: '#0d1117', minHeight: '100vh' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#161b22', color: '#ffffff' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#58a6ff', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
          Terms & Conditions
        </Typography>
        <Divider sx={{ mb: 3, backgroundColor: '#58a6ff' }} />
        
        {sections.map((section, index) => (
          <div key={index}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3, color: '#f778ba', fontFamily: 'Poppins, sans-serif' }}>
              {section.title}
            </Typography>
            <Typography variant="body1" sx={{ color: '#c9d1d9', fontFamily: 'Poppins, sans-serif' }}>
              {section.content}
            </Typography>
          </div>
        ))}
      </Paper>
    </Container>
  );
};

const sections = [
  { title: '1. Introduction', content: 'Welcome to PITSTOP. By accessing our website and using our services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.' },
  { title: '2. Services', content: 'PITSTOP provides vehicle repair and roadside assistance services. Our platform connects customers with service providers to facilitate instant vehicle repair and towing solutions.' },
  { title: '3. User Responsibilities', content: '- You must provide accurate information while using our services.\n- You agree not to misuse our platform for fraudulent activities.\n- You are responsible for maintaining the confidentiality of your account details.' },
  { title: '4. Payment & Refund Policy', content: '- All service charges must be paid as per the displayed rates.\n- Refunds are subject to our discretion and depend on the nature of the service provided.' },
  { title: '5. Limitation of Liability', content: 'PITSTOP shall not be held liable for any indirect or consequential damages arising from service use, delays, or unavailability.' },
  { title: '6. Termination', content: 'We reserve the right to terminate or suspend user accounts at our discretion if we find any violations of these terms.' },
  { title: '7. Changes to Terms', content: 'PITSTOP reserves the right to update these terms at any time. Users will be notified of significant changes.' },
  { title: '8. Contact Us', content: 'If you have any questions about these Terms & Conditions, please contact us at support@pitstop.com.' },
];

export default TermsAndConditions;