
export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  date: string;
  isSpam: boolean;
  category: 'personal' | 'work' | 'promotions' | 'social' | 'spam';
  isRead: boolean;
}

export const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'Netflix',
    senderEmail: 'info@netflix.com',
    subject: 'New shows added to your list',
    preview: 'Check out the latest additions to Netflix including...',
    date: '2024-06-27',
    isSpam: false,
    category: 'promotions',
    isRead: false
  },
  {
    id: '2',
    sender: 'John Smith',
    senderEmail: 'john.smith@company.com',
    subject: 'Project Update - Q2 Results',
    preview: 'Hi team, here are the latest updates on our Q2 project...',
    date: '2024-06-26',
    isSpam: false,
    category: 'work',
    isRead: true
  },
  {
    id: '3',
    sender: 'Amazon',
    senderEmail: 'orders@amazon.com',
    subject: 'Your order has been shipped',
    preview: 'Great news! Your recent order is on its way...',
    date: '2024-06-26',
    isSpam: false,
    category: 'personal',
    isRead: false
  },
  {
    id: '4',
    sender: 'Fake Lottery Winner',
    senderEmail: 'winner@fake-lottery.scam',
    subject: 'CONGRATULATIONS! You won $1,000,000!!!',
    preview: 'You have been selected as our lucky winner! Click here to claim...',
    date: '2024-06-25',
    isSpam: true,
    category: 'spam',
    isRead: false
  },
  {
    id: '5',
    sender: 'LinkedIn',
    senderEmail: 'notifications@linkedin.com',
    subject: 'You have 3 new connection requests',
    preview: 'Expand your professional network with these connection requests...',
    date: '2024-06-25',
    isSpam: false,
    category: 'social',
    isRead: true
  },
  {
    id: '6',
    sender: 'Bank Scammer',
    senderEmail: 'security@fake-bank.scam',
    subject: 'Urgent: Verify your account immediately',
    preview: 'Your account will be suspended if you do not verify...',
    date: '2024-06-24',
    isSpam: true,
    category: 'spam',
    isRead: false
  },
  {
    id: '7',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: 'Your weekly digest',
    preview: 'Here\'s what happened in your repositories this week...',
    date: '2024-06-24',
    isSpam: false,
    category: 'work',
    isRead: false
  },
  {
    id: '8',
    sender: 'Mom',
    senderEmail: 'mom@family.com',
    subject: 'Family dinner this Sunday',
    preview: 'Don\'t forget about our family dinner this Sunday at 6 PM...',
    date: '2024-06-23',
    isSpam: false,
    category: 'personal',
    isRead: true
  },
  {
    id: '9',
    sender: 'Spotify',
    senderEmail: 'info@spotify.com',
    subject: 'Your Discover Weekly is ready',
    preview: 'We\'ve created a new playlist just for you based on...',
    date: '2024-06-23',
    isSpam: false,
    category: 'social',
    isRead: false
  },
  {
    id: '10',
    sender: 'Crypto Scammer',
    senderEmail: 'crypto@scam.fake',
    subject: 'Make $5000 in 24 hours with this crypto secret',
    preview: 'This one simple trick will make you rich overnight...',
    date: '2024-06-22',
    isSpam: true,
    category: 'spam',
    isRead: false
  }
];

export const getEmailStats = () => {
  const totalEmails = mockEmails.length;
  const spamEmails = mockEmails.filter(email => email.isSpam).length;
  const categories = mockEmails.reduce((acc, email) => {
    if (!email.isSpam) {
      acc[email.category] = (acc[email.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const senders = mockEmails
    .filter(email => !email.isSpam)
    .reduce((acc, email) => {
      acc[email.sender] = (acc[email.sender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topSenders = Object.entries(senders)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return {
    totalEmails,
    spamEmails,
    categories,
    topSenders,
    cleanEmails: totalEmails - spamEmails
  };
};
