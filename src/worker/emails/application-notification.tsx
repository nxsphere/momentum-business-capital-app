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
  <>
    <style>{`
      @media only screen and (max-width: 480px) {
        .email-container {
          padding: 10px !important;
          margin: 0 !important;
        }
        .header-section {
          padding: 15px !important;
        }
        .header-title {
          font-size: 20px !important;
        }
        .header-subtitle {
          font-size: 14px !important;
        }
        .content-section {
          padding: 20px !important;
        }
        .info-card {
          padding: 15px !important;
        }
        .info-table td {
          display: block !important;
          width: 100% !important;
          padding: 4px 0 !important;
          border-bottom: 1px solid #f3f4f6;
        }
        .info-table .label {
          font-weight: bold !important;
          color: #1e40af !important;
          margin-bottom: 2px !important;
        }
        .info-table .value {
          margin-bottom: 8px !important;
          padding-left: 0 !important;
        }
        .next-steps {
          padding: 15px !important;
        }
        .submission-details {
          padding: 10px !important;
          font-size: 12px !important;
        }
      }
      
      @media only screen and (max-width: 320px) {
        .header-title {
          font-size: 18px !important;
        }
        .amount-value {
          font-size: 14px !important;
        }
      }
    `}</style>
    
    <div className="email-container" style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
        <img src="https://mailsend-email-assets.mailtrap.io/oyc2fu7yrhzxvf83rtkcl6rg1zwq.png" alt="Momentum Business Capital Logo" style={{ width: '150px', height: 'auto' }} />
      </div>

      <div className="header-section" style={{ 
        backgroundColor: '#1e40af', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px 8px 0 0',
        textAlign: 'center'
      }}>
        <h1 className="header-title" style={{ 
          margin: '0', 
          fontSize: '24px',
          lineHeight: '1.2'
        }}>🚀 New Funding Application Lead</h1>
        <p className="header-subtitle" style={{ 
          margin: '10px 0 0 0', 
          fontSize: '16px', 
          opacity: '0.9',
          lineHeight: '1.4'
        }}>
          A new business has applied for funding through your website
        </p>
      </div>
      
      <div className="content-section" style={{ 
        backgroundColor: '#f8fafc', 
        padding: '30px', 
        borderRadius: '0 0 8px 8px', 
        border: '1px solid #e2e8f0'
      }}>
        <div className="info-card" style={{ 
          backgroundColor: 'white', 
          padding: '25px', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            color: '#1e40af', 
            margin: '0 0 20px 0', 
            fontSize: '20px', 
            borderBottom: '2px solid #e2e8f0', 
            paddingBottom: '10px'
          }}>
            Business Information
          </h2>
          
          <table className="info-table" style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            tableLayout: 'fixed'
          }}>
            <tbody>
              <tr>
                <td className="label" style={{ 
                  padding: '8px 0', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  width: '35%',
                  verticalAlign: 'top'
                }}>Business Name:</td>
                <td className="value" style={{ 
                  padding: '8px 0', 
                  color: '#111827',
                  wordBreak: 'break-word'
                }}>{businessName}</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td className="label" style={{ 
                  padding: '8px 0', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  verticalAlign: 'top'
                }}>Contact Name:</td>
                <td className="value" style={{ 
                  padding: '8px 0', 
                  color: '#111827',
                  wordBreak: 'break-word'
                }}>{contactName}</td>
              </tr>
              <tr>
                <td className="label" style={{ 
                  padding: '8px 0', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  verticalAlign: 'top'
                }}>Email:</td>
                <td className="value" style={{ 
                  padding: '8px 0', 
                  color: '#111827',
                  wordBreak: 'break-all'
                }}>
                  <a href={`mailto:${email}`} style={{ 
                    color: '#1e40af', 
                    textDecoration: 'none',
                    wordBreak: 'break-all'
                  }}>{email}</a>
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td className="label" style={{ 
                  padding: '8px 0', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  verticalAlign: 'top'
                }}>Phone:</td>
                <td className="value" style={{ 
                  padding: '8px 0', 
                  color: '#111827'
                }}>
                  <a href={`tel:${phone}`} style={{ 
                    color: '#1e40af', 
                    textDecoration: 'none'
                  }}>{phone}</a>
                </td>
              </tr>
              <tr>
                <td className="label" style={{ 
                  padding: '8px 0', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  verticalAlign: 'top'
                }}>Business Type:</td>
                <td className="value" style={{ 
                  padding: '8px 0', 
                  color: '#111827',
                  textTransform: 'capitalize'
                }}>{businessType}</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td className="label" style={{ 
                  padding: '8px 0', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  verticalAlign: 'top'
                }}>Desired Amount:</td>
                <td className="value amount-value" style={{ 
                  padding: '8px 0', 
                  color: '#111827', 
                  fontWeight: 'bold', 
                  fontSize: '16px'
                }}>
                  {formatDesiredAmount(desiredAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="next-steps" style={{ 
          backgroundColor: '#ecfdf5', 
          padding: '20px', 
          borderRadius: '8px', 
          borderLeft: '4px solid #10b981'
        }}>
          <h3 style={{ 
            color: '#065f46', 
            margin: '0 0 10px 0', 
            fontSize: '18px'
          }}>💡 Next Steps</h3>
          <p style={{ 
            margin: '0 0 10px 0', 
            color: '#047857', 
            lineHeight: '1.6'
          }}>
            This lead came from your <strong>{source}</strong> page. Contact them within 24 hours for the best conversion rate.
          </p>
          <p style={{ 
            margin: '0', 
            color: '#047857', 
            fontStyle: 'italic', 
            fontWeight: 'bold'
          }}>
            Let's turn this lead into a success story! 🎯
          </p>
        </div>

        <div className="submission-details" style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f1f5f9', 
          borderRadius: '6px', 
          fontSize: '14px', 
          color: '#64748b'
        }}>
          <p style={{ margin: '0' }}>
            <strong>Submission Details:</strong><br />
            Time: {new Date(timestamp).toLocaleString('en-US', { 
              timeZone: 'America/New_York',
              year: 'numeric',
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })} EST<br />
            Source: {source}
          </p>
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        color: '#64748b', 
        fontSize: '12px'
      }}>
        <p style={{ margin: '0' }}>Momentum Business Capital - Automated Lead Notification</p>
      </div>
    </div>
  </>
);

export default ApplicationNotificationTemplate; 