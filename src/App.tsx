import { useState } from 'react';
import { Banner } from './components/Banner';
import { PuzzleScreen } from './components/PuzzleScreen';
import { HomePage } from './screens/HomePage';
import { GamesHub } from './screens/GamesHub';
import { Onboarding } from './screens/Onboarding';
import { StoryPage } from './screens/StoryPage';
import { Completion } from './screens/Completion';
import { Progress } from './screens/Progress';

type Screen = 'home' | 'games' | 'onboarding' | 'puzzle' | 'story' | 'completion' | 'progress';

interface ResultStats {
  solveTimeSeconds: number;
  hintsUsed: number;
}

// Demo helper: ?demo=1 skips onboarding when opening the crossword.
function isDemoMode(): boolean {
  return new URLSearchParams(window.location.search).get('demo') === '1';
}

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [resultStats, setResultStats] = useState<ResultStats>({
    solveTimeSeconds: 0,
    hintsUsed: 0,
  });

  const openCrossword = () => {
    setScreen(isDemoMode() ? 'puzzle' : 'onboarding');
  };

  return (
    <div className="min-h-screen bg-paper">
      <Banner />
      {screen === 'home' && (
        <HomePage onGames={() => setScreen('games')} onProgress={() => setScreen('progress')} />
      )}
      {screen === 'games' && (
        <GamesHub
          onOpenCrossword={openCrossword}
          onHome={() => setScreen('home')}
          onProgress={() => setScreen('progress')}
        />
      )}
      {screen === 'onboarding' && <Onboarding onComplete={() => setScreen('puzzle')} />}
      {screen === 'puzzle' && (
        <PuzzleScreen
          onReadStory={() => setScreen('story')}
          onViewResults={(stats) => {
            setResultStats(stats);
            setScreen('completion');
          }}
        />
      )}
      {screen === 'story' && <StoryPage onBackToPuzzle={() => setScreen('puzzle')} />}
      {screen === 'completion' && (
        <Completion
          solveTimeSeconds={resultStats.solveTimeSeconds}
          hintsUsed={resultStats.hintsUsed}
          onBackToGames={() => setScreen('games')}
          onViewProgress={() => setScreen('progress')}
        />
      )}
      {screen === 'progress' && <Progress onBackToGames={() => setScreen('games')} />}
    </div>
  );
}

export default App;
