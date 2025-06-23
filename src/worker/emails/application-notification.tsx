import * as React from 'react';

interface ApplicationNotificationProps {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  desiredAmount: string;
  timestamp: string;
  source: string;
}

// Format the desired amount with proper currency formatting
const formatDesiredAmount = (amount: string): string => {
  // Handle different amount formats from the form
  const amountMap: { [key: string]: string } = {
    '7500-25000': '$7,500 - $25,000',
    '25000-50000': '$25,000 - $50,000', 
    '50000-100000': '$50,000 - $100,000',
    '100000-150000': '$100,000 - $150,000',
    '150000+': '$150,000+'
  };
  
  return amountMap[amount] || `$${amount}`;
};

export const ApplicationNotificationTemplate: React.FC<Readonly<ApplicationNotificationProps>> = ({
  businessName,
  contactName,
  email,
  phone,
  businessType,
  desiredAmount,
  timestamp,
  source,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
    <div style={{ backgroundColor: '#1e40af', color: 'white', padding: '20px', borderRadius: '8px 8px 0 0' }}>
      <h1 style={{ margin: '0', fontSize: '24px' }}>🚀 New Funding Application Lead</h1>
      <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>
        A new business has applied for funding through your website
      </p>
    </div>
    
    <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '0 0 8px 8px', border: '1px solid #e2e8f0' }}>
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1e40af', margin: '0 0 20px 0', fontSize: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
          Business Information
        </h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151', width: '35%' }}>Business Name:</td>
            <td style={{ padding: '8px 0', color: '#111827' }}>{businessName}</td>
          </tr>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>Contact Name:</td>
            <td style={{ padding: '8px 0', color: '#111827' }}>{contactName}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>Email:</td>
            <td style={{ padding: '8px 0', color: '#111827' }}>
              <a href={`mailto:${email}`} style={{ color: '#1e40af', textDecoration: 'none' }}>{email}</a>
            </td>
          </tr>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>Phone:</td>
            <td style={{ padding: '8px 0', color: '#111827' }}>
              <a href={`tel:${phone}`} style={{ color: '#1e40af', textDecoration: 'none' }}>{phone}</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>Business Type:</td>
            <td style={{ padding: '8px 0', color: '#111827' }}>{businessType}</td>
          </tr>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>Desired Amount:</td>
            <td style={{ padding: '8px 0', color: '#111827', fontWeight: 'bold', fontSize: '16px' }}>
              {formatDesiredAmount(desiredAmount)}
            </td>
          </tr>
        </table>
      </div>

      <div style={{ backgroundColor: '#ecfdf5', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
        <h3 style={{ color: '#065f46', margin: '0 0 10px 0', fontSize: '18px' }}>💡 Next Steps</h3>
        <p style={{ margin: '0 0 10px 0', color: '#047857', lineHeight: '1.6' }}>
          This lead came from your <strong>{source}</strong> page. Contact them within 24 hours for the best conversion rate.
        </p>
        <p style={{ margin: '0', color: '#047857', fontStyle: 'italic', fontWeight: 'bold' }}>
          Let's turn this lead into a success story! 🎯
        </p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f1f5f9', borderRadius: '6px', fontSize: '14px', color: '#64748b' }}>
        <p style={{ margin: '0' }}>
          <strong>Submission Details:</strong><br />
          Time: {new Date(timestamp).toLocaleString()}<br />
          Source: {source}
        </p>
      </div>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '12px' }}>
      <p style={{ margin: '0' }}>Momentum Business Capital - Automated Lead Notification</p>
    </div>
  </div>
);

export default ApplicationNotificationTemplate; 