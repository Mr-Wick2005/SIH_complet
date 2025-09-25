import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { EnhancedLoginScreen } from './components/EnhancedLoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { HomeScreen } from './components/HomeScreen';
import { ReportScreen } from './components/ReportScreen';
import { ResolvedScreen } from './components/ResolvedScreen';
import { AwarenessScreen } from './components/AwarenessScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { BottomNavigation } from './components/BottomNavigation';

// Field Worker Components
import { AssignedScreen } from './components/AssignedScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { FieldWorkerResolvedScreen } from './components/FieldWorkerResolvedScreen';
import { FieldWorkerProfileScreen } from './components/FieldWorkerProfileScreen';
import { FieldWorkerBottomNavigation } from './components/FieldWorkerBottomNavigation';

type AppState = 'splash' | 'login' | 'signup' | 'citizen-app' | 'field-worker-app' | 'alerts';
type CitizenTab = 'home' | 'report' | 'resolved' | 'awareness' | 'profile';
type FieldWorkerTab = 'assigned' | 'progress' | 'resolved' | 'profile';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [citizenActiveTab, setCitizenActiveTab] = useState<CitizenTab>('home');
  const [fieldWorkerActiveTab, setFieldWorkerActiveTab] = useState<FieldWorkerTab>('assigned');
  const [isGuest, setIsGuest] = useState(false);
  const [resolvedIssues, setResolvedIssues] = useState<any[]>([]);

  // Auto-navigate from splash screen after 3 seconds
  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => {
        setAppState('login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleSplashComplete = () => {
    setAppState('login');
  };

  const handleCitizenLogin = () => {
    setIsGuest(false);
    setAppState('citizen-app');
  };

  const handleFieldWorkerLogin = () => {
    setIsGuest(false);
    setAppState('field-worker-app');
  };

  const handleSignupComplete = () => {
    setIsGuest(false);
    setAppState('citizen-app');
  };

  const handleGuestContinue = () => {
    setIsGuest(true);
    setAppState('citizen-app');
  };

  const handleLogout = () => {
    setIsGuest(false);
    setCitizenActiveTab('home');
    setFieldWorkerActiveTab('assigned');
    setAppState('login');
  };

  const handleResolveIssue = (issueId: string, resolutionData: any) => {
    // Handle issue resolution - in a real app this would sync with backend
    setResolvedIssues(prev => [...prev, { ...resolutionData, id: issueId }]);
  };

  const handleBackToLogin = () => {
    setAppState('login');
  };

  const handleGoToSignup = () => {
    setAppState('signup');
  };

  const handleShowAlerts = () => {
    setAppState('alerts');
  };

  const handleBackFromAlerts = () => {
    setAppState('citizen-app');
  };

  if (appState === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appState === 'login') {
    return (
      <EnhancedLoginScreen 
        onCitizenLogin={handleCitizenLogin}
        onFieldWorkerLogin={handleFieldWorkerLogin}
        onSignup={handleGoToSignup}
        onGuestContinue={handleGuestContinue}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignupScreen 
        onSignupComplete={handleSignupComplete}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  if (appState === 'alerts') {
    return <AlertsScreen onBack={handleBackFromAlerts} />;
  }

  // Citizen App
  if (appState === 'citizen-app') {
    return (
      <div className="h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden">
        {/* Current Screen */}
        <div className="flex-1 overflow-hidden">
          {citizenActiveTab === 'home' && <HomeScreen onShowAlerts={handleShowAlerts} />}
          {citizenActiveTab === 'report' && <ReportScreen />}
          {citizenActiveTab === 'resolved' && <ResolvedScreen />}
          {citizenActiveTab === 'awareness' && <AwarenessScreen />}
          {citizenActiveTab === 'profile' && <ProfileScreen onLogout={handleLogout} />}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation 
          activeTab={citizenActiveTab} 
          onTabChange={(tab) => setCitizenActiveTab(tab as CitizenTab)} 
        />

        {/* Guest Mode Indicator */}
        {isGuest && (
          <div className="absolute top-0 left-0 right-0 bg-[#FF9933] text-white text-center py-1 text-xs z-50">
            Guest Mode - Limited features available
          </div>
        )}
      </div>
    );
  }

  // Field Worker App
  if (appState === 'field-worker-app') {
    return (
      <div className="h-screen bg-white flex flex-col max-w-md mx-auto relative">
        {/* Current Screen */}
        <div className="flex-1 overflow-hidden">
          {fieldWorkerActiveTab === 'assigned' && (
            <AssignedScreen onResolveIssue={handleResolveIssue} />
          )}
          {fieldWorkerActiveTab === 'progress' && <ProgressScreen />}
          {fieldWorkerActiveTab === 'resolved' && <FieldWorkerResolvedScreen />}
          {fieldWorkerActiveTab === 'profile' && (
            <FieldWorkerProfileScreen onLogout={handleLogout} />
          )}
        </div>

        {/* Bottom Navigation */}
        <FieldWorkerBottomNavigation 
          activeTab={fieldWorkerActiveTab} 
          onTabChange={(tab) => setFieldWorkerActiveTab(tab as FieldWorkerTab)} 
        />
      </div>
    );
  }

  return null;
}