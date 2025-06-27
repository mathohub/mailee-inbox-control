
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'common.back': 'Back',
    'common.cancel': 'Cancel',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.loginWithGoogle': 'Login with Google',
    'auth.registerWithGoogle': 'Register with Google',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    
    // Payment
    'payment.title': '7 Days Free Trial',
    'payment.subtitle': 'Start organizing your inbox today',
    'payment.description': 'Get full access to all Mailee features for 7 days completely free. No commitment required.',
    'payment.features.inbox': 'Inbox Cleanup',
    'payment.features.spam': 'Spam Detection',
    'payment.features.analytics': 'Detailed Analytics',
    'payment.features.support': '24/7 Support',
    'payment.cardRequired': 'Credit card required for free trial',
    'payment.payWithCard': 'Pay with Card',
    'payment.payWithPaypal': 'Pay with PayPal',
    
    // Dashboard
    'dashboard.title': 'Mailee Dashboard',
    'dashboard.inbox': 'Inbox',
    'dashboard.spam': 'Spam',
    'dashboard.analytics': 'Analytics',
    'dashboard.logout': 'Logout',
    
    // Settings
    'settings.language': 'Language',
    'settings.manageSubscription': 'Manage Subscription',
    
    // Subscription
    'subscription.manage': 'Manage Subscription',
    'subscription.currentPlan': 'Current Plan',
    'subscription.active': 'Active',
    'subscription.trial': 'Trial',
    'subscription.nextBilling': 'Next billing',
    'subscription.cancel': 'Cancel Subscription',
    'subscription.confirmCancel': 'Cancel Subscription?',
    'subscription.cancelWarning': 'Are you sure you want to cancel your subscription? You will lose access to all premium features.',
    'subscription.confirmCancelAction': 'Yes, Cancel',
    'subscription.trialInfo': 'You are currently on a 7-day free trial. Your subscription will start after the trial period.',
    
    // Inbox
    'inbox.title': 'Inbox Cleanup',
    'inbox.selectAll': 'Select All',
    'inbox.deleteSelected': 'Delete Selected',
    'inbox.emailsSelected': 'emails selected',
    
    // Spam
    'spam.title': 'Spam Management',
    'spam.deleteAll': 'Delete All Spam',
    'spam.spamEmails': 'spam emails found',
    
    // Analytics
    'analytics.title': 'Email Analytics',
    'analytics.topSenders': 'Top Senders',
    'analytics.categories': 'Categories',
    'analytics.totalEmails': 'Total Emails',
    'analytics.spamBlocked': 'Spam Blocked',
    'analytics.cleanupSaved': 'Time Saved',
  },
  pt: {
    // Common
    'common.back': 'Voltar',
    'common.cancel': 'Cancelar',
    
    // Auth
    'auth.login': 'Entrar',
    'auth.register': 'Cadastrar',
    'auth.email': 'E-mail',
    'auth.password': 'Senha',
    'auth.name': 'Nome Completo',
    'auth.loginWithGoogle': 'Entrar com Google',
    'auth.registerWithGoogle': 'Cadastrar com Google',
    'auth.alreadyHaveAccount': 'Já tem uma conta?',
    'auth.dontHaveAccount': 'Não tem uma conta?',
    
    // Payment
    'payment.title': '7 Dias Grátis',
    'payment.subtitle': 'Comece a organizar sua caixa de entrada hoje',
    'payment.description': 'Tenha acesso completo a todas as funcionalidades do Mailee por 7 dias totalmente grátis. Sem compromisso.',
    'payment.features.inbox': 'Limpeza da Caixa de Entrada',
    'payment.features.spam': 'Detecção de Spam',
    'payment.features.analytics': 'Análises Detalhadas',
    'payment.features.support': 'Suporte 24/7',
    'payment.cardRequired': 'Cartão de crédito necessário para teste grátis',
    'payment.payWithCard': 'Pagar com Cartão',
    'payment.payWithPaypal': 'Pagar com PayPal',
    
    // Dashboard
    'dashboard.title': 'Dashboard Mailee',
    'dashboard.inbox': 'Caixa de Entrada',
    'dashboard.spam': 'Spam',
    'dashboard.analytics': 'Análises',
    'dashboard.logout': 'Sair',
    
    // Settings
    'settings.language': 'Idioma',
    'settings.manageSubscription': 'Gerenciar Assinatura',
    
    // Subscription
    'subscription.manage': 'Gerenciar Assinatura',
    'subscription.currentPlan': 'Plano Atual',
    'subscription.active': 'Ativo',
    'subscription.trial': 'Teste',
    'subscription.nextBilling': 'Próxima cobrança',
    'subscription.cancel': 'Cancelar Assinatura',
    'subscription.confirmCancel': 'Cancelar Assinatura?',
    'subscription.cancelWarning': 'Tem certeza que deseja cancelar sua assinatura? Você perderá acesso a todas as funcionalidades premium.',
    'subscription.confirmCancelAction': 'Sim, Cancelar',
    'subscription.trialInfo': 'Você está atualmente em um teste grátis de 7 dias. Sua assinatura começará após o período de teste.',
    
    // Inbox
    'inbox.title': 'Limpeza da Caixa de Entrada',
    'inbox.selectAll': 'Selecionar Todos',
    'inbox.deleteSelected': 'Excluir Selecionados',
    'inbox.emailsSelected': 'e-mails selecionados',
    
    // Spam
    'spam.title': 'Gerenciamento de Spam',
    'spam.deleteAll': 'Excluir Todos os Spams',
    'spam.spamEmails': 'e-mails de spam encontrados',
    
    // Analytics
    'analytics.title': 'Análises de E-mail',
    'analytics.topSenders': 'Principais Remetentes',
    'analytics.categories': 'Categorias',
    'analytics.totalEmails': 'Total de E-mails',
    'analytics.spamBlocked': 'Spam Bloqueado',
    'analytics.cleanupSaved': 'Tempo Economizado',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
